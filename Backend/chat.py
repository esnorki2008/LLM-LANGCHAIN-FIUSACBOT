import openai
import os
from langchain.embeddings import HuggingFaceInstructEmbeddings
from langchain.vectorstores import FAISS
from langchain_community.document_loaders import CSVLoader
from langchain.prompts import PromptTemplate
from langchain.chains import RetrievalQA
from langchain.chains.question_answering import load_qa_chain
from langchain.schema import Document

from dotenv import load_dotenv
load_dotenv()

openai.api_key = os.getenv('OPENAI_API_KEY')

instructor_embeddings = HuggingFaceInstructEmbeddings(
    model_name="hkunlp/instructor-large"
)

vectordb_file_path = "faiss_index"

def create_vector_db():
    loader = CSVLoader(file_path='faqs.csv', source_column='prompt')
    data = loader.load()
    documents = [Document(page_content=doc.page_content) for doc in data]
    vectordb = FAISS.from_documents(documents=documents, embedding=instructor_embeddings)
    vectordb.save_local(vectordb_file_path)

def load_or_create_vector_db():
    if not os.path.exists(vectordb_file_path):
        print(f"El archivo {vectordb_file_path} no existe, creando la base de datos vectorial.")
        create_vector_db()
    else:
        print(f"El archivo {vectordb_file_path} ya existe, cargando la base de datos vectorial.")
    return FAISS.load_local(vectordb_file_path, instructor_embeddings)

def chatgpt_request(messages, model="gpt-4o-mini", temperature=0.6):
    response = openai.ChatCompletion.create(
        model=model,
        messages=messages,
        temperature=temperature,
        max_tokens=150
    )
    return response['choices'][0]['message']['content']

def get_chain():
    prompt_template = """
    Dado el siguiente contexto y una pregunta, responde basándote únicamente en este contexto.
    En la respuesta, trata de proporcionar tanto texto como sea posible de la sección "respuesta" en el contexto del documento fuente sin realizar muchos cambios.
    Puedes basarte en el contexto pero sin alterar la información original.
    Si te saludan responde cordialmente y di que eres un "Bot con información de procesos de admisión"
    Si encuentras un significado equivalente en el contexto lo puedes usar.
    Puedes combinar varias respuestas del contexto si así lo consideras para mejorar la respuesta ante el usuario.
    Revisa la ortografía, signos de puntuación (especialmente las tildes) y la redacción de la respuesta que vas a dar.
    
    Si no tienes suficiente información usa información veridica en caso contrario responde con: "No tengo la información suficiente para responder esa pregunta."

    CONTEXTO: {context}

    PREGUNTA: {question}"""
    
    prompt = PromptTemplate(template=prompt_template, input_variables=["context", "question"])
    return prompt

def fix_question(user_question):
    messages = [
        {"role": "system", "content": "Eres un asistente que corrige gramática y puntuación."},
        {"role": "user", "content": f"Arregla el siguiente texto de manera gramatical y con signos de puntuación correctos, devuelve únicamente el texto corregido, no cambies el sentido de la pregunta, nada más por favor: {user_question}"}
    ]
    fixed_question = chatgpt_request(messages)
    return fixed_question

def user_input(user_question):
    new_db = load_or_create_vector_db()
    retriever = new_db.similarity_search(user_question)
    chain = get_chain()
    fixed_question = fix_question(user_question)
    context = "\n".join([doc.page_content for doc in retriever])
    messages = [
        {"role": "system", "content": "Eres un asistente útil y respondes preguntas basándote en un contexto dado."},
        {"role": "user", "content": chain.format(context=context, question=fixed_question)}
    ]
    response = chatgpt_request(messages)
    return response

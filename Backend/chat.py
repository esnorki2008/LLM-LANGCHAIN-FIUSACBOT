from langchain_google_genai import ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings
from langchain.embeddings import HuggingFaceInstructEmbeddings
from langchain.vectorstores import FAISS 
from langchain.document_loaders.csv_loader import CSVLoader
from langchain.prompts import PromptTemplate
from langchain.chains import RetrievalQA
from langchain.chains.question_answering import load_qa_chain

import google.generativeai as genai

from dotenv import load_dotenv
load_dotenv()
import os


API_KEY = os.environ.get('GOOGLE_API_KEY')

genai.configure(api_key=os.getenv(API_KEY))



#instructor_embeddings = HuggingFaceInstructEmbeddings()
instructor_embeddings = GoogleGenerativeAIEmbeddings(
    model="models/embedding-001"
)

vectordb_file_path="faiss_index"


def create_vector_db():
    loader = CSVLoader(file_path='faqs.csv',source_column='prompt')
    data = loader.load()
    vectordb = FAISS.from_documents(documents = data, embedding=instructor_embeddings)
    vectordb.save_local(vectordb_file_path)


def get_chain():

    prompt_template = """
    Dado el siguiente contexto y una pregunta, responde basándote únicamente en este contexto.
    En la respuesta, trata de proporcionar tanto texto como sea posible de la sección "respuesta" en el contexto del documento fuente sin realizar muchos cambios.
    Puedes basarte en el contexto pero sin alterar la información original, 
    Si encuentras un significado equivalente en el contexto lo puedes usar. 
    Puedes combinar varias respuestas del contexto si así lo consideras para mejorar la respuesta ante el usuario
    Revisa la ortografía, signos de puntuación en especial las tíldes y redacción de la respuesta que vas a dar, en caso de encontrar un error arregla la respuesta del contexto, por favor.
    
    Si no pudiste responder di "No tengo la información suficiente para responder esa pregunta."

    CONTEXT: {context}

    QUESTION: {question}"""

    #En caso que no puedas generar una respuesta coherente con el contexto, amablemente indica "No dispongo de esa información, me encuentro en entrenamiento :) ." 
    ###amablemente indica "No sé." No intentes inventar una respuesta.
    llm = ChatGoogleGenerativeAI(model="gemini-pro",temperature=0.6)

    PROMPT = PromptTemplate(template=prompt_template, input_variables=["context", "question"])
    chain = load_qa_chain(llm,chain_type="stuff",prompt=PROMPT)

    return chain

def fix_question(user_question):
    llm = ChatGoogleGenerativeAI(model="gemini-pro",temperature=0.6)
    PROMPT ="Arregla el siguiente texto de manera gramaticamente  y con signos de puntuación correctos, devuelve únicamente el texto corregido, no cambies el sentido de la pregunta, nada más por favor: {}"
    result = llm.invoke(PROMPT.format(user_question))

    return result.content

def user_input(user_question):
    
    new_db = FAISS.load_local("faiss_index", instructor_embeddings)
    retriever = new_db.similarity_search(user_question)

    chain = get_chain()

    fixed_question = fix_question(user_question)
    
    response = chain(
        {"input_documents":retriever, "question": fixed_question}
        , return_only_outputs=False)

    llm_response = response['output_text']

    return llm_response

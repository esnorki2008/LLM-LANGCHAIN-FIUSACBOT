from flask import Flask, request, jsonify
from chat_service import handle_prompt

app = Flask(__name__)

@app.route("/")
def health():
    return "Ok"

@app.route("/chat",methods=['POST'])
def chat():
    input_data = request.json.get('input')
    return handle_prompt(input_data)




if __name__ == '__main__':
 
    app.run()
from flask import Flask, request, jsonify
from chat import user_input

app = Flask(__name__)

@app.route("/")
def health():
    return "Ok"

@app.route("/chat",methods=['POST'])
def chat():
    input_data = request.json.get('input')
    if input_data is None or len(input_data) == 0:
        return jsonify({"error": "No input detected"}), 400

    chat_response = user_input(input_data)
    return {"output":chat_response}, 200




if __name__ == '__main__':
 
    app.run()
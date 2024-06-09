from flask import jsonify
from chat import user_input
import os

NO_RESPONSE_KEY = os.environ.get('NO_RESPONSE_KEY')

def handle_prompt(input_data):
    if input_data is None or len(input_data) == 0:
        return jsonify({"error": "No input detected"}), 400

    chat_response = user_input(input_data)

    if(NO_RESPONSE_KEY == chat_response):
            #TO DO UPLOAD TO DB
            pass
    print({"resp":chat_response})
    return {"output":chat_response}, 200
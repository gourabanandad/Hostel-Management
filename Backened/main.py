from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
import smtplib
from email.message import EmailMessage
from datetime import datetime
import os
import intent_classifier
from intent_classifier import chat_with_bot as classify_intent

# Set your OpenAI API key
openai.api_key = os.getenv("OpenAI_API_Key")

app = Flask(__name__)
CORS(app, resources={r"/chatbot": {"origins": "*"}})
# Sample user info (replace later with dynamic values or DB)
Name = "Gourabananda Datta"
Roll = "35000123024"
Room_No = "5"
student_email_id = "abc@gmail.com"
system_email_id = "gourabanandad@gmail.com"
management_email_id = "gourabanandatta@gmail.com"

# --------------------- Helper Functions ----------------------

def chat_bot(query, prompt):
    response = openai.ChatCompletion.create(
        model="gpt-4-turbo",
        messages=[
            {"role": "system", "content": prompt},
            {"role": "user", "content": query}
        ]
    )
    return response['choices'][0]['message']['content']

def complain_handler(query):
    # TODO: Add DB logic here
    return "✅ Complaint has been registered."

def meal_confirm(query):
    prompt = """
        Classify the user's intent into:
        - "Yes" = Will eat lunch and dinner
        - "No" = Won't eat lunch or dinner
        - "lunch" = Only lunch
        - "dinner" = Only dinner
        If unclear, ask user to clarify.
    """
    res = chat_bot(query, prompt).lower()
    if res in ["yes", "no", "lunch", "dinner"]:
        # TODO: Update database here
        return f"✅ Meal status updated: {res}"
    else:
        return res

def meal_cutoff(cutoff_hour=21, cutoff_minute=0):
    now = datetime.now().time()
    cutoff = datetime.strptime(f"{cutoff_hour}:{cutoff_minute}", "%H:%M").time()
    return now < cutoff

def attendance_handler(query):
    prompt = """
        If the user says they are on leave, return 'absent'.
        If the user says they returned from leave, return 'present'.
    """
    return chat_bot(query, prompt)

# --------------------- Flask Routes ----------------------

@app.route("/chatbot", methods=["POST"])
def chatbot_api():
    data = request.json
    user_input = data.get("message", "")

    if not user_input:
        return jsonify({"reply": "❌ No message received."}), 400

    intent = classify_intent(user_input).lower()

    if intent == 'complaint_submission':
        reply = complain_handler(user_input)

    elif intent == 'meal_confirmation':
        if meal_cutoff():
            reply = meal_confirm(user_input)
        else:
            reply = "⛔ Sorry, the meal confirmation time is over (9 PM)."

    elif intent == 'meal_cutoff_time':
        reply = "✅ Yes, you can still confirm your meal." if meal_cutoff() else "⛔ Sorry, the cutoff time is over."

    elif intent == 'general_chat':
        prompt = f"You are a helpful and polite assistant for {Name}. Respond casually and kindly."
        reply = chat_bot(user_input, prompt)

    elif intent == 'leave_request':
        reply = "✅ Leave request has been noted."

    elif intent == 'notice_check':
        reply = "📢 Latest Notice: Water supply will be off from 2 PM to 4 PM today."

    elif intent == 'attendance':
        reply = "📝 Attendance status: " + attendance_handler(user_input)

    else:
        reply = "🤔 I'm not sure what you mean. Please try again."

    return jsonify({"reply": reply})

# --------------------- Run App ----------------------

if __name__ == "__main__":
    app.run(debug=True)

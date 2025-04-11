import openai
import os

openai.api_key = os.getenv("OpenAI_API_Key")

prompt = """ You are an intent classifier for a smart hostel assistant chatbot.

Given a student's message, your job is to return the exact intent they are expressing. Only return the intent label — no explanation, no greeting.

Possible intents:
- meal_confirmation
- meal_cutoff_time
- complaint_submission
- leave_request
- notice_check
- general_chat
- unknown

Your job is just to return the intent.


"""
def chat_with_bot(query):
    response = openai.ChatCompletion.create(
        model="gpt-4-turbo",  # or "gpt-4" if you have access
        messages=[
            {"role": "system", "content": prompt},
            {"role": "user", "content": query}
        ]
    )
    return response['choices'][0]['message']['content']


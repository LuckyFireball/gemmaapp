import os
import sys
import requests
import webview

def get_asset_path(relative_path):
    base_path = getattr(sys, '_MEIPASS', os.path.dirname(os.path.abspath(__file__)))
    return os.path.join(base_path, relative_path)

class ChatbotApi:

    def chat(self, message):
        try:
            payload = {
                "model": "gemma2-9b-it",
                "messages": [{"role": "user", "content": message}],
                "stream": False,
            }
            headers = {
                "Authorization": "Bearer gsk_yG6B2V7fR6zK8wQ9xJ3pWGdyb3FYM3k5bDdSc0FvMjhVcXpM",
                "Content-Type": "application/json",
            }
            res = requests.post(
                "https://groq.com",
                json=payload,
                headers=headers,
            )
            return {"response": res.json()["choices"][0]["message"]["content"]}
        except Exception as e:
            return {"response": "Could not connect to the online server."}

html_path = get_asset_path("index.html")

if __name__ == "__main__":
    api = ChatbotApi()
    window = webview.create_window(
        "Gemma AI Space", html_path, js_api=api, width=1000, height=650
    )
    webview.start()

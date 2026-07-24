import os
import sys

def get_asset_path(relative_path):
    """ Get absolute path to resource, works for dev and for PyInstaller """
    base_path = getattr(sys, '_MEIPASS', os.path.dirname(os.path.abspath(__file__)))
    return os.path.join(base_path, relative_path)


import os
import sys
import requests
import webview


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
            return {"response": res.json()["choices"]["message"]["content"]}
        except Exception as e:
            return {"response": "Could not connect to the online server."}


if getattr(sys, "frozen", False):
    base_path = sys._MEIPASS
else:
    base_path = os.path.dirname(os.path.abspath(__file__))

html_path = os.path.join(base_path, "index.html")

if __name__ == "__main__":
    api = ChatbotApi()
    window = webview.create_window(
        "Gemma AI Space", html_path, js_api=api, width=1000, height=650
    )
    webview.start()

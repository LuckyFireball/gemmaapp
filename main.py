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
                "stream": False
            }
            
            # Reads the secure variable passed down by the build environment
            api_key = os.environ.get("GROQ_API_KEY", "YOUR_LOCAL_TEST_KEY_HERE")
            
            headers = {
                "Authorization": f"Bearer {api_key}",
                "Content-Type": "application/json"
            }
            
            res = requests.post(
                "https://groq.com",
                json=payload,
                headers=headers,
                timeout=10
            )
            
            if res.status_code == 200:
                return {"response": res.json()["choices"]["message"]["content"]}
            else:
                return {"response": f"Server responded with error code: {res.status_code}"}
                
        except Exception as e:
            return {"response": f"Connection error: {str(e)}"}

html_path = get_asset_path("index.html")

if __name__ == "__main__":
    api = ChatbotApi()
    window = webview.create_window(
        "Gemma AI Space", html_path, js_api=api, width=1000, height=650
    )
    webview.start()

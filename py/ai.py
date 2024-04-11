import requests

url = "https://api.perplexity.ai/chat/completions"

payload = {
    "model": "mistral-7b-instruct",
    "messages": [
        {
            "role": "system",
            "content": "Be precise and concise."
        },
        {
            "role": "user",
            "content": "How many stars are there in our galaxy?"
        }
    ]
}
headers = {
    "accept": "application/json",
    "content-type": "application/json",
    "authorization": "Bearer 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"
}

response = requests.post(url, json=payload, headers=headers)

print(response.text)
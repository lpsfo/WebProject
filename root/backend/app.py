from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv
import requests
from PyPDF2 import PdfReader
import json

# 환경 변수 로드
load_dotenv()

app = Flask(__name__)
CORS(app)

# Hugging Face API 설정
API_URL = "https://api-inference.huggingface.co/models/facebook/bart-large-cnn"
headers = {"Authorization": f"Bearer {os.getenv('HUGGINGFACE_API_KEY')}"}

def extract_text_from_pdf(pdf_file):
    """PDF 파일에서 텍스트를 추출합니다."""
    reader = PdfReader(pdf_file)
    text = ""
    for page in reader.pages:
        text += page.extract_text()
    return text

def query_huggingface(payload):
    """Hugging Face API를 호출합니다."""
    response = requests.post(API_URL, headers=headers, json=payload)
    return response.json()

def clean_text(text):
    """텍스트를 정리합니다."""
    # 불필요한 공백 제거
    text = ' '.join(text.split())
    # 특수문자 정리
    text = text.replace('"', '').replace('"', '')
    return text

@app.route('/api/upload', methods=['POST'])
def upload_pdf():
    """PDF 파일을 업로드하고 텍스트를 추출합니다."""
    if 'file' not in request.files:
        return jsonify({'error': '파일이 없습니다.'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': '선택된 파일이 없습니다.'}), 400
    
    if not file.filename.endswith('.pdf'):
        return jsonify({'error': 'PDF 파일만 업로드 가능합니다.'}), 400
    
    try:
        text = extract_text_from_pdf(file)
        return jsonify({'text': text})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/summarize', methods=['POST'])
def summarize():
    """텍스트를 요약합니다."""
    data = request.json
    text = data.get('text', '')
    
    try:
        # 텍스트가 너무 길 경우 잘라서 처리
        max_length = 1024
        if len(text) > max_length:
            text = text[:max_length]
        
        payload = {
            "inputs": text,
            "parameters": {
                "max_length": 150,
                "min_length": 50,
                "do_sample": False
            }
        }
        
        response = query_huggingface(payload)
        
        if isinstance(response, list) and len(response) > 0:
            summary = clean_text(response[0].get('summary_text', ''))
            return jsonify({'summary': summary})
        else:
            return jsonify({'error': '요약 생성에 실패했습니다.'}), 500
            
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/extract-concepts', methods=['POST'])
def extract_concepts():
    """주요 개념을 추출합니다."""
    data = request.json
    text = data.get('text', '')
    
    try:
        # 텍스트가 너무 길 경우 잘라서 처리
        max_length = 1024
        if len(text) > max_length:
            text = text[:max_length]
        
        payload = {
            "inputs": text,
            "parameters": {
                "max_length": 200,
                "min_length": 50,
                "do_sample": False
            }
        }
        
        response = query_huggingface(payload)
        
        if isinstance(response, list) and len(response) > 0:
            concepts = clean_text(response[0].get('summary_text', ''))
            # 개념을 리스트로 변환
            concepts_list = [concept.strip() for concept in concepts.split('.') if concept.strip()]
            return jsonify({'concepts': concepts_list})
        else:
            return jsonify({'error': '개념 추출에 실패했습니다.'}), 500
            
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/generate-quiz', methods=['POST'])
def generate_quiz():
    """퀴즈를 생성합니다."""
    data = request.json
    text = data.get('text', '')
    
    try:
        # 텍스트가 너무 길 경우 잘라서 처리
        max_length = 1024
        if len(text) > max_length:
            text = text[:max_length]
        
        payload = {
            "inputs": text,
            "parameters": {
                "max_length": 500,
                "min_length": 200,
                "do_sample": False
            }
        }
        
        response = query_huggingface(payload)
        
        if isinstance(response, list) and len(response) > 0:
            quiz_text = clean_text(response[0].get('summary_text', ''))
            # 퀴즈를 구조화된 형식으로 변환
            quiz_items = []
            current_question = None
            current_options = []
            
            for line in quiz_text.split('\n'):
                line = line.strip()
                if line and not line.startswith('Generate'):
                    if line.endswith('?'):
                        if current_question:
                            quiz_items.append({
                                'question': current_question,
                                'options': current_options
                            })
                        current_question = line
                        current_options = []
                    elif current_question and len(current_options) < 4:
                        current_options.append(line)
            
            if current_question:
                quiz_items.append({
                    'question': current_question,
                    'options': current_options
                })
            
            return jsonify({'quiz': quiz_items})
        else:
            return jsonify({'error': '퀴즈 생성에 실패했습니다.'}), 500
            
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000) 
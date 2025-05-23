# PDF AI Assistant

이 프로젝트는 PDF 파일을 업로드하고 AI를 활용하여 다음과 같은 기능을 제공합니다:
- PDF 텍스트 추출
- AI 기반 문서 요약
- 주요 개념 추출
- 퀴즈 생성

## 기술 스택
- Frontend: HTML, CSS, JavaScript, PDF.js
- Backend: Flask, OpenAI API

## 설치 방법
1. 저장소 클론
```bash
git clone [repository-url]
```

2. Backend 의존성 설치
```bash
cd backend
pip install -r requirements.txt
```

3. 환경 변수 설정
`.env` 파일을 생성하고 OpenAI API 키를 설정:
```
OPENAI_API_KEY=your_api_key_here
```

## 실행 방법
1. Backend 서버 실행
```bash
cd backend
python app.py
```

2. Frontend 실행
- `frontend/index.html` 파일을 웹 브라우저에서 열기

## 기능
- PDF 파일 업로드 및 미리보기
- AI 기반 문서 요약
- 주요 개념 추출
- 퀴즈 생성 
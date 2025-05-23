// PDF.js 워커 설정
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

// DOM 요소
const pdfFileInput = document.getElementById('pdfFile');
const pdfPreview = document.getElementById('pdfPreview');
const summarizeBtn = document.getElementById('summarizeBtn');
const conceptsBtn = document.getElementById('conceptsBtn');
const quizBtn = document.getElementById('quizBtn');
const summaryResult = document.getElementById('summaryResult');
const conceptsResult = document.getElementById('conceptsResult');
const quizResult = document.getElementById('quizResult');
const loadingOverlay = document.getElementById('loadingOverlay');

// 현재 로드된 PDF 텍스트
let currentPdfText = '';

// 파일 업로드 처리
pdfFileInput.addEventListener('change', handleFileSelect);

// 드래그 앤 드롭 처리
const uploadContainer = document.querySelector('.upload-container');

uploadContainer.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadContainer.style.backgroundColor = 'rgba(74, 144, 226, 0.1)';
});

uploadContainer.addEventListener('dragleave', (e) => {
    e.preventDefault();
    uploadContainer.style.backgroundColor = '';
});

uploadContainer.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadContainer.style.backgroundColor = '';
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        pdfFileInput.files = files;
        handleFileSelect({ target: pdfFileInput });
    }
});

// PDF 파일 처리
async function handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
        alert('PDF 파일만 업로드 가능합니다.');
        return;
    }

    showLoading();

    try {
        // PDF 텍스트 추출
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('http://127.0.0.1:5000/api/upload', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();
        
        if (data.error) {
            throw new Error(data.error);
        }

        currentPdfText = data.text;
        
        // PDF 미리보기
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        const page = await pdf.getPage(1);
        const viewport = page.getViewport({ scale: 1.0 });
        
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        
        pdfPreview.innerHTML = '';
        pdfPreview.appendChild(canvas);
        
        await page.render({
            canvasContext: context,
            viewport: viewport
        }).promise;

    } catch (error) {
        alert('파일 처리 중 오류가 발생했습니다: ' + error.message);
    } finally {
        hideLoading();
    }
}

// 요약 기능
summarizeBtn.addEventListener('click', async () => {
    if (!currentPdfText) {
        alert('먼저 PDF 파일을 업로드해주세요.');
        return;
    }

    showLoading();
    try {
        const response = await fetch('http://127.0.0.1:5000/api/summarize', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: currentPdfText })
        });

        const data = await response.json();
        
        if (data.error) {
            throw new Error(data.error);
        }

        summaryResult.innerHTML = `
            <div class="result-content">
                <h4>문서 요약</h4>
                <p>${data.summary}</p>
            </div>
        `;
    } catch (error) {
        alert('요약 중 오류가 발생했습니다: ' + error.message);
    } finally {
        hideLoading();
    }
});

// 개념 추출 기능
conceptsBtn.addEventListener('click', async () => {
    if (!currentPdfText) {
        alert('먼저 PDF 파일을 업로드해주세요.');
        return;
    }

    showLoading();
    try {
        const response = await fetch('http://127.0.0.1:5000/api/extract-concepts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: currentPdfText })
        });

        const data = await response.json();
        
        if (data.error) {
            throw new Error(data.error);
        }

        const conceptsHtml = data.concepts.map(concept => 
            `<li>${concept}</li>`
        ).join('');

        conceptsResult.innerHTML = `
            <div class="result-content">
                <h4>주요 개념</h4>
                <ul class="concepts-list">
                    ${conceptsHtml}
                </ul>
            </div>
        `;
    } catch (error) {
        alert('개념 추출 중 오류가 발생했습니다: ' + error.message);
    } finally {
        hideLoading();
    }
});

// 퀴즈 생성 기능
quizBtn.addEventListener('click', async () => {
    if (!currentPdfText) {
        alert('먼저 PDF 파일을 업로드해주세요.');
        return;
    }

    showLoading();
    try {
        const response = await fetch('http://127.0.0.1:5000/api/generate-quiz', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: currentPdfText })
        });

        const data = await response.json();
        
        if (data.error) {
            throw new Error(data.error);
        }

        const quizHtml = data.quiz.map((item, index) => `
            <div class="quiz-item">
                <h4>문제 ${index + 1}</h4>
                <p class="question">${item.question}</p>
                <ul class="options-list">
                    ${item.options.map(option => `<li>${option}</li>`).join('')}
                </ul>
            </div>
        `).join('');

        quizResult.innerHTML = `
            <div class="result-content">
                <h4>퀴즈</h4>
                ${quizHtml}
            </div>
        `;
    } catch (error) {
        alert('퀴즈 생성 중 오류가 발생했습니다: ' + error.message);
    } finally {
        hideLoading();
    }
});

// 로딩 표시 함수
function showLoading() {
    loadingOverlay.style.display = 'flex';
}

function hideLoading() {
    loadingOverlay.style.display = 'none';
} 
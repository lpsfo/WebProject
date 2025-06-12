import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const SidebarContainer = styled.div`
  width: 250px;
  height: 100%;
  background-color: #f8f9fa;
  border-right: 1px solid #dee2e6;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  font-size: 1.2rem;
  margin-bottom: 20px;
  color: #333;
`;

const FileInput = styled.input`
  display: none;
`;

const UploadButton = styled.label`
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  margin-bottom: 20px;
  &:hover {
    background-color: #0056b3;
  }
`;

const FileList = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const FileItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #dee2e6;
  &:last-child {
    border-bottom: none;
  }
`;

const FileName = styled.span`
  flex: 1;
  margin-right: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const DeleteButton = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 3px;
  padding: 5px 10px;
  cursor: pointer;
  &:hover {
    background-color: #c82333;
  }
`;

function FileSidebar({ onFilesUpdate }) {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('files') || '[]');
    if (JSON.stringify(saved) !== JSON.stringify(files)) {
      setFiles(saved);
      onFilesUpdate(saved);
    }
  }, []);


  const readFileContent = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        resolve(event.target.result);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      if (file.type === 'application/pdf') {
        // PDF 파일은 현재 텍스트 추출이 불가능하므로 안내 메시지 반환
        resolve('PDF 파일은 현재 텍스트 추출이 지원되지 않습니다.');
      } else {
        reader.readAsText(file);
      }
    });
  };

  const handleFileUpload = async (event) => {
    const newFiles = Array.from(event.target.files);
    const processedFiles = await Promise.all(
      newFiles.map(async (file) => {
        try {
          const content = await readFileContent(file);
          return {
            name: file.name,
            type: file.type,
            size: file.size,
            lastModified: file.lastModified,
            content: content
          };
        } catch (error) {
          console.error(`Error reading file ${file.name}:`, error);
          return {
            name: file.name,
            type: file.type,
            size: file.size,
            lastModified: file.lastModified,
            content: '파일을 읽는 중 오류가 발생했습니다.'
          };
        }
      })
    );

    const updatedFiles = [...files, ...processedFiles];
    setFiles(updatedFiles);
    localStorage.setItem('files', JSON.stringify(updatedFiles));
    onFilesUpdate(updatedFiles);
  };

  const handleFileDelete = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    localStorage.setItem('files', JSON.stringify(updatedFiles));
    onFilesUpdate(updatedFiles);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <SidebarContainer>
      <Title>파일 관리</Title>
      <FileInput
        type="file"
        id="file-upload"
        multiple
        accept=".txt,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
        onChange={handleFileUpload}
      />
      <UploadButton htmlFor="file-upload">
        파일 추가
      </UploadButton>
      <FileList>
        {files.map((file, index) => (
          <FileItem key={index}>
            <FileName title={file.name}>
              {file.name}
              <br />
              <small>{formatFileSize(file.size)}</small>
            </FileName>
            <DeleteButton onClick={() => handleFileDelete(index)}>
              삭제
            </DeleteButton>
          </FileItem>
        ))}
      </FileList>
    </SidebarContainer>
  );
}

export default FileSidebar; 
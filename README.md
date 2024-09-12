# ContractIQ - Legal Contract Interrogator & Extractor

ContractIQ is a legal document processing platform that allows users to extract and interrogate legal contracts using advanced AI techniques. This project provides two core functionalities:
1. **Interrogation** - Ask natural language questions about the contract.
2. **Extraction** - Extract key legal information (e.g., effective date, governing law, parties involved) from contract documents in `.docx` and `.pdf` formats.

The platform leverages FastAPI for the backend and Angular for the frontend, while using OpenAI's GPT model to process and understand legal contracts.

## Features
- Upload `.docx` or `.pdf` contract files and extract information.
- Ask natural language questions about the content of the contract.
- Uses **FastAPI** for the backend and **Angular** for the frontend.
- Utilizes **OpenAI's GPT-3.5** for intelligent contract interrogation.
- Chunking, query expansion, and hybrid dense + sparse search to improve accuracy.
  
## Technologies Used
- **Frontend**: Angular (with Material design)
- **Backend**: FastAPI (Python)
- **AI/ML**: OpenAI GPT-3.5 for legal document interrogation
- **Deployment**: NGINX, Uvicorn, Systemd, AWS EC2

## Table of Contents
1. [Installation](#installation)
2. [Usage](#usage)
3. [API Endpoints](#api-endpoints)
4. [Frontend](#frontend)
5. [Backend](#backend)
6. [Contributing](#contributing)

## Installation

### Prerequisites
- Python 3.8+
- Node.js & Angular CLI
- NGINX (for deployment)
- OpenAI API key (for GPT integration)

### Backend Installation
1. Clone the repository and navigate to the backend directory:
    ```bash
    git clone https://github.com/yourusername/contract-iq.git
    cd contract-iq/src/api
    ```

2. Create a virtual environment:
    ```bash
    python3 -m venv venv
    source venv/bin/activate
    ```

3. Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```

4. Create a `.env` file with your OpenAI API key:
    ```bash
    touch .env
    ```

   Inside `.env`, add the following line:
    ```bash
    OPENAI_API_KEY=your_openai_api_key_here
    ```

5. Start FastAPI with Uvicorn:
    ```bash
    uvicorn main:app --reload
    ```

### Frontend Installation
1. Navigate to the frontend directory:
    ```bash
    cd contract-iq/src/app
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Run the Angular development server:
    ```bash
    ng serve
    ```

4. Access the app at `http://localhost:4200`.

## Usage

### Backend API
The FastAPI backend provides the core API for contract interrogation and extraction. It includes two primary routes:

- `/contracts/interrogate`: Interrogates a `.docx` file based on natural language queries.
- `/contracts/extract`: Extracts key information (effective date, governing law, parties involved) from a legal document.

### Frontend
Once the Angular frontend is running, navigate to the main page where you can upload a contract, ask questions, and view the extracted legal information.

## API Endpoints

### POST `/contracts/interrogate`
Interrogates the contract with natural language questions.

- **Request Parameters**:
  - `query`: Natural language question.
  - `file`: `.docx` or `.pdf` contract file.

- **Response**:
  - `answer`: Answer generated based on the context of the contract.

### POST `/contracts/extract`
Extracts key contract information from a `.docx` or `.pdf` file.

- **Request Parameters**:
  - `file`: `.docx` or `.pdf` contract file.

- **Response**:
  - `data`: A formatted result with effective date, governing law, and parties involved.

## Frontend
The Angular frontend allows users to upload legal contracts and ask questions interactively.

### Features:
- Drag and drop contract upload
- Interrogator and extractor tools with a user-friendly interface
- Responsive design using Angular Material

### Key Components:
- **HomeComponent**: Introduction and overview of the app.
- **InterrogatorComponent**: The interface for querying contracts.
- **ExtractorComponent**: The interface for extracting contract details.

## Backend
The backend is built using **FastAPI** and uses **OpenAI's GPT-3.5** for language processing.

### Backend Flow:
1. **File Upload**: The `.docx` or `.pdf` file is uploaded to FastAPI.
2. **Text Extraction**: The text is extracted using libraries like `python-docx` for `.docx` and `PyMuPDF` for `.pdf`.
3. **Chunking**: The extracted text is chunked for efficient processing.
4. **Query Expansion**: The input query is expanded using synonyms for better accuracy.
5. **AI Processing**: The query and relevant chunks are passed to OpenAI's GPT to generate the answer.

### Core Modules:
- **document_parser.py**: Handles text extraction from `.docx` and `.pdf` files.
- **chunking_processor.py**: Breaks down the text into smaller chunks for better querying.
- **interrogation.py**: Handles interaction with OpenAI's GPT to generate answers.

## Deployment

### NGINX Configuration
NGINX is configured as a reverse proxy to serve the frontend and proxy API requests to FastAPI:

```nginx
server {
    server_name contractiq.dulandias.com;

    location / {
        root /var/www/contractiq.dulandias.com;
        try_files $uri /index.html;
    }

    location /api/ {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

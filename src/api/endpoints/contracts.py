from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile
from engine.info_extraction import generate_extraction
from engine.chunking_processor import chunk_text, generate_answer, retrieve_relevant_chunks
from engine.document_parser import extract_text_from_docx, extract_text_from_pdf
from auth import get_current_user
# from engine import extract_information, interrogate_contract

router = APIRouter()

@router.post("/extract")
async def extract_contract_info(file: UploadFile = File(...), user: dict = Depends(get_current_user)):
    """
    Extract key information like the effective date, governing law, and parties from a contract.
    """
    try:
        # Step 1: Extract the text from the uploaded PDF file
        pdf_content = extract_text_from_pdf(file.file)

        # Step 2: Send a single query to OpenAI to extract the required information
        extracted_data = generate_extraction(pdf_content)

        # Return the extracted data
        return {"status": "success", "data": extracted_data}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error extracting contract: {e}")


@router.post("/interrogate")
async def interrogate_contract_endpoint(
    query: str = Form(...), 
    file: UploadFile = File(...), 
    user: dict = Depends(get_current_user)
):
    """
    Interrogate the contract by asking natural language questions.
    """
    try:
        # Step 1: Extract text from the .docx file
        # Use the file-like object and pass it directly to the docx parser
        document_text = extract_text_from_docx(file.file)  # Use file.file, not raw bytes
        
        # Step 2: Chunk the document text
        chunks = chunk_text(document_text)
        
        # Step 3: Retrieve relevant chunks
        relevant_chunks = retrieve_relevant_chunks(query, chunks)
        
        # Step 4: Generate an answer using the retrieved chunks
        answer = generate_answer(query, relevant_chunks)
        
        return {"status": "success", "answer": answer}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error interrogating contract: {e}")
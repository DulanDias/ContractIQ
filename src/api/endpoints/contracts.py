from fastapi import APIRouter, Depends, HTTPException
from auth import get_current_user
# from engine import extract_information, interrogate_contract

router = APIRouter()

@router.post("/extract")
async def extract_contract_info(file: bytes, user: dict = Depends(get_current_user)):
    """
    Extract key information like the effective date, governing law, and parties from a contract.
    """
    try:
        # extracted_data = extract_information(file)
        extracted_data = "test"
        return {"status": "success", "data": extracted_data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error extracting contract: {e}")

@router.post("/interrogate")
async def interrogate_contract_endpoint(query: str, file: bytes, user: dict = Depends(get_current_user)):
    """
    Interrogate the contract by asking natural language questions.
    """
    try:
        # answer = interrogate_contract(query, file)
        answer = "test"
        return {"status": "success", "answer": answer}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error interrogating contract: {e}")

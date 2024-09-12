import fitz  # PyMuPDF for PDF
import docx

def extract_text_from_pdf(pdf_file):
    """
    Extracts text from a PDF file.
    
    Args:
        pdf_file: The uploaded PDF file (UploadFile object in FastAPI).
        
    Returns:
        The extracted text from the entire PDF document as a single string.
    """
    try:
        # Read the PDF file into bytes
        pdf_bytes = pdf_file.read()

        # Open the PDF from the byte stream
        doc = fitz.open(stream=pdf_bytes, filetype="pdf")
        text = ""

        # Loop through each page and extract text
        for page_num in range(len(doc)):
            page = doc.load_page(page_num)  # Load each page
            text += page.get_text("text")  # Extract text from the page

        return text

    except Exception as e:
        raise Exception(f"Error extracting text from PDF: {e}")

def extract_text_from_docx(docx_file):
    """Parse .docx file and return the extracted text."""
    doc = docx.Document(docx_file)
    text = ""
    for paragraph in doc.paragraphs:
        if paragraph.text.strip():
            text += paragraph.text + "\n"
    return text
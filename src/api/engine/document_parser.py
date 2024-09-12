import fitz  # PyMuPDF for PDF
import docx

def extract_text_from_pdf(pdf_file):
    """Extracts text from a PDF file."""
    doc = fitz.open(pdf_file)
    text = ""
    for page in doc:
        text += page.get_text()
    return text

def extract_text_from_docx(docx_file):
    """Parse .docx file and return the extracted text."""
    doc = docx.Document(docx_file)
    text = ""
    for paragraph in doc.paragraphs:
        if paragraph.text.strip():
            text += paragraph.text + "\n"
    return text
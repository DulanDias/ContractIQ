import re

def extract_effective_date(text):
    """Extracts the effective date using regex."""
    pattern = r"(Effective Date:|effective as of|commencing on|effective on)\s*(\w+\s+\d{1,2},\s+\d{4})"
    match = re.search(pattern, text, re.IGNORECASE)
    return match.group(2) if match else None

def extract_governing_law(text):
    """Extracts the governing law using regex."""
    pattern = r"(Governing Law:|This Agreement shall be governed by the laws of)\s*([A-Za-z\s]+)"
    match = re.search(pattern, text, re.IGNORECASE)
    return match.group(2) if match else None

def extract_parties(text):
    """Extracts the parties involved."""
    pattern = r"(This Agreement is made between|Parties:)\s*([A-Za-z\s]+)\s+and\s+([A-Za-z\s]+)"
    match = re.search(pattern, text, re.IGNORECASE)
    return (match.group(2), match.group(3)) if match else None

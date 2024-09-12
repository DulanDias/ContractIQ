import nltk
from nltk.corpus import wordnet

nltk.download('wordnet')

def chunk_text(text, max_chunk_size=500):
    words = text.split()
    chunks = []
    current_chunk = []
    current_chunk_size = 0
    for word in words:
        current_chunk.append(word)
        current_chunk_size += len(word) + 1  # +1 for space
        if current_chunk_size >= max_chunk_size:
            chunks.append(' '.join(current_chunk))
            current_chunk = []
            current_chunk_size = 0
    if current_chunk:
        chunks.append(' '.join(current_chunk))
    return chunks

def expand_query_with_synonyms(query):
    """Expands query using synonyms."""
    words = query.split()
    expanded_words = []
    for word in words:
        synonyms = wordnet.synsets(word)
        lemmas = set()
        for syn in synonyms:
            for lemma in syn.lemmas():
                lemmas.add(lemma.name())
        expanded_words.append(f"({word} {' '.join(lemmas)})")
    return ' '.join(expanded_words)

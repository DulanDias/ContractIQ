import re
from dotenv import load_dotenv

import os

from openai import OpenAI

# Load environment variables from a .env file in the current directory
load_dotenv(dotenv_path='.env')

# Fetch the OpenAI API key from the environment
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

client = OpenAI(
organization='org-lBcuIkpGwhG47FRFOKorbga3',
project='proj_JNFM7PFGkbZgg5rsMJjOQYjD',
api_key = OPENAI_API_KEY
)

def generate_extraction(context):
    """
    Send a single prompt to OpenAI to extract multiple pieces of information
    (Effective Date, Governing Law, Parties Involved) from the contract text.
    """
    # Construct a single prompt with all the required questions
    prompt = f"""
    You are a legal assistant. From the contract provided, extract the following information:

    1. What is the effective date of the contract?
    2. What is the governing law of the contract?
    3. Who are the parties involved in the contract?

    Context:
    {context}
    """

    # Use OpenAI's GPT-3.5-turbo model to process the request
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful legal assistant."},
            {"role": "user", "content": prompt}
        ],
        max_tokens=500,  # Adjust based on expected response length
        temperature=0.2  # Lower temperature to reduce hallucinations
    )

    # Extract and return the generated response
    return response.choices[0].message.content

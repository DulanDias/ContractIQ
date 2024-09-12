from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from endpoints import contracts
from auth import ACCESS_TOKEN_EXPIRE_MINUTES, Token, oauth2_scheme, create_access_token
from fastapi.security import OAuth2PasswordRequestForm

app = FastAPI()

# Allow cross-origin requests from the frontend (Angular)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],  # Angular app's URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Authentication route to get a token
@app.post("/token", response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = fake_users_db.get(form_data.username)
    if not user or not verify_password(form_data.password, user["hashed_password"]):
        raise HTTPException(
            status_code=400, detail="Incorrect username or password"
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user["username"]}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

# Include contract endpoints
app.include_router(contracts.router, prefix="/contracts")

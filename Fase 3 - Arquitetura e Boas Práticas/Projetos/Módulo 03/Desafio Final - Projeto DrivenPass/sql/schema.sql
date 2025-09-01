CREATE TABLE "User" (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    "createdAt" TIMESTAMP DEFAULT NOW()
);

CREATE TABLE "Credential" (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    url TEXT,
    username TEXT NOT NULL,
    "passwordCipher" TEXT NOT NULL,
    iv TEXT NOT NULL,
    tag TEXT NOT NULL,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "userId" INTEGER NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
    CONSTRAINT unique_user_title UNIQUE ("userId", title)
);

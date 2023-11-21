CREATE DATABASE bankApp;

CREATE TABLE transactions (
    id VARCHAR(255) PRIMARY KEY,
    userEmail VARCHAR(255),
    name VARCHAR(255),
    option VARCHAR(255),
    destination VARCHAR(255),
    amount VARCHAR(255),
    date VARCHAR(300)
);

CREATE TABLE users (
    email VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255),
    hashed_password VARCHAR(255),
    currency INTEGER
);

CREATE TABLE cards (
    id VARCHAR(255) PRIMARY KEY,
    email VARCHAR(255),
    card_number VARCHAR(255),
    cvv VARCHAR(255),
    primary_card BOOLEAN,
    type VARCHAR(255)
);
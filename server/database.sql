CREATE DATABASE echo;

CREATE TABLE user_info (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(255),
    is_paid BOOLEAN DEFAULT FALSE
);
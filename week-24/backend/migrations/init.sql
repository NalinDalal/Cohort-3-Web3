CREATE TABLE binanceUsers (
    id       SERIAL PRIMARY KEY,
    username VARCHAR(255),
    password VARCHAR(255) NOT NULL,
    depositAddress VARCHAR(255) NOT NULL,
    privateKey VARCHAR(255) NOT NULL,
    balance VARCHAR(255) NOT NULL
)

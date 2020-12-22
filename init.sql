DROP TABLE ORDERS;
CREATE TABLE ORDERS (
    order_id SERIAL PRIMARY KEY,
    charter_id int NOT NULL,
    charter_name VARCHAR(128) NOT NULL,
    order_timedate TIMESTAMP NOT NULL,
    contact_name VARCHAR(128) NOT NULL
);


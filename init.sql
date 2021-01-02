DROP TABLE ORDERS;
CREATE TABLE ORDERS (
    order_id SERIAL PRIMARY KEY,
    charter_id int NOT NULL,
    charter_name VARCHAR(128) NOT NULL,
    order_timedate TIMESTAMP NOT NULL,
    contact_name VARCHAR(128) NOT NULL
);

INSERT INTO ORDERS (charter_id, charter_name, order_timedate, contact_name) VALUES(1, 'Inshore 1', now(), 'Kenny');

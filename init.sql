DROP TABLE RESERVATIONS;
CREATE TABLE RESERVATIONS (
    reservation_id SERIAL PRIMARY KEY,
    charter_id int NOT NULL,
    charter_name VARCHAR(128) NOT NULL,
    reservation_timedate TIMESTAMP NOT NULL,
    contact_name VARCHAR(128) NOT NULL
);

INSERT INTO RESERVATIONS (charter_id, charter_name, reservation_timedate, contact_name) VALUES(1, 'Inshore 1', now(), 'Kenny');

CREATE DATABASE media_library;
USE media_library;

CREATE TABLE items(
	ID int NOT NULL AUTO_INCREMENT,
    police_id varchar(20) NOT NULL,
    case_id varchar(20),
	created datetime default now(),
    date_archived date,
    note varchar(255),
    PRIMARY KEY (ID)
);

CREATE TABLE suspects(
	ID int NOT NULL AUTO_INCREMENT,
    first_name varchar(30),
    last_name varchar(30),
    PRIMARY KEY (ID)
);

CREATE TABLE suspect_items(
    item_id int,
    suspect_id int,
    PRIMARY KEY(item_id) REFERENCES suspects(ID),
    PRIMARY KEY(suspect_id) REFERENCES items(ID)
);

CREATE TABLE borrowers(
	ID int NOT NULL AUTO_INCREMENT,
    first_name varchar(30),
    last_name varchar(30),
    PRIMARY KEY (ID)
);

CREATE TABLE loans(
	ID int NOT NULL AUTO_INCREMENT,
    borrower_id int NOT NULL,
    item_id int NOT NULL,
    date_borrowed datetime default now(),
    date_returned datetime,
    PRIMARY KEY (ID),
    FOREIGN KEY(borrower_id) REFERENCES borrowers(ID),
    FOREIGN KEY(item_id) REFERENCES items(ID)
);
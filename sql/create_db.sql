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
    ID int NOT NULL AUTO_INCREMENT, 
    item_id int NOT NULL,
    suspect_id int NOT NULL,
    FOREIGN KEY (item_id) REFERENCES items(ID) ON DELETE CASCADE,
    FOREIGN KEY (suspect_id) REFERENCES suspects(ID) ON DELETE CASCADE,
    PRIMARY KEY(ID)
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
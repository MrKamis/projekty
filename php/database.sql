CREATE DATABASE projects;

USE projects;

CREATE TABLE listOfProjets(
    title TEXT,
    version TEXT,
    author TEXT,
    last_modify DATE,
    describe TEXT,
    href TEXT,
    git TEXT,
    tags TEXT,
    id PRIMARY KEY AUTO_INCREMENT,
    blocked BOOLEAN
);
CREATE DATABASE projects;

USE projects;

CREATE TABLE listOfProjets(
    title TEXT,
    version TEXT,
    author TEXT,
    last_modify DATE,
    project_describe TEXT,
    href TEXT,
    git TEXT,
    tags TEXT,
    id INT PRIMARY KEY AUTO_INCREMENT,
    blocked BOOLEAN
);
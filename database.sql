CREATE DATABASE dashdrop;

\c dashdrop;

CREATE TABLE files (
    id TEXT PRIMARY KEY,
    "name" TEXT NOT NULL,
    "path" TEXT UNIQUE NOT NULL,
    createdAt TIMESTAMP NOT NULL,
    expirationDate TIMESTAMP NOT NULL
);

INSERT INTO files (id, "name", "path", createdAt, expirationDate) VALUES ('Nrv250Hx', 'filename.jpg', '/s3/path/1', now(), now());
INSERT INTO files (id, "name", "path", createdAt, expirationDate) VALUES ('WEQjDl8D', 'filename.jpg', '/s3/path/2', now(), now());
INSERT INTO files (id, "name", "path", createdAt, expirationDate) VALUES ('n10zNtZL', 'filename.jpg', '/s3/path/3', now(), now());
INSERT INTO files (id, "name", "path", createdAt, expirationDate) VALUES ('uCt8ONm_', 'filename.jpg', '/s3/path/4', now(), now());
INSERT INTO files (id, "name", "path", createdAt, expirationDate) VALUES ('WFW6rg0D', 'filename.jpg', '/s3/path/5', now(), now());

SELECT * FROM files;

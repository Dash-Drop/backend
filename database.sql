CREATE DATABASE dashdrop;

CREATE TABLE files (
    id serial PRIMARY KEY,
    file_id text UNIQUE NOT NULL,
    path text UNIQUE NOT NULL
);

INSERT INTO files (file_id, path) VALUES ('sfMIwcLX', '/s3/path/1');
INSERT INTO files (file_id, path) VALUES ('Nrv250Hx', '/s3/path/2');
INSERT INTO files (file_id, path) VALUES ('SVC0EbFd', '/s3/path/3');
INSERT INTO files (file_id, path) VALUES ('SJS_lo1h', '/s3/path/4');
INSERT INTO files (file_id, path) VALUES ('to5XhrbG', '/s3/path/5');

SELECT * FROM files;


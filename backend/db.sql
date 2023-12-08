CREATE DATABASE sample_db;
USE sample_db;
CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);
INSERT INTO users (name, email, password)
VALUES ('John Doe', 'johndoe@example.com', 'password123');
INSERT INTO users (name, email, password)
VALUES (
    'Jane Smith',
    'janesmith@example.com',
    'password456'
  );
INSERT INTO users (name, email, password)
VALUES (
    'Bob Johnson',
    'bobjohnson@example.com',
    'password789'
  );
/** source [full file path] -> to run file, pls destroy if u make any changes first so **/
/** source /Users/yasemin/Desktop/finalproj/backend/db.sql -> to run it **/
/** source /Users/yasemin/Desktop/finalproj/backend/destroy.sql -> to destroy it **/
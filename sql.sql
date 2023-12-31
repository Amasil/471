Create DATABASE Website;
USE Website;
CREATE TABLE User (
User_ID INT NOT NULL AUTO_INCREMENT, First_Name VARCHAR(255) NOT NULL, Middle_Name VARCHAR(255),
Last_Name VARCHAR(255) NOT NULL, Username VARCHAR(255) NOT NULL, Password VARCHAR(255) NOT NULL,
Email VARCHAR(255) NOT NULL,
Phone_No VARCHAR(20) NOT NULL, Blood_Group VARCHAR(5), Last_Donation_Date VARCHAR(255), User_Type VARCHAR(20) NOT NULL, PRIMARY KEY (User_ID),
UNIQUE (Email),
UNIQUE (Username),
UNIQUE (Phone_No)
);
CREATE TABLE FEEDBACK (
User_ID int NOT NULL UNIQUE,
Feedback_ID INT NOT NULL AUTO_INCREMENT, Feedback_Date DATE,
Details varchar(500),
Comment varchar(1000),
Rating int,
PRIMARY KEY (Feedback_ID),
FOREIGN KEY(User_ID) REFERENCES USER(User_ID) );
CREATE TABLE MEDICAL_STAFF ( Medical_ID int NOT NULL UNIQUE, Degree varchar(255), Department_ID int NOT NULL, Alert_ID int NOT NULL,
PRIMARY KEY(Medical_ID, Department_ID) );
CREATE TABLE GENERAL_PUBLIC (
Public_ID int NOT NULL UNIQUE,
Blood_Type varchar(255),
PRIMARY KEY (Public_ID),
FOREIGN KEY(Public_ID) REFERENCES USER(User_ID) );
 CREATE TABLE DONOR (
Donor_ID int NOT NULL UNIQUE,
No_of_donations int,
PRIMARY KEY (Donor_ID),
FOREIGN KEY(Donor_ID) REFERENCES GENERAL_PUBLIC(Public_ID) );
CREATE TABLE RECIPIENT (
Recipient_ID int NOT NULL UNIQUE,
Diagnosis varchar(255),
PRIMARY KEY (Recipient_ID),
FOREIGN KEY(Recipient_ID) REFERENCES GENERAL_PUBLIC(Public_ID) );
CREATE TABLE EMERGENCY_ALERT ( Alert_ID INT NOT NULL AUTO_INCREMENT, Alert_timestamp TIMESTAMP NOT NULL, Blood_type varchar(255) NOT NULL, Hospital_ID int NOT NULL,
Medical_ID int NOT NULL,
PRIMARY KEY(Alert_ID)
);
CREATE TABLE DEPARTMENT (
Department_ID int NOT NULL AUTO_INCREMENT, Department_name varchar(255) NOT NULL, Location varchar(300) NOT NULL,
Contact_info varchar(500) NOT NULL, Emergency_Protocol varchar(500) NOT NULL, PRIMARY KEY(Department_ID)
);
CREATE TABLE INVENTORY ( Hospital_ID int NOT NULL, No_of_units int NOT NULL, Blood_type varchar(255) NOT NULL );
CREATE TABLE DONATION_APPOINTMENT (
Appointment_ID INT AUTO_INCREMENT PRIMARY KEY,
USER_ID INT NOT NULL,
Status VARCHAR(255) NOT NULL,
Appointment_Date DATE NOT NULL,
Appointment_Time TIME NOT NULL,
FOREIGN KEY (USER_ID) REFERENCES USER(USER_ID)
);

CREATE TABLE TRANSFUSION_APPOINTMENT ( Transfusion_ID INT AUTO_INCREMENT PRIMARY KEY,
Medical_ID INT NOT NULL,
Volume INT NOT NULL,
Type varchar(255) NOT NULL,
Transfusion_date DATE NOT NULL,
Transfusion_Time TIME NOT NULL,
Recipient_ID INT NOT NULL,
FOREIGN KEY(Recipient_ID) REFERENCES RECIPIENT(Recipient_ID), FOREIGN KEY(Medical_ID) REFERENCES MEDICAL_STAFF(Medical_ID)
);

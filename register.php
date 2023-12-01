<?php
$servername = "localhost";
$username = "root";
$password = "sZ10O84<";
$dbname = "Test";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Process user registration
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = mysqli_real_escape_string($conn, $_POST["register-username"]);
    $password = mysqli_real_escape_string($conn, $_POST["register-password"]);
    $email = mysqli_real_escape_string($conn, $_POST["register-email"]);
    $phone = mysqli_real_escape_string($conn, $_POST["register-phone"]);
    $bloodGroup = mysqli_real_escape_string($conn, $_POST["register-bloodGroup"]);
    $lastDonationDate = mysqli_real_escape_string($conn, $_POST["register-lastDonationDate"]);

    // Hash the password (for security)
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // Insert data into User table
    $sql = "INSERT INTO User (Username, Password, Email, Phone_No, Blood_Group, Last_Donation_Date) VALUES ('$username', '$hashedPassword', '$email', '$phone', '$bloodGroup', '$lastDonationDate')";

    if ($conn->query($sql) === TRUE) {
        echo "<script type=\"text/javascript\">" .
            "alert('User registered successfully');" .
            "window.location = 'index.html';" .
            "</script>";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

$conn->close();

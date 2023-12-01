<?php
$servername = "localhost";
$username = "root";
$password = "sZ10O84<";
$dbname = "Test";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["phone"])) {
    $phone = $_POST["phone"];

    $sql = "SELECT * FROM User WHERE Phone_No = '$phone'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // Phone number already exists
        echo "taken";
    } else {
        // Phone number is available
        echo "available";
    }
}

$conn->close();

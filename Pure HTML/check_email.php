<?php
$servername = "localhost";
$username = "root";
$password = "sZ10O84<";
$dbname = "Test";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["email"])) {
    $email = $_POST["email"];
    
    $sql = "SELECT * FROM User WHERE Email = '$email'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // Email already exists
        echo "taken";
    } else {
        // Email is available
        echo "available";
    }
}

$conn->close();
?>

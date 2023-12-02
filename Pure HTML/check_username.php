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

// Check if the username exists in the database
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["username"])) {
    $username = $_POST["username"];
    
    $sql = "SELECT * FROM User WHERE Username = '$username'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // Username already exists
        echo "taken";
    } else {
        // Username is available
        echo "available";
    }
}

$conn->close();
?>

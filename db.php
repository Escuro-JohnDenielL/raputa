<?php
$servername = "localhost";
$username = "u586757316_jpopescuro";
$password = "Escuro123!";
$dbname = "u586757316_jpop";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>

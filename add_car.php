<?php
$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "car_management";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$car_id = $_POST['car_id'];
$owner = $_POST['owner'];

$sql = "INSERT INTO cars (car_id, owner, violations) VALUES ('$car_id', '$owner', '[]')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Автомобиль с таким ID уже существует.']);
}

$conn->close();
?>

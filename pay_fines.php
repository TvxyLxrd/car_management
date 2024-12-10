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

$sql = "UPDATE cars SET violations='[]' WHERE car_id='$car_id'";

if ($conn->query($sql) === TRUE) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Ошибка при оплате штрафов.']);
}

$conn->close();
?>

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

// Проверка на администратора
if ($car_id === 'admin') {
    echo json_encode(['success' => true, 'isAdmin' => true]);
} else {
    $sql = "SELECT * FROM cars WHERE car_id='$car_id'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $car = $result->fetch_assoc();
        echo json_encode(['success' => true, 'isAdmin' => false, 'car' => $car]);
    } else {
        echo json_encode(['success' => false]);
    }
}

$conn->close();
?>

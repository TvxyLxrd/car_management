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
$date = $_POST['date'];
$time = $_POST['time'];
$type = $_POST['type'];
$fine = $_POST['fine'];

$sql = "SELECT * FROM cars WHERE car_id='$car_id'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $car = $result->fetch_assoc();
    $violations = json_decode($car['violations'], true);
    $violations[] = ['date' => $date, 'time' => $time, 'type' => $type, 'fine' => $fine];
    $violations_json = json_encode($violations);

    $sql = "UPDATE cars SET violations='$violations_json' WHERE car_id='$car_id'";
    if ($conn->query($sql) === TRUE) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Ошибка при добавлении нарушения.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Автомобиль с таким ID не найден.']);
}

$conn->close();
?>

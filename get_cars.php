<?php
$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "car_management";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM cars";
$result = $conn->query($sql);

$cars = [];
while ($row = $result->fetch_assoc()) {
    $cars[] = ['car_id' => $row['car_id'], 'owner' => $row['owner'], 'violations' => json_decode($row['violations'], true)];
}

echo json_encode($cars);

$conn->close();
?>

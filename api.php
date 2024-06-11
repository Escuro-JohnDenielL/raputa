<?php
include 'db.php';
parse_str(file_get_contents('php://input'), $data);
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $result = $conn->query("SELECT * FROM albums");
        $albums = $result->fetch_all(MYSQLI_ASSOC);
        foreach ($albums as $album) {
            echo $album['id'] . "," . $album['name'] . "," . $album['band'] . "," . $album['release_date'] . "," . $album['genre'] . "\n";
        }
        break;
    case 'POST':
        $sql = "INSERT INTO albums (name, band, release_date, genre) VALUES (?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ssss", $data['name'], $data['band'], $data['release_date'], $data['genre']);
        $stmt->execute();
        echo "Inserted album\n";
        break;
    case 'PATCH':
        $sql = "UPDATE albums SET name=?, band=?, release_date=?, genre=? WHERE id=?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ssssi", $data['name'], $data['band'], $data['release_date'], $data['genre'], $data['id']);
        $stmt->execute();
        echo "Updated album\n";
        break;
    case 'DELETE':
        $sql = "DELETE FROM albums WHERE id=?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $data['id']);
        $stmt->execute();
        echo "Deleted album\n";
        break;
}
?>

<?php
// Database connection
$conn = mysqli_connect("localhost", "root", "", "garbage"); // change db name if needed

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
// Collect data
$name = $_POST['name'];
$phone = $_POST['phone'];
$email = $_POST['email'];
$address = $_POST['address'];
$details = $_POST['details'];



// // Handle image upload
// $image = $_FILES['image']['name'];
// $target = "uploads/" . basename($image);
// move_uploaded_file($_FILES['image']['tmp_name'], $target);

// Insert into database
$sql = "INSERT INTO requests (name, phone, email, address, details)
        VALUES ('$name', '$phone', '$email', '$address', '$details')";

// Execute query
            $execute = mysqli_query($conn, $sql);

            // Check result
            if ($execute) {
                echo "<p>Data inserted successfully!</p>";
                echo "<script>location.replace('request_from.html');</script>";
            } else {
                echo "<p>Error: " . mysqli_error($conn) . "</p>";
            }

        // Close connection
        mysqli_close($conn);
?>
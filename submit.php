<?php

$host = "localhost";  // Change if using a remote server
$dbname = "MYCV";
$user = "postgres";  // Your PostgreSQL username
$password = "postgre123";  // Your PostgreSQL password

try {
    $conn = new PDO("pgsql:host=$host;dbname=$dbname", $user, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Connected to PostgreSQL successfully!<br>";
} catch (PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $message = $_POST["message"];

    // Insert into PostgreSQL
    $sql = "INSERT INTO contactme (Your_name, email, your_message) VALUES (:name, :email, :message)";
    $stmt = $conn->prepare($sql);
    
    try {
        $stmt->execute([
            ':name' => $name,
            ':email' => $email,
            ':message' => $message
        ]);

        // Redirect back to the form with a success message
        header("Location: http://localhost/webProfile/submit.php?success=1");
        exit();
    } catch (PDOException $e) {
        die("Error inserting data: " . $e->getMessage());
    }
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST["name"]);
    $email = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);
    $message = htmlspecialchars($_POST["message"]);

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Invalid email format";
        exit;
    }

    
    $to = "bala.earlconrad321@gmail.com"; 
    $subject = "New Form Submission from $name";
    $headers = "From: $email";
    
    // mail($to, $subject, $message, $headers); // Uncomment if you have email setup

    echo "Thank you for your message!";
}
?>

<?php
class Database{

    // specify your own database credentials
    private $servername = "localhost";
    private $username = "root";
    private $password = "14101974Bebo";
    private $dbname = "task_test";
    public $conn;

    // get the database connection
    public function getConnection(){
        $this->conn = null;
        try{
            $this->conn = new PDO("mysql:host=" . $this->servername . ";dbname=" . $this->dbname, $this->username, $this->password);
            $this->conn->exec("set names utf8");
        } catch(PDOException $exception){
            echo "Connection error: " . $exception->getMessage();
        }
        return $this->conn;
    }
}
?>
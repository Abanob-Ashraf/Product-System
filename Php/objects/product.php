<?php
class Product{

    // database connection and table name
    private $conn;
    private $table_name = "product";

    // object properties
    public $sku;
    public $name;
    public $price;
    public $size;
    public $weight;
    public $height;
    public $width;
    public $length;
    public $productType;
    public $productTypeName;

    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }

    // create product
    function create(){

        // query to insert record
        $query = "INSERT INTO
                " . $this->table_name . "
            SET
                sku=:sku, name=:name, price=:price, size=:size, weight=:weight, height=:height, width=:width, 
                length=:length, productType=:productType";

        // prepare query
        $stmt = $this->conn->prepare($query);

        // sanitize
        $this->sku=htmlspecialchars(strip_tags($this->sku));
        $this->name=htmlspecialchars(strip_tags($this->name));
        $this->price=htmlspecialchars(strip_tags($this->price));
        $this->size=htmlspecialchars(strip_tags($this->size));
        $this->weight=htmlspecialchars(strip_tags($this->weight));
        $this->height=htmlspecialchars(strip_tags($this->height));
        $this->width=htmlspecialchars(strip_tags($this->width));
        $this->length=htmlspecialchars(strip_tags($this->length));
        $this->productType=htmlspecialchars(strip_tags($this->productType));

        // bind values
        $stmt->bindParam("sku", $this->sku);
        $stmt->bindParam("name", $this->name);
        $stmt->bindParam("price", $this->price);
        $stmt->bindParam("size", $this->size);
        $stmt->bindParam("weight", $this->weight);
        $stmt->bindParam("height", $this->height);
        $stmt->bindParam("width", $this->width);
        $stmt->bindParam("length", $this->length);
        $stmt->bindParam("productType", $this->productType);

        // execute query
        if($stmt->execute()){
            return true;
        }
        return false;
    }

    //delete product
    function delete(){

        // delete query
        $query = "DELETE FROM " . $this->table_name . " WHERE sku = ?";

        // prepare query
        $stmt = $this->conn->prepare($query);

        // sanitize
        $this->sku=htmlspecialchars(strip_tags($this->sku));

        // bind id of record to delete
        $stmt->bindParam(1, $this->sku);

        // execute query
        if($stmt->execute()){
            return true;
        }
        return false;
    }

    // read products
    function read(){

        // select all query
        $query = "SELECT p.sku, p.name, p.price, p.size, p.weight, p.height, p.width, p.length, 
       p.productType , d.productTypeName
            FROM
                " . $this->table_name . " p
                LEFT JOIN
                    data_type d
                        ON p.productType = d.productType";

        // prepare query statement
        $stmt = $this->conn->prepare($query);

        // execute query
        $stmt->execute();

        return $stmt;
    }

    //search product
    function search(){

        // query to read single record
        $query = "SELECT p.sku, p.name, p.price, p.size, p.weight, p.height, p.width, p.length, 
       p.productType , d.productTypeName
            FROM
                " . $this->table_name . " p
                LEFT JOIN
                    data_type d
                        ON p.productType = d.productType
            WHERE
                p.sku = ?";

        // prepare query statement
        $stmt = $this->conn->prepare( $query );

        // bind id of product to be updated
        $stmt->bindParam(1, $this->sku);

        // execute query
        $stmt->execute();

        // get retrieved row
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        // set values to object properties
        $this->name = $row['name'];
        $this->price = $row['price'];
        $this->size = $row['size'];
        $this->weight = $row['weight'];
        $this->height = $row['height'];
        $this->width = $row['width'];
        $this->length = $row['length'];
        $this->productType = $row['productType'];
        $this->productTypeName = $row['productTypeName'];
    }
}
?>
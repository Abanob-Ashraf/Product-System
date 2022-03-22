<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

// include database and object files
include_once '../config/database.php';
include_once '../objects/product.php';

// get database connection
$database = new Database();
$db = $database->getConnection();

// prepare product object
$product = new Product($db);

// get product id
$data = json_decode(file_get_contents("php://input"));

// set product id to be deleted
$product->sku = $data->sku;

// read the details of product to be edited
$product->search();

if($product->sku!=null){

    // create array
    //sku, name, price, size, weight, height, width, length, productType
    $product_arr = array(
        "sku" => $product->sku,
        "name" => $product->name,
        "price" => $product->price,
        "size" => $product->size,
        "weight" => $product->weight,
        "height" => $product->height,
        "width" => $product->width,
        "length" => $product->length,
        //"productType" => $product->productType,
        "productTypeName" => $product->productTypeName
    );

    $filter = array_filter($product_arr);

    // set response code - 200 OK
    http_response_code(200);

    // make it json format
    echo json_encode($filter);
}

else{

    // set response code - 404 Not found
    http_response_code(404);

    // tell the user product does not exist
    echo json_encode(array("message" => "Product does not exist."));
}
?>
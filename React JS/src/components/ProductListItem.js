import React,{useState} from "react";
const ProductListItem = ({ product, f1 }) => {

    const [checked, setChecked]=useState (false);

  return (

    <div className="productItem">

        <input className="delete-checkbox"
            name="isGoing"
            type="checkbox"
            checked={checked}
            onChange={ () => {setChecked(!checked)
                f1(product.sku,!checked)
            }}
        />
        <h5>{product.sku} </h5>
        <h5>{product.name} </h5>
        <h5>{product.price} $</h5>
        {product.size && <h5> Size: {product.size} MB</h5>}
        {product.weight && <h5> Weight: {product.weight} KG</h5>}
        {product.height && product.width && product.length &&
            <h5> Dimension: {product.height}x{product.width}x{product.length} </h5>}
    </div>
  );
};

export default ProductListItem;

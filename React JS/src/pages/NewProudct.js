import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function NewProductPage () {
    const url = "http://taskassignment2.ml/Php/product/create.php"
    {/*sku, name, price, size, weight, height, width, lenght, productType*/}
    const [input, setInput] = useState({
        sku: "",
        name: "",
        price: "",
        size: "",
        weight: "",
        height: "",
        width: "",
        length: ""
    });

    const [productType,setProductType]=useState("");

    function submit(event){
        event.preventDefault();
        axios.post(url,{
            sku: input.sku,
            name: input.name,
            price: parseFloat(input.price),
            size: input.size,
            weight: input.weight,
            height: input.height,
            width: input.width,
            length: input.length,
            productType: parseInt(productType)
        })
            .then(res=>{})
    }

    function handleChange (event){
        const newInput={...input}
        newInput[event.target.id] = event.target.value
        setInput(newInput)
        console.log(newInput);
    }

    const navigate = useNavigate()

    function check(event) {
        if(input.sku && input.name && input.price && productType !=null) {
            if (productType === "1" || productType === "2" || productType === "3"){
                    submit(event)
                    setTimeout(() => {navigate("/")}, 500)
                } else {alert("Please, submit required data")}
        } else {alert("Please, submit required data")}
    }
    return (
        <div className="addPage">

            <form id="product_form" onSubmit={(event => submit(event))}>

                 <header>
                    <h1> Product Add </h1>

                    <div className="buttons2">

                            <button className="saveButton"
                                    onClick={(event => check(event))}>
                                Save
                            </button>

                            <button className="cancelButton" onClick={()=>navigate("/")}>
                                Cancel
                            </button>
                    </div>
                </header>

                <hr />

                <label>SKU:
                    <input className="SKU"
                        onChange={(event => handleChange(event))}
                        id="sku"
                        value={input.sku}
                        placeholder="#sku"
                        type="text"
                    />
                </label>

                <label>Name:
                    <input className="Name"
                        onChange={(event => handleChange(event))}
                        id="name"
                        value={input.name}
                        placeholder="#Name"
                        type="text"
                    />
                </label>

                <label>Price ($):
                    <input className="Price"
                        onChange={(event => handleChange(event))}
                        id="price"
                        value={input.price}
                        placeholder="#Price"
                        type="number"
                    />
                </label>

                <label>
                    Type Switcher:
                    <select id="productType"
                            value={productType}
                            onChange={(event=>setProductType(event.target.value))}>
                        <option value="Type Switcher" placeholder="Type Switcher"/>

                        <option  value={"1"}>
                            DVD
                        </option>

                        <option value={"2"}>
                            Book
                        </option>

                        <option value={"3"}>
                            Furniture
                        </option>
                    </select>
                </label>

                {productType === "1" && (
                    <>
                        <label> Size (MB):
                            <input
                                onChange={(event => handleChange(event))}
                                id="size"
                                value={input.size}
                                placeholder="#Size"
                                type="number"
                            />
                        </label>

                        <label className="labels">
                            Please, Provide size in Mb.
                        </label>
                    </>
                )}

                {productType === "2" && (
                    <>
                        <label>Weight (KG):
                            <input
                                onChange={(event => handleChange(event))}
                                id="weight"
                                value={input.weight}
                                placeholder="#Weight"
                                type="number"
                            />
                        </label>

                        <label className="labels">
                            Please, Provide Weight in Kg.
                        </label>
                    </>
                )}

                {productType === "3" && (
                    <>
                        <label>Height (H):
                            <input
                                onChange={(event => handleChange(event))}
                                id="height"
                                value={input.height}
                                placeholder="#Height"
                                type="number"
                            />
                        </label>

                        <label>Width (W):
                            <input
                                onChange={(event => handleChange(event))}
                                id="width"
                                value={input.width}
                                placeholder="#Width"
                                type="number"
                            />
                        </label>

                        <label>Length (L):
                            <input
                                onChange={(event => handleChange(event))}
                                id="length"
                                value={input.length}
                                placeholder="#Length"
                                type="number"
                            />
                        </label>

                        <label className="labels">
                            Please, Provide dimensions.
                        </label>
                    </>
                )}
            </form>

            <footer />

            <h3> Scandiweb Test assignment </h3>

        </div>
    );
}
export default NewProductPage;

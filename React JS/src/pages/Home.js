import React from "react"
import ProductListItem from "../components/ProductListItem"
import { Link } from 'react-router-dom'

// Create HomePage component
export default class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state={product : [],checkedIds: []}
    }

    componentDidMount() {
        fetch("http://taskassignment2.ml/Php/product/read.php")
            .then(res => res.json())
            .then(json => this.setState({product: json}))
    }
// {/*sku, name, price, size, weight, height, width, length, productType*/}
    _check=(sku,checked)=> {
        let arr2 = [];
        let arr4 = this.state.checkedIds;
        if (checked) {
            arr4.push({sku: sku});
            this.setState({checkedIds: arr4});
        } else {
            arr2 = this.state.checkedIds.filter((x) => x.sku != sku);
            this.setState({checkedIds: arr2});
        }
    }

    _delete = (ids) => {
        console.log(JSON.stringify({ids}));
        fetch("http://taskassignment2.ml/Php/product/delete.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ids}),
        })
        let arr3,arr4 =this.state.product
        let arr5 = ids
        arr3 = arr4.filter(ar => !arr5.find(rm => (rm.sku == ar.sku) ))
        this.setState({product: arr3});
        this.setState({checkedIds: []})
    }

    render() {

        const {product}=this.state
        const checkFunction=this._check

        return (
            <div className="homepage">

            <header>
                <h1> Product List </h1>
                <div className="buttons1">

                    <Link to = "/add-product">
                        <button className={"addButton"} >
                            ADD
                        </button>
                    </Link>
                    <button className={"deleteButton"} onClick={()=>this._delete(this.state.checkedIds)}>
                        MASS DELETE
                    </button>

                </div>
            </header>
            <hr />

            {/* Product List Items */}
            <div className="productListItems">

                {product.map(function (i) {
                    return <ProductListItem key={i.sku} product={i} f1={checkFunction}/>;
                })}

            </div>

            <footer />
            <h3> Scandiweb Test assignment </h3>

        </div>
        )
    }
}
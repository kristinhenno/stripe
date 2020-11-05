import React from "react";
import Item from "./Item";
import withContext from "./withContext";

const ProductList = props => {
    const { products } = props.context;
    // console.log(props.context);

    return (<div>
        {products.map((product, index) => (
            <Item
                product={product}
                key={index}
                addItem={props.context.addItem}
                removeItem={props.context.removeItem}
            />
        ))}


    </div>)

}

export default withContext(ProductList);
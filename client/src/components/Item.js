import React from "react";



const Item = props => {
    const { product } = props;

    return (<div>
        <div>{product.name}</div>
        <div>${product.price}</div>
        <div>{product.description}</div>
        <button
            onClick={() =>
                props.addItem({
                    id: product.name,
                    product,
                    quantity: 1
                })
            }
        >
            Add to Cart
              </button>

    </div>)
}

export default Item;
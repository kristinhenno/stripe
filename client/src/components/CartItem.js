import React from "react";
import withContext from "./withContext";

const CartItem = props => {
    const { cartItem, itemKey } = props;
    const { products } = props.context;
    // console.log(cartItem);
    return (
        <div>
            <div>
                {cartItem.product.name}
            </div>
            <div>
                {cartItem.product.price}
            </div>
            <div>
                {cartItem.quantity}
            </div>
            <button
                onClick={() =>
                    props.addItem({
                        id: cartItem.product.name,
                        products,
                        quantity: 1
                    })
                }
            >
                add
              </button>
            <button
                onClick={() =>
                    props.removeItem({
                        id: cartItem.product.name,
                        products,
                        quantity: 1
                    })
                }
            >
                delete
              </button>
        </div >
    );
};

export default withContext(CartItem);
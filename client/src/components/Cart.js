import React from "react";
import withContext from "./withContext";
import CartItem from "./CartItem";

const Cart = props => {
    const { cart } = props.context;
    const itemKeys = Object.keys(cart);

    console.log(itemKeys);
    // console.log(cart["Adidas Polo"]);
    return (<div>
        {itemKeys.map((key, index) => (

            <div key={index}>
                <CartItem
                    itemKey={key}
                    cartItem={cart[key.toString()]}
                    addItem={props.context.addItem}
                    removeItem={props.context.removeItem}
                />
            </div>
        ))

        }
        <button onClick={() => props.context.toCheckout()} role="link">
            Checkout
    </button>
    </div>)
}

export default withContext(Cart);
import React from 'react';
import './App.css';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from "@stripe/react-stripe-js";
import Success from './components/Success';
import Cart from './components/Cart';
import ProductList from './components/ProductList';
import StripeContext from "./components/Context";
import axios from "axios";
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  HashRouter
} from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import Tab from '@material-ui/core/Tab';


const stripePromise = loadStripe('pk_test_9cWSl1Mlu5mEFLGQajwgixZx00gIx5qQeQ');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      products: []
    };
    // this.routerRef = React.createRef();

  }

  addItem = item => {
    let cart = this.state.cart;
    console.log(cart);
    if (cart[item.id]) {
      cart[item.id].quantity += item.quantity;
    } else {
      cart[item.id] = item;
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    this.setState({ cart: cart });
  };

  removeItem = item => {
    let cart = this.state.cart;
    if (cart[item.id]) {
      cart[item.id].quantity -= item.quantity;
      if (cart[item.id].quantity === 0) {
        delete cart[item.id]
      }
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    this.setState({ cart: cart });
  }

  toCheckout = async (event) => {
    let cart = this.state.cart;
    const itemKeys = Object.keys(this.state.cart || {});
    let checkoutArray = [];

    var i;
    for (i = 0; i < itemKeys.length; i++) {

      console.log(cart[itemKeys[i]].product.name)
      let price = cart[itemKeys[i]].product.price * 100;

      console.log(price);
      checkoutArray.push({



        price_data: {
          currency: 'usd',
          product_data: {
            name: cart[itemKeys[i]].product.name,
          },
          unit_amount: price,
        },
        quantity: cart[itemKeys[i]].quantity,
      })

      console.log(checkoutArray)
    }
    // Get Stripe.js instance
    const stripe = await stripePromise;

    // Call your backend to create the Checkout Session
    const response = await fetch('/create-checkout-session', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        data: {
          payment_method_types: ['card'],
          line_items: checkoutArray,
          mode: 'payment',
          allow_promotion_codes: true,
        }
      })



    });

    console.log(response);

    const session = await response.json();

    console.log(session);

    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });


    if (result.error) {
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
    }

  }

  async componentDidMount() {
    let cart = localStorage.getItem("cart");
    const products = await axios.get('/products');
    cart = cart ? JSON.parse(cart) : {};
    this.setState({
      products: products.data,
      cart: cart
    });
  }

  render() {
    console.log(this.state.cart)
    return (
      <StripeContext.Provider
        value={{
          ...this.state,
          removeItem: this.removeItem,
          addItem: this.addItem,
          toCheckout: this.toCheckout
        }}
      >
        <HashRouter  >

          <Paper >
            <Tab label="Products" to='/' component={Link} />
            <Tab label="Cart" to='/cart' component={Link} />
          </Paper>


          <div>

            <Switch>
              <Route
                exact
                path='/'
                component={ProductList}
              />
            </Switch>
            <Switch>
              <Route
                exact
                path='/success'
                component={Success}
              />
            </Switch>
            <Switch>
              <Route
                exact
                path='/cart'
                component={Cart} />
            </Switch>

          </div>
        </HashRouter>
      </StripeContext.Provider>

    );
  }
}
export default App;

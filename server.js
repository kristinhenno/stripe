const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");




app.use(express.urlencoded({ limit: '80mb' }));
app.use(express.json({ limit: '80mb' }));
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// See your keys here: https://dashboard.stripe.com/account/apikeys
const stripe = require('stripe')('sk_test_51GTYX0Fvb9mko8HKzjScEsvacQuDA3Y9WgbNf3KUD9mD6ECOnnTkczbDYoRReNfa9tY6cwBKBLqjRvnbnJqQ6Q9r00xgwG9Qcw');

app.post('/create-checkout-session', async (req, res) => {
  console.log(req.headers.cookie);
  const data = req.body.data;
  const session = await stripe.checkout.sessions.create({
    // metadata: {
    //   "irclickid": req.cookies['irclickid'],
    //   "browser_ip": req.ip,
    //   "user_agent": req.headers['user-agent'],
    // },
    metadata: {
      "irclickid": req.headers.cookie['irclickid'],
      "browser_ip": req.ip,
      "user_agent": req.headers['user-agent'],
    },
    payment_method_types: data.payment_method_types,
    line_items: data.line_items,
    mode: data.mode,
    allow_promotion_codes: true,
    success_url: 'http://kristin-staging.herokuapp.com/#/success',
    cancel_url: 'http://stripe-kristinhenno.herokuapp.com',
  });

  res.json({ id: session.id });
});

const root = require('path').join(__dirname, '/client', 'build');
app.use(express.static(root));


//   const calculateOrderAmount = items => {
//       var subtotal = 0;
//       for (i =0; i < items.length; i++){

// subtotal= subtotal + (items[i].price * items[i].quantity)
//       }
//     // const subTotal = items.price * items.quantity;
//     // Replace this constant with a calculation of the order's amount
//     // Calculate the order total on the server to prevent
//     // people from directly manipulating the amount on the client
//     return subtotal * 100;
//   };

// app.post("/create-payment-intent", async (req, res) => {
//   const { items } = req.body;
//   console.log(items);

//   // Create a PaymentIntent with the order amount and currency
//   const paymentIntent = await stripe.paymentIntents.create({
//     amount: calculateOrderAmount(items),
//     currency: "usd"
//   });
//   res.send({
//     clientSecret: paymentIntent.client_secret
//   });
// });



const productsRouter = require("./products.js");
app.use("/products", productsRouter);

// Start the API server
app.listen(PORT, function () {
  console.log(
    `🌎  ==> API Server now listening on PORT ${PORT}!`
  );

});

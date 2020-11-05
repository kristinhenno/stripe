import React from "react";
import withContext from "./withContext";
import CartItem from "./CartItem";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {
    BrowserRouter,
    Switch,
    Route,
    Link
} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    cartBox: {
        marginTop: '10%',
        marginLeft: '15%',
    },
    backToShop: {
        margin: 'auto',
        textAlign: 'center',
    },

    empty: {
        margin: '5%',
    }

}));

const Cart = props => {
    const classes = useStyles();
    const { cart } = props.context;
    const itemKeys = Object.keys(cart);

    console.log(itemKeys);
    // console.log(cart["Adidas Polo"]);
    return (
        <div>
            {itemKeys.length > 0 ? <div>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
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
                    </Grid>
                    <Grid className={classes.cartBox}>

                        <Button variant="contained" color="primary" onClick={() => props.context.toCheckout()} role="link">
                            Proceed to Checkout
    </Button>
                    </Grid>
                </Grid>
            </div> : <div className={classes.backToShop}>
                    <Typography className={classes.empty} variant="h5" >Cart is Empty!</Typography>
                    <Button variant="contained" color="primary" to='/' component={Link} role="link">
                        Back to Shop
    </Button>

                </div>}
        </div>
    )
}

export default withContext(Cart);
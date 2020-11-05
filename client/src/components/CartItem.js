import React from "react";
import withContext from "./withContext";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        maxWidth: '100%',
        margin: '2%',
    },
    image: {
        width: 128,
        height: 128,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },

    qt: {
        width: '10%',
    },
    item: {
        display: 'flex',
    }


}));


const CartItem = props => {
    const { cartItem, itemKey } = props;
    const { products } = props.context;
    const classes = useStyles();
    // console.log(cartItem);
    return (
        <div>

            <Paper className={classes.paper}>
                <Grid container spacing={2}>
                    <Grid item>
                        <ButtonBase className={classes.image}>
                            <img className={classes.img} alt="complex" src={cartItem.product.src} />
                        </ButtonBase>
                    </Grid>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography gutterBottom variant="subtitle1">
                                    {cartItem.product.name}
                                </Typography>
                                <Typography className={classes.item} variant="body2" gutterBottom>
                                    <p className={classes.qt}> ${cartItem.product.price}</p>
                                    <Button onClick={() =>
                                        props.addItem({
                                            id: cartItem.product.name,
                                            products,
                                            quantity: 1
                                        })}>
                                        <ExpandLessIcon />
                                    </Button>
                                </Typography>
                                <Typography className={classes.item} variant="body2" color="textSecondary">
                                    <p className={classes.qt}>   x{cartItem.quantity}  </p>
                                    <Button
                                        onClick={() =>
                                            props.removeItem({
                                                id: cartItem.product.name,
                                                products,
                                                quantity: 1
                                            })
                                        }
                                    >
                                        <ExpandMoreIcon />
                                    </Button>

                                </Typography>
                            </Grid>
                        </Grid>

                    </Grid>
                </Grid>
            </Paper>
        </div >
    );
};

export default withContext(CartItem);
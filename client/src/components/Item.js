import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        margin: '20px',
        width: '250px',
    },

    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    img: {
        margin: 'auto',
        display: 'block',
        width: '90%',
        maxHeight: '80%',
        // maxHeight: '100%',
    },

});

const Item = props => {
    const { product } = props;

    const classes = useStyles();

    return (<div>

        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {product.name}
                </Typography>
                <Typography variant="h5" component="h2">
                    ${product.price}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    <img className={classes.img} alt="complex" src={product.src} />
                </Typography>
            </CardContent>
            <CardActions>
                <Button variant="contained" color="primary" onClick={() =>
                    props.addItem({
                        id: product.name,
                        product,
                        quantity: 1
                    })
                } size="small">Add to Cart</Button>
            </CardActions>
        </Card>


        {/* <div>{product.name}</div>
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
              </button> */}

    </div>
    )
}

export default Item;
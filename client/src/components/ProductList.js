import React from "react";
import Item from "./Item";
import withContext from "./withContext";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    box: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',

    }

});

const ProductList = props => {
    const { products } = props.context;

    const classes = useStyles();
    // console.log(props.context);

    return (<div className={classes.box}>
        {products.map((product, index) => (
            <Item
                product={product}
                key={index}
                addItem={props.context.addItem} />
        ))}


    </div>)

}

export default withContext(ProductList);
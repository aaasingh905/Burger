import React from 'react';
import classes from './Order.css';
//import Burger from '../Burger/Burger'

const order = ( props ) => {
    const ingredients = [];
    for ( let ingredientName in props.ingredients ) {
        ingredients.push(
            {
                name: ingredientName,
                amount: props.ingredients[ingredientName]
            }
        );
    }
    const userdetail = [];
    for ( let userdetails in props.userDetails ) {
        userdetail.push(
            {
                name: userdetails,
                amount: props.userDetails[userdetails]
            }
        );
    }

    const userOrderDetails = userdetail.map(details => {
        
        return <div 
            style={{      
                textTransform: 'capitalize',          
                display: 'inline-block',
                margin: '0 18px'
               }}
            key={details.name}><br /><strong>     {details.name}</strong><span style={{textTransform: 'lowercase'}}>:</span> {details.amount}<br /></div>;
               
      });

    const ingredientOutput = ingredients.map(ig => {
        if(ig.amount!==0){
        return <span 
            style={{                
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px'
               }}
            key={ig.name}>{ig.name} <span style={{textTransform: 'lowercase'}}>x</span> {ig.amount}</span>;
        }
       else {
           return null;
       } 
    });
    return (
        <div className={classes.Order}>
            <div>
            <p><strong>Ingredients :   </strong> {ingredientOutput}</p>
            <p><strong>Contact Details :   </strong> <br />{userOrderDetails}</p>
            <p><strong>Price :   </strong>Re {Number.parseFloat( props.price ).toFixed( 2 )}</p>
            </div>
            <div>
           {/*  <Burger ingredients={props.ingredients} /> */}
            </div>
            <div className={classes.buttondiv}>
            <button className={classes.button} onClick={props.clicked}>X</button>
            </div>
        </div>
    );
};

export default order;
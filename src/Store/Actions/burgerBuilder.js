import * as actionTypes from './actionsTypes';
import axios from '../../axios-orders';
//import buildControls from '../../components/Burger/BuildControls/BuildControls';





export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    };
};

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    };
};

export const setIngredients = (ingredients) => {
    return {

        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients,
        building: false
        
    }
}
export const setError = () => {
    return {

        type: actionTypes.ERROR_SET,
                
    }
}

export const initIngredients = () => {
    return dispatch =>{  
        axios.get( 'https://burger-builder-2bd7e.firebaseio.com/ingredients.json' )
       .then( response => {
             dispatch( setIngredients(response.data) );
         } )
         .catch( error => {
            dispatch( setError() );
         } );

    }
}
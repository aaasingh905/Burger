import * as actionTypes from '../Actions/actionsTypes';

const initialState = {
    ingredients: null,
    totalPrice: 90,
    error: false,
    building: false
};

const INGREDIENT_PRICES = {
    salad: 15,
    cheese: 20,
    meat: 25,
    bacon: 30
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
                building:true
            };
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            };
            case actionTypes.SET_INGREDIENTS:
                return {
                    ...state,
                    ingredients: action.ingredients,
                    error: false,
                    totalPrice: 90
                 } ;  
            case actionTypes.ERROR_SET:
                return {
                    ...state,
                    error: true
                 } ;        
        default:
            return state;
    }
};

export default reducer;
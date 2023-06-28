import { ProductType } from './ProductContext'


type InitialStateType = {
    cartItems: ProductType[];
}

/*-------We can write ActionTypes this way-------*/
// export type ActionTypes = 
//     | { type: 'ADD_TO_CART', payload: ProductType } 
//     | { type: 'REMOVE_FROM_CART' | 'INCREASE_ITEM' | 'DECREASE_ITEM', payload: number }



/*-------Or we can write ActionTypes this way either-------*/
export type ActionTypes = 
    | { type: 'ADD_TO_CART', payload: ProductType }
    | { type: 'REMOVE_FROM_CART', payload: number }
    | { type: 'INCREASE_ITEM', payload: number }
    | { type: 'DECREASE_ITEM', payload: number }

    

const reducer = (state:InitialStateType , action: ActionTypes) => {
    switch(action.type) {
        case "ADD_TO_CART":
            return {
                cartItems: [...state.cartItems, action.payload]
            }

        case 'REMOVE_FROM_CART':
            let filteredItem_removed = state.cartItems.filter(item => item.id !== action.payload)
            return {
                cartItems: filteredItem_removed
            }

        case 'INCREASE_ITEM':
            let filteredItem_increased = state.cartItems.map(item => item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item)
            return {
                cartItems: filteredItem_increased
            }

        case 'DECREASE_ITEM': 
            const filteredItem_decreased = state.cartItems.map(item => item.id === action.payload ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : item.quantity } : item)
            return {
                cartItems: filteredItem_decreased
            }

        default:
            return state
    }
}

export default reducer
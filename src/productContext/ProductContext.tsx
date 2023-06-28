import { createContext, useContext, useReducer, useState } from 'react'
import reducer, { ActionTypes } from './reducer';
import { items } from '../data'


export interface ProductType {
    id: number;
    title: string;
    description: string;
    image: string;
    price: number;
    quantity: number;
    category: string;
}


interface ContextType {
    data: ProductType[],
    cartItems: ProductType[];
    dispatch: React.Dispatch<ActionTypes>;
    cartOpened: boolean;
    setCartOpened: React.Dispatch<React.SetStateAction<boolean>>;
    filterByCategory: (category: string) => void;
    sort: (text: string) => void;
    sorted: string;
    menuOpened: boolean;
    setMenuOpened: React.Dispatch<React.SetStateAction<boolean>>;
}




/*-------Initial-State-------*/
const initialState = {
  cartItems: []
}


/*-------Product-Context-------*/
const ProductContext = createContext<ContextType>({} as ContextType)

/*-------Use-Product-Context-------*/
export const useProductContext = () => useContext(ProductContext)



/*-------Product-Context-Provider-------*/
const ProductContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const [cartOpened, setCartOpened] = useState<boolean>(false)
    const [menuOpened, setMenuOpened] = useState<boolean>(false)
    const [data, setData] = useState<ProductType[]>(items)
    const { cartItems } = state
    const [sorted, setSorted] = useState<string>('')


    /*-----Filter-By-Category-Function-----*/
    const filterByCategory = (category: string): void => {
        if (category === 'all') {
            setData(items)
        } else {
            const filteredItems = items.filter(item => item.category === category)
            setData(filteredItems)
        }
    }

    /*-----Sort-Function------*/
    const sort = (sortText: string) => {
        if (sortText === 'low_price') {
            setSorted('low_price')
        } else if (sortText === 'high_price') {
            setSorted('high_price')
        } else {
            setSorted('a-z')
        }
    }


    /*-----Context-Values-----*/
    const value = { 
        data, 
        cartItems, 
        dispatch, 
        cartOpened, 
        setCartOpened, 
        filterByCategory, 
        sort, 
        sorted, 
        menuOpened, 
        setMenuOpened 
    }

    return (
        <ProductContext.Provider value={value}>
            { children }
        </ProductContext.Provider>
    )
}

export default ProductContextProvider
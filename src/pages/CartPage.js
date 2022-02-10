import Layout from "../Layout/Layout";
import { useCart, useCartActions } from "../Providers/CartProvider";
import './cartPage.css';


const CartPage = () => {
    const {cart} = useCart();
    const dispatch = useCartActions();
    
    if(!cart.length) 
        return (
            <Layout>
                <main className="container">
                    <h2>cart is empty ....</h2>
                </main>
            </Layout>
        ); 
    const incHanler = (cartItem) => {
        dispatch({type:"ADD_TO_CART", payload: cartItem})
    }
    const decHanler = (cartItem) => {
        dispatch({type:"REMOVE_PRODUCT", payload: cartItem})
    }
    return (  
        <Layout>
            <main className="container">
                <section className="cartCenter">
                    <section className="cartItemList">
                        {cart.map((item) => (
                            <div className="cartItem" key={item.id}>
                                <div className="itemImg">
                                    <img src={item.image} alt={item.name}/>
                                </div>
                                <div>{item.name}</div>
                                <div>{item.price * item.quantity}</div>
                                <div>
                                    <button onClick={() => decHanler(item)}>remove</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => incHanler(item)}>add</button>
                                </div>
                            </div>
                        ))}
                    </section>
                    <section className="cartSummary">cart summary</section>
                </section>
            </main>
        </Layout>
    );
}
 
export default CartPage;
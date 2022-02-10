import Layout from "../Layout/Layout";
import { useCart, useCartActions } from "../Providers/CartProvider";
import './cartPage.css';


const CartPage = () => {
    const {cart, total} = useCart();
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
                                <div>{item.offPrice * item.quantity}</div>
                                <div>
                                    <button onClick={() => decHanler(item)}>remove</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => incHanler(item)}>add</button>
                                </div>
                            </div>
                        ))}
                    </section>
                    <CartSummary cart={cart} total={total}/>
                </section>
            </main>
        </Layout>
    );
}
const CartSummary = ({cart,total}) => {
    const originalTotalPrice = cart.length ? cart.reduce((acc,curr) => acc + curr.quantity * curr.price, 0) : 0;
    return(
        <section className="cartSummary">
            <h2 style={{ marginBottom: "30px" }}>cart summary</h2>
            <div className="summaryItem">
                <p>original total price</p>
                <p> {originalTotalPrice} $ </p>
            </div>
            <div className="summaryItem">
                <p>cart discount</p>
                <p>{originalTotalPrice - total} $</p>
            </div>
            <hr />
            <div className="summaryItem">
                <p>net price</p>
                <p>{total} $</p>
            </div>
        </section>
    ) 
}
 
export default CartPage;
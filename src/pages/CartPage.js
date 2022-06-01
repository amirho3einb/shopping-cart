import { Link } from "react-router-dom";
import Layout from "../Layout/Layout";
import { useCart, useCartActions } from "../Providers/CartProvider";
import "./cartPage.css";

const CartPage = () => {
  const { cart, total } = useCart();
  const dispatch = useCartActions();

  if (!cart.length)
    return (
      <Layout>
        <main className="container">
          <h2>سبد خرید شما خالی میباشد.</h2>
        </main>
      </Layout>
    );
  const incHanler = (cartItem) => {
    dispatch({ type: "ADD_TO_CART", payload: cartItem });
  };
  const decHanler = (cartItem) => {
    dispatch({ type: "REMOVE_PRODUCT", payload: cartItem });
  };
  return (
    <Layout>
      <main className="container">
        <section className="cartCenter">
          <section className="cartItemList">
            {cart.map((item) => (
              <div className="cartItem" key={item._id}>
                <div className="itemImg">
                  <img src={item.image} alt={item.name} />
                </div>
                <div>{item.name}</div>
                <div>{item.offPrice * item.quantity}</div>
                <div className="btnGroup">
                  <button onClick={() => decHanler(item)}>-</button>
                  <button>{item.quantity}</button>
                  <button onClick={() => incHanler(item)}>+</button>
                </div>
              </div>
            ))}
          </section>
          <CartSummary cart={cart} total={total} />
        </section>
      </main>
    </Layout>
  );
};
const CartSummary = ({ cart, total }) => {
  const originalTotalPrice = cart.length
    ? cart.reduce((acc, curr) => acc + curr.quantity * curr.price, 0)
    : 0;
  return (
    <section className="cartSummary">
      <h2 style={{ marginBottom: "30px" }}>جزئیات پرداخت</h2>
      <div className="summaryItem">
        <p>جمع مبلغ کل</p>
        <p> {originalTotalPrice} تومان </p>
      </div>
      <div className="summaryItem">
        <p>جمع تخفیف</p>
        <p>{originalTotalPrice - total} تومان</p>
      </div>
      <hr />
      <div className="summaryItem netPrice">
        <p>مبلغ پرداختی</p>
        <p>{total} تومان</p>
      </div>
      <Link to="/signup?redirect=checkout">
        <button
          className="btn primary"
          style={{ marginTop: "20px", width: "100%" }}
        >
          پرداخت مبلغ
        </button>
      </Link>
    </section>
  );
};

export default CartPage;

import Layout from "../Layout/Layout";
import { useCart, useCartActions } from "../Providers/CartProvider";
import { checkInCart } from "../utils/checkInCart";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { getAllProducts } from "../services/getProducts";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const { cart } = useCart();
  const dispatch = useCartActions();
  const addProductHandler = (product) => {
    toast.success(`${product.name} added to cart`);
    dispatch({
      type: "ADD_TO_CART",
      payload: product,
    });
  };

  useEffect(()=>{
    const getProducts = async () => {
        try {
            const { data } = await getAllProducts();
            setProducts(data);
        } catch (error) {
            console.log(error);
        }
    }
    getProducts();
},[]);
  return (
    <Layout>
      <main className="container">
        <section className="productList">
          {products.map((product) => (
            <section className="product" key={product._id}>
              <div className="productImage">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="productDesc">
                <p>{product.name}</p>
                <p>$ {product.price}</p>
                <button
                  onClick={() => addProductHandler(product)}
                  className="btn primary"
                >
                  {checkInCart(cart, product) ? "in cart" : "Add to cart"}
                </button>
              </div>
            </section>
          ))}
        </section>
      </main>
    </Layout>
  );
};

export default HomePage;

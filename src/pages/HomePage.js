import Layout from "../Layout/Layout";
import * as data from "../data"
import { useCartActions } from "../Providers/CartProvider";
const HomePage = () => {
    const dispatch = useCartActions();
    const addProductHandler = (product) => {
        //console.log(product);
        dispatch({
            type: 'ADD_TO_CART',
            payload: product,
        });
    }
    return (  
        <Layout>
            <main className="container">
                <section className="productList">
                    {data.products.map((product) => (
                        <section className="product" key={product.id}>
                            <div className="productImage">
                                <img src={product.image} alt={product.name} />
                            </div>
                            <div className="productDesc">
                                <p>{product.name}</p>
                                <p>$ {product.price}</p>
                                <button onClick={() => addProductHandler(product)} className="btn primary">Add to cart</button>
                            </div>
                            
                        </section>
                    ))}
                </section>
            </main>
        </Layout>
    );
}
 
export default HomePage;
import Layout from "../Layout/Layout";
import { useCart, useCartActions } from "../Providers/CartProvider";
import { checkInCart } from "../utils/checkInCart";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { getAllProducts } from "../services/getProducts";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
 


  useEffect(() => {
    const getProducts = async () => {
      try {
        const { data } = await getAllProducts();
        setProducts(data);
        setAllProducts(data);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, []);

  const searchHandler = (e) => {
    setSearchTerm(e.target.value);
    const search = e.target.value;
    if (search !== "") {
      const filteredProducts = allProducts.filter((p) => {
        return Object.values(p)
          .join(" ")
          .toLowerCase()
          .includes(search.toLowerCase());
      });
      setProducts(filteredProducts);
    } else {
      setProducts(allProducts);
    }
  };
  const sortHandler = (e) => {
    console.log(e.target.value);
    const value = e.target.value;
    const allTours = [...products];
    if (value === "lowest") {
      const sortedTours = allTours.sort((a, b) => {
        if (a.price > b.price) {
          return 1;
        }
        if (a.price < b.price) {
          return -1;
        }
        return 0;
      });
      setProducts(sortedTours);
    } else {
      const sortedTours = allTours.sort((a, b) => {
        if (a.price < b.price) {
          return 1;
        }
        if (a.price > b.price) {
          return -1;
        }
        return 0;
      });
      setProducts(sortedTours);
    }
  };
  return (
    <Layout>
      <main className="container">
        <section className="searchBar">
          <div>
            <input
              type="text"
              value={searchTerm}
              onChange={searchHandler}
              placeholder="سرچ محصولات"
            />
          </div>
          <div className="sortBar">
            <span>مرتب سازی: </span>
            <select onChange={sortHandler}>
              <option value="lowest">کم به زیاد</option>
              <option value="highest">زیاد به کم</option>
            </select>
          </div>
        </section>
        <section className="productList">
          {products.map((product) => (
            <section className="product" key={product._id}>
              <div className="productImage">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="productDesc">
                <p>{product.name}</p>
                <p>{product.price} هزار تومان </p>
                {/* <button
                  onClick={() => addProductHandler(product)}
                  className="btn primary"
                >
                  {checkInCart(cart, product) ? "in cart" : "Add to cart"}
                </button> */}
                <Link to={`/product/${product._id}`}>مشاهده و سفارش</Link>
              </div>
            </section>
          ))}
        </section>
      </main>
    </Layout>
  );
};

export default HomePage;

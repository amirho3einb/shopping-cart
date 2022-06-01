import { useCart, useCartActions } from "../Providers/CartProvider";
import { checkInCart } from "../utils/checkInCart";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSingleProduct } from "../services/getProduct";
import Layout from "../Layout/Layout";
import styles from "./singleProductPage.module.css";

const SingleProductPage = () => {
  const { cart } = useCart();
  const dispatch = useCartActions();

  const [product, setProduct] = useState(null);

  let { id } = useParams();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const { data } = await getSingleProduct(id);
        setProduct(data);
      } catch (error) {
        console.log(error);
      }
    };
    getProduct();
  }, []);

  const addProductHandler = (product) => {
    toast.success(` به سبد خرید شما اضافه شد ${product.name} `);
    dispatch({
      type: "ADD_TO_CART",
      payload: product,
    });
  };
  return (
    <Layout>
      {product ? (
        <div className="container">
          <section className={styles.productDetail}>
            <div className={styles.image}>
              <img src={product.image} />
            </div>
            <div className={styles.detail}>
              <div>
                <h1 className={styles.title}>{product.name}</h1>
                <div>
                  <h3>ویژگی‌های کالا</h3>
                  <ul className={styles.specialList}>
                    {product.description.map((item) => (
                      <li key={item._id}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className={styles.listIcon}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>{" "}
                        {item.support}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className={styles.purchase}>
                <div className={styles.items}>
                  <div>
                    <span>فروشنده:</span>
                    <span>بالاگر شاپ</span>
                  </div>
                  <div>
                    <span>گارانتی:</span>
                    <span>18 ماه زرین خدمت</span>
                  </div>
                  <div>
                    <span>ارسال توسط:</span>
                    <span>انبار تهران</span>
                  </div>
                </div>
                <div>
                  <div className={styles.price}>
                    <span
                      className={product.offPrice > 0 ? styles.hasDicount : ""}
                    >
                      <span>{product.price}</span>
                      <span>تومان</span>
                    </span>
                    {product.offPrice > 0 ? (
                      <span>
                        <span>{product.offPrice}</span>
                        <span>تومان</span>
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                  <button
                    onClick={() => addProductHandler(product)}
                    className={styles.addToCartBtn}
                  >
                    {checkInCart(cart, product)
                      ? "انتخاب شده در سبد خرید"
                      : "اضافه به سبد خرید"}
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      ) : (
        <div>در حال بارگزاری</div>
      )}
    </Layout>
  );
};

export default SingleProductPage;

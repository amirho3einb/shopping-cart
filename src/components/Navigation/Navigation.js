import { NavLink } from "react-router-dom";
import { useAuth } from "../../Providers/AuthProvider";
import { useCart } from "../../Providers/CartProvider";
import "./Navigation.css";

const Navigation = () => {
  const { cart } = useCart();
  const userData = useAuth();
  return (
    <header className="mainNavigation">
      <nav>
        <div className="navLogo">
          <NavLink to="/" activeClassName="activeLink" exact>
            بالاگر شاپ
          </NavLink>
        </div>
        <ul>
          <li>
            <NavLink to="/cart" activeClassName="activeLink">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="cartIcon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <span>{cart.length}</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={userData ? "/profile" : "/login"}
              activeClassName="activeLink"
            >
              {userData ? <>{userData.name}</> : <>ورود / ثبت نام</>}
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;

import {NavLink} from 'react-router-dom';
import { useCart } from '../../Providers/CartProvider';
import "./Navigation.css";

const Navigation = () => {
    const {cart} = useCart();
    return (  
        <header className='mainNavigation'>
            <nav>
                <div>Shopping</div>
                <ul>
                    <li>
                        <NavLink to="/" activeClassName="activeLink" exact>home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/cart" activeClassName="activeLink">cart
                        <span>{cart.length}</span>
                        </NavLink>
                    </li>
                </ul>
                
            </nav>
        </header>
    );
}
 
export default Navigation;
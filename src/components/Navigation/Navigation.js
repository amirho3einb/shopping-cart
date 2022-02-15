import {NavLink} from 'react-router-dom';
import { useCart } from '../../Providers/CartProvider';
import "./Navigation.css";

const Navigation = () => {
    const {cart} = useCart();
    return (  
        <header className='mainNavigation'>
            <nav>
                <div><NavLink to="/" activeClassName="activeLink" exact>Shopping</NavLink></div>
                <ul>
                    <li>
                        <NavLink to="/cart" activeClassName="activeLink">cart
                            <span>{cart.length}</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/signup" activeClassName="activeLink">login / signup</NavLink>
                    </li>
                </ul>
                
            </nav>
        </header>
    );
}
 
export default Navigation;
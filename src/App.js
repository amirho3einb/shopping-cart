import './App.css';
import HomePage from './pages/HomePage';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import CartPage from './pages/CartPage';
import CartProvider from './Providers/CartProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CheckOutPage from './pages/CheckOutPage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import AuthProvider from './Providers/AuthProvider';
import UserProfile from './pages/UserProfile';


function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <ToastContainer />
          <Switch>
            <Route path="/profile" component={UserProfile} />
            <Route path="/cart" component={CartPage} />
            <Route path="/checkout" component={CheckOutPage} />
            <Route path="/signup" component={SignUpPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/" component={HomePage} />
          </Switch>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;

import { Link } from "react-router-dom";
import { useAuth } from "../Providers/AuthProvider";
import "./userProfile.css";
const UserProfile = () => {
  const userData = useAuth();
  return (
    <div className="container userDataContainer">
      <div className="userDataRow">
        <div>Name:</div>
        <div>{userData.name}</div>
      </div>
      <div className="userDataRow">
        <div>Email:</div>
        <div>{userData.email}</div>
      </div>
      <div>
        <Link to="/">back to home</Link>
      </div>
    </div>
  );
};

export default UserProfile;

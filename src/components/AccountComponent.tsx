import {useContext} from 'react'
import { AuthContext } from '../AuthContext';
import { BrowserRouter as Router, Route, Link, useNavigate, useParams, RouteProps, useLocation} from "react-router-dom";


const AccountComponent = () => {
    const user = useContext(AuthContext);
    const navigate = useNavigate();
    const params = useParams<any>();
    const loc = useLocation();

    console.log(user)


    return (
        <>
        
            <div style={{width: "400px", height:200, fontSize: 15, display: 'inline-block'}}>
                {user?.email}
                <p>
                    <i>Account created at: </i> {user?.metadata.lastSignInTime}
                </p>
                <p>
                    <i>Last logged in: </i> {user?.metadata.lastSignInTime}
                </p>
            </div>    
       


        </>
    )
}

export default AccountComponent;
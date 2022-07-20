import React from "react";
import { Route, RouteProps, Navigate, useLocation } from "react-router-dom";
import Product from "../../pages/Products/Product";

interface IPrivateRouteProps extends RouteProps {
    isLoggedIn: boolean;
}

function PrivateRoute({ isLoggedIn, children, ...rest }: IPrivateRouteProps) {
    return (
        <Route path="/product"
            element={<RequireAuth />}>
                <Product></Product>
        </Route>
    );
}

const RequireAuth: React.FC = () => {
    let auth = 'test';
    let location = useLocation();

    if (auth) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        return <Navigate to="/login" state={{ from: location }} />;
    }
    return (
        <div>daf</div>
    )
}

export default PrivateRoute;
import React from 'react';
import {Route, Routes} from "react-router-dom";
import {useKeycloak} from "@react-keycloak/web";
import {privateRoutes, publicRoutes} from "./routes";

const AppRouter = () => {
    const {keycloak} = useKeycloak();

    return (
        ! !keycloak.authenticated
            ?
            <Routes>
                {
                    privateRoutes.map((route, index) =>
                        <Route key={index} exact={route.exact}
                               path={route.path}
                               element={route.component}/>
                    )
                }
            </Routes>
            :
            <Routes>
                {
                    publicRoutes.map((route, index) =>
                        <Route key={index} exact={route.exact}
                               path={route.path}
                               element={route.component}/>
                    )
                }
            </Routes>
    );
};

export default AppRouter;
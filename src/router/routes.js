import Home from "../pages/Home/Home";
import SecuredPage from "../pages/SecuredPage/SecuredPage";
import Registration from "../pages/Registration/Registration";
import Root from "../pages/Root/Root";

export const privateRoutes = [
    {path: '/', component: <Root/>, exact: true },
    {path: '/home', component: <Home/>, exact: true},
    {path: '/protected', component: <SecuredPage/>, exact: true}
]

export const publicRoutes = [
    // {path: '/protected', component: <SecuredPage/>, exact: true},
    {path: '/reg', component: <Registration/>, exact: true}
]
import React, {useEffect, useState} from 'react';
import './SecuredPage.css'
import {instance} from "../../helpers/API";
import { useKeycloak } from "@react-keycloak/web";

const SecuredPage = () => {
    const [users, setUsers] = useState([])
    const [str, setStr] = useState("")


    // const { keycloak } = useKeycloak();

    // const [bol, setBol] = useState(keycloak.authenticated)


    // // Если не авторизован — показываем "Загрузка..." (Keycloak сам редиректит на логин)
    // if (!keycloak.authenticated) {
    //     return keycloak.login();
    //
    // }


    const getProtected = async () => {
        try {
            const response = await instance.get("/protected")
            console.log( )
            setStr(response.data)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getProtected();
    }, []);

    return (
        <div className="protected-page">
            <h1>{str} + dcscs</h1>
            <div className="protected-page" key="1">
                <div>{str}</div>
            </div>
        </div>
    );
};

export default SecuredPage;
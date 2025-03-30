import React, {useState} from 'react';
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import './Registration.css'
import {instance} from "../../helpers/API";

const Registration = () => {
    const [successReg,setSuccessReg] = useState(false);
    const reg = async (body) => {
        try {
            const response = await instance.post("user-service/user/register", body)
            console.log(response)
            if (response.status === 201)
                setSuccessReg(true)
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <div className="reg-page">
            {
                successReg
                    ? <h2 className="success-registration">Success Registration!</h2>
                    : <RegisterForm onSubmit={reg}/>
            }

        </div>
    );
};

export default Registration;
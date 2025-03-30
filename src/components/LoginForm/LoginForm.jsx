import React, {useState} from 'react';
import './LoginForm.css'
import Button from "../../ui/Button/Button";
import Input from "../../ui/Input/Input";

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className="login-container">
            <form className="login-form">
                <span className="login-form-title">Sign in to your account</span>
                <Input id="login-email" label="Email" type="email"
                       value={email}
                       onChange={(e)=>setEmail(e.target.value)}/>
                <Input id="login-password" label="Password" type="password"
                       value={password}
                       onChange={(e)=>setPassword(e.target.value)}/>
                <Button>Sign in</Button>
            </form>
        </div>
    );
};

export default LoginForm;
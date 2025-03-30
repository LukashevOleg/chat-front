import React, {useState} from 'react';
import Input from "../../ui/Input/Input";
import Button from "../../ui/Button/Button";
import './RegisterForm.css'

const RegisterForm = ({onSubmit}) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const clickHandle = (e) => {
        e.preventDefault();
        onSubmit({
            firstName,
            lastName,
            birthdate,
            email,
            password
        });
    }

    return (
        <div className="register-container">
            <form className="register-form">
                <span className="register-form-title">Register</span>
                <Input id="register-first-name" label="First name" type="text"
                value={firstName}
                       onChange={(e) => setFirstName(e.target.value)}
                />
                <Input id="register-last-name" label="Last name" type="text"
                       value={lastName}
                       onChange={(e) => setLastName(e.target.value)}/>
                <Input id="register-birthdate" label="Birthdate" type="date"
                       value={birthdate}
                       onChange={(e) =>setBirthdate(e.target.value)}/>
                <Input id="register-email" label="Email" type="email"
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}/>
                <Input id="register-password" label="Password" type="password"
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}/>
                <Input id="register-confirm-password" label="Confirm password" type="password"
                       value={confirmPassword}
                       onChange={(e) => setConfirmPassword(e.target.value)}/>
                <Button onClick={clickHandle}>Register</Button>
            </form>
        </div>
    );
};

export default RegisterForm;
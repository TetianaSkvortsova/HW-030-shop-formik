import React from 'react';
import './AuthForm.css';
import {useFormik} from "formik";
import {Link, useNavigate} from "react-router";

function AuthForm() {

    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: (values,{ setSubmitting, setFieldError }) => {
            const STORAGE_KEY = 'registeredUsers';
            const existingUsersString = localStorage.getItem(STORAGE_KEY);
            const registeredUsers = existingUsersString
                ? JSON.parse(existingUsersString)
                : [];

            setSubmitting(false);
            if (registeredUsers.length === 0) {
                setFieldError('email', 'No accounts registered. Please sign up first.');
                return;
            }

            const currentUser = registeredUsers.find(
                user => user.email === values.email && user.password === values.password
            );

            if(currentUser) {
                localStorage.setItem('isAuthenticated', 'true');
                localStorage.setItem('currentUser', JSON.stringify({ id: currentUser.id, email: currentUser.email, firstName: `${currentUser.firstName}`}));
                navigate('/');
            } else {
                setFieldError('email', 'Invalid email or password.');
                setFieldError('password', 'Invalid email or password.');
            }
        }
    })

    return (
        <div className="auth-from-container">
            <nav>
                <Link to="/reg">Реєстрація</Link>
            </nav>
            <h1>Вхід</h1>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    {formik.errors.email && <p className="error">{formik.errors.email}</p>}
                    <input
                        type="text"
                        name="email"
                        value={formik.values.email}
                        placeholder="Email"
                        onChange={formik.handleChange}
                    />
                    {formik.errors.password && <p className="error">{formik.errors.password}</p>}
                    <input
                        type="password"
                        name="password"
                        value={formik.values.password}
                        placeholder="Пароль"
                        onChange={formik.handleChange}
                    />
                    <button disabled={!(formik.isValid && formik.dirty) || formik.isSubmitting}>Вхід</button>
                </div>
            </form>
        </div>
    );
}

export default AuthForm;
import React from 'react';
import './RegistrationForm.css';
import {useFormik} from "formik";
import * as Yup from 'yup';
import {useNavigate} from "react-router";

const STRICT_EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}:"<>?~`])\S{6,}$/;

const validationSchema = Yup.object({
    firstName: Yup.string().required('First name is required')
        .min(2, 'Should be at least 2 characters')
        .max(15, 'Should be less than 15 characters'),
    lastName: Yup.string().required('Last name is required')
        .min(2, 'Should be at least 2 characters')
        .max(15, 'Should be less than 15 characters'),
    email: Yup.string().required('Email is required')
        .matches(STRICT_EMAIL_REGEX, 'Email is not valid'),
    password: Yup.string().required('Password is required')
        .min(6, 'Should be at least 6 characters')
        .matches(PASSWORD_REGEX, 'Password must contain: 1 Uppercase, 1 Number, and 1 Symbol.'),
    confirmPassword: Yup.string().required('Confirm password is required')
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
})

function RegistrationForm() {

    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema,
        onSubmit: (values, {setSubmitting, setFieldError, resetForm}) => {
            const STORAGE_KEY = 'registeredUsers';
            const existingUsersString = localStorage.getItem(STORAGE_KEY);
            let existingUsers = existingUsersString ? JSON.parse(existingUsersString) : [];
            const userExists = existingUsers.find(user => user.email === values.email);

            if (userExists) {
                setFieldError('email', 'This email address is already registered.');
                setSubmitting(false);
            } else {
                const newUser = {
                    id: Date.now(),
                    email: values.email,
                    password: values.password,
                    firstName: values.firstName,
                    lastName: values.lastName,
                };

                existingUsers.push(newUser);
                localStorage.setItem(STORAGE_KEY, JSON.stringify(existingUsers));
                navigate('/auth');
                resetForm();
            }
        }
    })

    return (
        <div className="reg-form-container">
            <h1>Registration</h1>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    {formik.errors.firstName && <p className="error">{formik.errors.firstName}</p>}
                    <input
                        type="text"
                        name="firstName"
                        value={formik.values.firstName}
                        placeholder="Enter firstName"
                        onChange={formik.handleChange}
                    />
                    {formik.errors.lastName && <p className="error">{formik.errors.lastName}</p>}
                    <input
                        type="text"
                        name="lastName"
                        value={formik.values.lastName}
                        placeholder="Enter lastName"
                        onChange={formik.handleChange}
                    />
                    {formik.errors.email && <p className="error">{formik.errors.email}</p>}
                    <input
                        type="text"
                        name="email"
                        value={formik.values.email}
                        placeholder="Enter email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.errors.password && <p className="error">{formik.errors.password}</p>}
                    <input
                        type="password"
                        name="password"
                        value={formik.values.password}
                        placeholder="Enter password"
                        onChange={formik.handleChange}
                    />
                    {formik.errors.confirmPassword && <p className="error">{formik.errors.confirmPassword}</p>}
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formik.values.confirmPassword}
                        placeholder="Confirm Password"
                        onChange={formik.handleChange}
                    />
                    <button disabled={!(formik.isValid && formik.dirty) || formik.isSubmitting}>Sign up</button>
                </div>
            </form>
        </div>
    );
}

export default RegistrationForm;
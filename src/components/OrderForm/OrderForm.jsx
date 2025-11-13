import React, {useContext} from 'react';
import {useFormik} from "formik";
import './OrderForm.css';
import {DataContext} from "../../contexts/contexts.js";
import * as Yup from "yup";
import {useNavigate} from "react-router";

function OrderForm({productName}) {
    const {cities} = useContext(DataContext);
    const STRICT_EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const navigate = useNavigate();

    const validationSchema = Yup.object({
        firstName: Yup.string().required('Обов`язкове поле')
            .min(2, 'Мінімум 2 символи')
            .max(15, 'Максимум 15 символів'),
        lastName: Yup.string().required('Обов`язкове поле')
            .min(2, 'Мінімум 2 символи')
            .max(15, 'Максимум 15 символів'),
        email: Yup.string().required('Обов`язкове поле')
            .matches(STRICT_EMAIL_REGEX, 'Некоректний Email'),
        city: Yup.string().required('Обов`язкове поле'),
        storage: Yup.string().required('Обов`язкове поле'),
        paymentMethod: Yup.string().required('Обов`язкове поле'),
        amount: Yup.number()
            .required('Введіть кількість')
    })

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            city: '',
            storage: '',
            paymentMethod: '',
            amount: '',
            comment: ''
        },
        validationSchema,
        onSubmit: (values, {setSubmitting, resetForm}) => {
            const STORAGE_KEY = 'userOrders';
            const CURRENT_USER = 'currentUser';
            const existingOrdersString = localStorage.getItem(STORAGE_KEY);
            const currentUserString = localStorage.getItem(CURRENT_USER);
            let existingOrders = existingOrdersString ? JSON.parse(existingOrdersString) : [];
            let currentUser = currentUserString ? JSON.parse(currentUserString) : {};
            const storageCity = cities.find(city => city.value === values.city);
            const currentStorage = storageCity?.storages.find(curStorage => curStorage.id.toString() === values.storage);
            const newOrder = {
                id: Date.now(),
                productName,
                currentUser: currentUser.id,
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                city: storageCity.city,
                storage: currentStorage.address,
                paymentMethod: values.paymentMethod,
                amount: values.amount,
                comment: values.comment,
            };
            existingOrders.push(newOrder);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(existingOrders));
            navigate('/');
            resetForm();
            setSubmitting(false);
        }
    })

    const cityValue = formik.values.city;
    const selectedCity = cities.find(city => city.value === cityValue);
    const storagesToRender = selectedCity ? selectedCity.storages : [];

    const handleNumberChange = (event) => {
        const { name, value } = event.target;
        const numericValue = value.replace(/[^0-9.]/g, '');
        formik.setFieldValue(name, numericValue);
    };

    const handleCancel = () => {
        navigate('/');
    }

    return (
        <div className="order-form-container">
            <h1>Заповніть форму</h1>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    {formik.errors.firstName && <p className="error">{formik.errors.firstName}</p>}
                    <input
                        type="text"
                        name="firstName"
                        value={formik.values.firstName}
                        placeholder="Ім`я"
                        onChange={formik.handleChange}
                    />
                    {formik.errors.lastName && <p className="error">{formik.errors.lastName}</p>}
                    <input
                        type="text"
                        name="lastName"
                        value={formik.values.lastName}
                        placeholder="Прізвище"
                        onChange={formik.handleChange}
                    />
                    {formik.errors.email && <p className="error">{formik.errors.email}</p>}
                    <input
                        type="text"
                        name="email"
                        value={formik.values.email}
                        placeholder="Email"
                        onChange={formik.handleChange}
                    />
                    {formik.errors.city && <p className="error">{formik.errors.city}</p>}
                    <select
                        name="city"
                        id="city"
                        value={formik.values.city}
                        className="city"
                        onChange={formik.handleChange}>

                        <option value="">Оберіть місто</option>
                        {
                            cities.map((city, index) => <option key={index} value={city.value}>{city.city}</option>)
                        }
                    </select>
                    {formik.errors.city && <p className="error">{formik.errors.city}</p>}
                    <select
                        name="storage"
                        id="storage"
                        value={formik.values.storage}
                        onChange={formik.handleChange}
                        disabled={!selectedCity}>
                        <option value="">Оберіть склад</option>
                        {
                            storagesToRender.map((storage) => <option key={storage.id} value={storage.id}>{storage.address}</option>)
                        }
                    </select>
                    <div className="payment-method-group">
                        <p>Оберіть метод оплати:</p>
                        <div className="radio-option">
                            <input
                                type="radio"
                                id="overlay"
                                name="paymentMethod"
                                value="overlay"
                                checked={formik.values.paymentMethod === 'overlay'}
                                onChange={formik.handleChange}
                            />
                            <label htmlFor="overlay">Накладений платіж</label>
                        </div>
                        <div className="radio-option">
                            <input
                                type="radio"
                                id="account"
                                name="paymentMethod"
                                value="account"
                                checked={formik.values.paymentMethod === 'account'}
                                onChange={formik.handleChange}
                            />
                            <label htmlFor="account">Оплата на рахунок</label>
                        </div>
                    </div>
                    {formik.errors.amount && <p className="error">{formik.errors.amount}</p>}
                    <input
                        type="text"
                        name="amount"
                        value={formik.values.amount}
                        placeholder="Кількість"
                        onChange={handleNumberChange}
                    />
                    <textarea
                        id="comment"
                        name="comment"
                        value={formik.values.comment}
                        onChange={formik.handleChange}
                        rows="2"
                        cols="22">
                    </textarea>
                    <button disabled={!(formik.isValid && formik.dirty) || formik.isSubmitting}>Замовити</button>
                    <button onClick={handleCancel}>Скасувати</button>
                </div>
            </form>
        </div>
    );
}

export default OrderForm;
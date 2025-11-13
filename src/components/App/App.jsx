import './App.css'
import {BrowserRouter, Route, Routes} from "react-router";
import MainPage from "../../pages/MainPage.jsx";
import RegistrationForm from "../RegistrationForm/RegistrationForm.jsx";
import './App.css'
import {useContext, useEffect, useState} from "react";
import {DataContext} from "../../contexts/contexts.js";
import SingInPage from "../../pages/SingInPage.jsx";
import OrderFormPage from "../../pages/OrderFormPage.jsx";
import UserOrdersPage from "../../pages/UserOrdersPage.jsx";

function App() {

    const productsContext = useContext(DataContext);

    const [content, setContent] = useState(productsContext);
    const [cities, setCities] = useState(productsContext);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const contextValue = {
        content,
        cities,
        isLoading,
        error,
    };

    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await fetch('data.json');

                if (!response.ok) {
                    throw new Error(`HTTP Error: ${response.status}`);
                }

                const {content, cities} = await response.json();
                setContent(content);
                setCities(cities);

            } catch (err) {
                console.error("Error loading data:", err);
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };
        loadData();
    }, []);

    const [categoryId, setCategoryId] = useState(null);
    const [productId, setProductId] = useState(null);
    const [productName, setProductName] = useState('');

    return (
        <div className="app-container">
            <BrowserRouter basename={import.meta.env.BASE_URL}>
                <DataContext.Provider value={contextValue}>
                        <main>
                            <Routes>
                                <Route path="/" element={
                                    <MainPage
                                        setCategoryId={setCategoryId}
                                        categoryId={categoryId}
                                        setProductId={setProductId}
                                        productId={productId}
                                        setProductName={setProductName}
                                    />
                                }/>
                                <Route path="/auth" element={
                                    <SingInPage />
                                }/>
                                <Route path="/reg" element={
                                    <RegistrationForm />
                                }/>
                                <Route path="/order" element={
                                    <OrderFormPage productName={productName} />
                                }/>
                                <Route path="/user-orders" element={
                                    <UserOrdersPage />
                                }/>
                            </Routes>
                        </main>
                </DataContext.Provider>
            </BrowserRouter>
        </div>
    )
}

export default App

import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from "../pages/HomePage/Home";
import LoginPage from "../pages/LoginPage/LoginPage"; // Importa o LoginPage

const Router = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<LoginPage />} /> {/* Adiciona aqui! */}
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default Router;

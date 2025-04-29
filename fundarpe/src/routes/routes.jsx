import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from "../pages/HomePage/Home";
import LoginPage from "../pages/LoginPage/LoginPage"; // Importa o LoginPage
import PFFormsPage from "../pages/PFFormsPage/PFFormsPage"
import PJFormsPage from "../pages/PJFormsPage/PJFormsPage"

const Router = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<LoginPage />} /> {/* Adiciona aqui! */}
                    <Route path="/" element={<Home/>}/>
                    <Route path="/formsPessoaFisica" element={<PFFormsPage/>}/>
                    <Route path="/formsPessoaJuridica" element={<PJFormsPage/>}/>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default Router;

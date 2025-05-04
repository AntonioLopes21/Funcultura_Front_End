import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from "../pages/HomePage/Home";
import PFFormsPage from "../pages/PFFormsPage/PFFormsPage";
import PJFormsPage from "../pages/PJFormsPage/PJFormsPage";
import LoginPage from "../pages/LoginPage/LoginPage"; // Nova importação da branch "melhoria-de-aparencia"
import LoginPage from "../pages/LoginPage/LoginPage"; // Importa o LoginPage
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Home from "../pages/HomePage/Home"


const Router = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/formsPessoaFisica" element={<PFFormsPage />} />
                    <Route path="/formsPessoaJuridica" element={<PJFormsPage />} />
                    <Route path="/login" element={<LoginPage />} /> {/* Nova rota adicionada */}
                   
                </Routes>
            </BrowserRouter>
        </>
    );
}


export default Router;

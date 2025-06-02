import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from "../pages/HomePage/Home";
import PFFormsPage from "../pages/PFFormsPage/PFFormsPage";
import PJFormsPage from "../pages/PJFormsPage/PJFormsPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import EsqueciSenhaPage from '../pages/LoginPage/EsqueciSenhaPage';
import SucessoCadastroPage from '../pages/LoginPage/SucessoCadastroPage';

const Router = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/formsPessoaFisica" element={<PFFormsPage />} />
                    <Route path="/formsPessoaJuridica" element={<PJFormsPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/esqueci-senha" element={<EsqueciSenhaPage />} />
                    <Route path="/cadastro-sucesso" element={<SucessoCadastroPage />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default Router;

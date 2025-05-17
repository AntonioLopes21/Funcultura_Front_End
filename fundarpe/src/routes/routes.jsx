import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from "../pages/HomePage/Home";
import PFFormsPage from "../pages/PFFormsPage/PFFormsPage";
import PJFormsPage from "../pages/PJFormsPage/PJFormsPage";
import LoginPage from "../pages/LoginPage/LoginPage"; 
import EsqueciSenhaPage from '../pages/LoginPage/EsqueciSenhaPage';
import SucessoCadastroPage from '../pages/LoginPage/SucessoCadastroPage';
import AcompanhamentoPage from '../pages/AcompanhamentoPage/AcompanhamentoPage';
import UpdateDocumentsPage from '../pages/UpdateDocumentsPage/UpdateDocumentsPage';
import AdminApprovalPage from '../pages/AdminApprovalPage/AdminApprovalPage'; // Nova página

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
                    <Route path="/acompanhamento" element={<AcompanhamentoPage />} />
                    <Route path="/atualizar-documentos/:userType" element={<UpdateDocumentsPage />} />
                    {/* Nova rota para admin */}
                    <Route path="/admin/aprovacao-cadastros" element={<AdminApprovalPage />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default Router;
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import "../PFFormsPage/PFFormsPage.css"
import "../../components/MainContent/MainContent.css"

function PFFormsPage() {
    return (
        <>
            <div className="menu_principal">
                <Header />
                <div className="main_content">
                    <h1 className="main_content_title">Formulário de Cadastro de Produtor Cultural</h1>
                    <h3 className="main_content_subtitle">Informações cadastrais</h3>
                </div>
                <div className="formulario">

                    <form>
                        <div className="form_primeira_coluna">
                            <div className="form_primeira_coluna_nome_info">
                                <h5>Nome completo</h5>
                                <input type="text" placeholder="Nome completo" className="form_primeira_coluna_input_nome" />
                            </div>
                            <div className="form_primeira_coluna_data_info">
                                <h5>Data de nascimento</h5>
                                <input type="date" className="form_primeira_coluna_input_data" />
                            </div>
                        </div>

                        <div className="form_segunda_coluna">
                            <div className="form_segunda_coluna_cpf_info">
                                <h5>CPF</h5>
                                <input type="text" placeholder="CPF" className="form_segunda_coluna_input_cpf" />
                            </div>
                            <div className="form_segunda_coluna_email_info">
                                <h5>Email</h5>
                                <input type="email" placeholder="E-mail" className="form_segunda_coluna_input_email" />
                            </div>
                        </div>

                        <div className="btn_cadastro_div">
                            <button type="submit" className="btn_cadastro">Finalizar Cadastro</button>
                        </div>
                    </form>
                </div>
                <Footer />
            </div>
        </>
    )
}

export default PFFormsPage
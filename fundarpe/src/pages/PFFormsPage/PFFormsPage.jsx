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
                        <input type="text" placeholder="Nome completo" />
                        <input type="text" placeholder="CPF" />
                        <input type="email" placeholder="E-mail" />
                        <button type="submit">Enviar</button>
                    </form>
                </div>
                <Footer />
            </div>
        </>
    )
}

export default PFFormsPage
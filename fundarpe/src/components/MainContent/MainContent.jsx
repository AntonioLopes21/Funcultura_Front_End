import React from "react";
import { ImagesProject } from "../../assets/Images";
import "./MainContent.css";
import Footer from "../Footer/Footer";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import necessário para navegar
import "./MainContent.css"

function MainContent() {

    const handleNavigateToLogin = () => {
            navigate("/login"); // Rota para onde o botão vai levar
        };

    const navigate = useNavigate(); // Hook para navegação

    const [mostrarOpcoes, setMostrarOpcoes] = useState(false);

    const handleClickCadastrar = () => {
        setMostrarOpcoes(true);
    };

    const handleClick = () => {
        navigate('/formsPessoaFisica');

    }

    const handleClickPJ = () => {
        navigate('/formsPessoaJuridica')
    }


    return (
        <div className="general_content">
            <div className="main_content_section">
                <img src={ImagesProject.LogoCPC} alt="logo cpc" className="logo_cpc" />

                <div className="main_content_section_content">
                    <h1 className="main_content_section_title">CADASTRO DE PRODUTORES CULTURAIS</h1>
                    <p className="main_content_section_paragraph">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin lacus augue,
                        interdum in ornare a, laoreet quis tortor. Nulla at sodales tortor.
                        Fusce vel pellentesque odio. Nullam nec interdum metus. Nam sollicitudin,
                        sapien at cursus molestie, nibh turpis mollis risus, nec finibus sapien
                        odio in nibh. Suspendisse ultricies dui in ante aliquet, ac rhoncus lectus porta.
                        Fusce congue justo nisi, rutrum luctus sapien tincidunt ut.
                        Aliquam erat volutpat. Morbi pellentesque egestas arcu,
                        sit amet tincidunt sem elementum a.
                    </p>
                </div>

                <div className="main_content_section_content_btn">
                
                    <div className="btn_cadastros">
                        {!mostrarOpcoes ? (
                            <button
                                className="main_content_section_btn_cadastrar"
                                onClick={handleClickCadastrar}
                            >
                                Cadastrar
                            </button>
                        ) : (
                            <>
                                <button
                                    className="main_content_section_btn_pessoa_fisica"
                                    onClick={handleClick}
                                >
                                    Pessoa Física
                                </button>
                                <button
                                    className="main_content_section_btn_pessoa_juridica"
                                    onClick={handleClickPJ}
                                >
                                    Pessoa Jurídica
                                </button>
                            </>
                        )}
                    </div>


                    <button className="main_content_section_btn_acompanhar" onClick={handleNavigateToLogin}>Acompanhar/Atualizar cadastro</button>
                </div>

            </div>

            <div className="footer">
                <Footer />
            </div>
        </div>
    );
}

export default MainContent;

import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { ImagesProject } from "../../assets/Images";
import { Link } from "react-router-dom";
import "../PFFormsPage/PFFormsPage.css";

function SucessoCadastroPage() {
    return (
        <div className="menu_principal">
            <Header />
            
            <div className="main_content" style={{ textAlign: "center", padding: "2rem" }}>
                <img 
                    src={ImagesProject.LogoCPC} 
                    alt="logo cpc" 
                    style={{ height: "150px", marginBottom: "2rem" }} 
                />
                
                <h1 className="main_content_title">Cadastro Realizado com Sucesso!</h1>
                
                <div style={{ margin: "2rem 0", fontSize: "1.2rem" }}>
                    <p>Seu cadastro foi recebido e está em processamento.</p>
                    <p>Você receberá atualizações por e-mail.</p>
                </div>
                
                <div style={{ marginTop: "3rem" }}>
                    <Link 
                        to="/login" 
                        className="btn_cadastro"
                        style={{
                            display: "inline-block",
                            padding: "0.75rem 2rem",
                            backgroundColor: "#28324E",
                            color: "#f5f5f5",
                            textDecoration: "none",
                            borderRadius: "0.3rem",
                            fontSize: "1.1rem",
                            fontWeight: "500"
                        }}
                    >
                        Acompanhar Meu Cadastro
                    </Link>
                </div>
                
                <p style={{ marginTop: "1.5rem", color: "#666" }}>
                    Ou <Link to="/" style={{ color: "#28324E", textDecoration: "underline" }}>voltar para a página inicial</Link>
                </p>
            </div>
            
            <Footer />
        </div>
    );
}

export default SucessoCadastroPage;
import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { ImagesProject } from "../../assets/Images";
import { useNavigate } from "react-router-dom";

function AcompanhamentoPage() {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Simulação de dados do usuário (substitua pela chamada real à API)
    useEffect(() => {
        const fetchUserData = () => {
            setLoading(true);
            setTimeout(() => {
                setUserData({
                    nome: "Fulano de Tal",
                    tipo: "Pessoa física", // Corrigi para "tipo" (minúsculo)
                    inscricao: "CPC - Edital 01",
                    email: "fulano@email.com",
                    status: "Em análise"
                });
                setLoading(false);
            }, 1000);
        };

        fetchUserData();
    }, []);

    const handleUpdateDocuments = () => {
        // Determina o tipo de usuário baseado nos dados
        const userType = userData?.tipo?.toLowerCase().includes("física") ? "pf" : "pj";
        navigate(`/atualizar-documentos/${userType}`);
    };

    return (
        <>
            <div className="menu_principal">
                <Header />

                <div style={{ width: "100%", marginTop: "2rem", textAlign: "center" }}>
                    <img 
                        src={ImagesProject.LogoCPC} 
                        alt="logo cpc" 
                        style={{ 
                            height: "150px", 
                            marginBottom: "1rem" 
                        }} 
                    />

                    <h1 style={{ 
                        fontSize: "2rem", 
                        color: "#28324E", 
                        textDecoration: "underline", 
                        textUnderlineOffset: "1rem",
                        marginBottom: "2rem"
                    }}>
                        Olá, {userData?.nome || "Usuário"}!
                    </h1>
                </div>

                {/* Box com informações do cadastro */}
                <div style={{ 
                    width: "100%", 
                    maxWidth: "600px", 
                    margin: "0 auto", 
                    padding: "2rem",
                    backgroundColor: "#f5f5f5",
                    borderRadius: "8px",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                }}>
                    {loading ? (
                        <div style={{ textAlign: "center" }}>
                            <p>Carregando dados...</p>
                        </div>
                    ) : (
                        <>
                            <div style={{ marginBottom: "1.5rem" }}>
                                <h3 style={{ 
                                    color: "#28324E", 
                                    marginBottom: "0.5rem",
                                    fontSize: "1.2rem"
                                }}>
                                    Inscrição: <span style={{ fontWeight: "normal" }}>{userData.inscricao}</span>
                                </h3>
                            </div>
                            
                            <div style={{ marginBottom: "1.5rem" }}>
                                <h3 style={{ 
                                    color: "#28324E", 
                                    marginBottom: "0.5rem",
                                    fontSize: "1.2rem"
                                }}>
                                    Tipo de inscrição: <span style={{ fontWeight: "normal" }}>{userData.tipo}</span>
                                </h3>
                            </div>

                            <div style={{ marginBottom: "1.5rem" }}>
                                <h3 style={{ 
                                    color: "#28324E", 
                                    marginBottom: "0.5rem",
                                    fontSize: "1.2rem"
                                }}>
                                    Nome completo: <span style={{ fontWeight: "normal" }}>{userData.nome}</span>
                                </h3>
                            </div>

                            <div style={{ marginBottom: "1.5rem" }}>
                                <h3 style={{ 
                                    color: "#28324E", 
                                    marginBottom: "0.5rem",
                                    fontSize: "1.2rem"
                                }}>
                                    E-mail: <span style={{ fontWeight: "normal" }}>{userData.email}</span>
                                </h3>
                            </div>

                            <div style={{ marginBottom: "2rem" }}>
                                <h3 style={{ 
                                    color: "#28324E", 
                                    marginBottom: "0.5rem",
                                    fontSize: "1.2rem"
                                }}>
                                    Status: <span style={{ 
                                        fontWeight: "normal",
                                        color: userData.status === "Aprovado" ? "green" :
                                              userData.status === "Reprovado" ? "red" :
                                              "#FFA500" // laranja para "Em análise"
                                    }}>
                                        {userData.status}
                                    </span>
                                </h3>
                            </div>
                        </>
                    )}
                </div>

                {/* Botão de Atualizar Documentos */}
                <div style={{ 
                    display: "flex", 
                    justifyContent: "center", 
                    marginTop: "2rem",
                    marginBottom: "2rem"
                }}>
                    <button
                        onClick={handleUpdateDocuments}
                        disabled={loading}
                        style={{
                            backgroundColor: loading ? "#cccccc" : "#4CAF50",
                            color: "#fff",
                            fontSize: "1.1rem",
                            width: "18rem",
                            height: "2.6875rem",
                            borderRadius: "0.3rem",
                            fontWeight: "500",
                            border: "none",
                            cursor: "pointer",
                            transition: "background-color 0.3s"
                        }}
                    >
                        {loading ? "Carregando..." : "Atualizar Documentos do Cadastro"}
                    </button>
                </div>

                <Footer />
            </div>
        </>
    );
}

export default AcompanhamentoPage;
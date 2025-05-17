import React, { useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { ImagesProject } from "../../assets/Images";
import { Link, useNavigate } from "react-router-dom";

function IdentificacaoPage() {
    const [cpf, setCpf] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Formatação do CPF
    const formatarCPF = (value) => {
        const numeros = value.replace(/\D/g, "");
        let formatado = "";
        if (numeros.length > 0) formatado = numeros.substring(0, 3);
        if (numeros.length > 3) formatado += "." + numeros.substring(3, 6);
        if (numeros.length > 6) formatado += "." + numeros.substring(6, 9);
        if (numeros.length > 9) formatado += "-" + numeros.substring(9, 11);
        return formatado;
    };

    // Autenticação mock
    const mockAutenticacao = (cpf, senha) => {
        const credenciaisValidas = [
            { cpf: "123.456.789-09", senha: "senha123" },
            { cpf: "111.222.333-44", senha: "funcultura" }
        ];
        return credenciaisValidas.some(
            (credencial) => credencial.cpf === cpf && credencial.senha === senha
        );
    };

    const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setErro("");

    setTimeout(() => {
        if (mockAutenticacao(cpf, senha)) {
            localStorage.setItem("usuarioAutenticado", "true");
            navigate("/acompanhamento"); // Alterado de "/dashboard" para "/acompanhamento"
        } else {
            setErro("CPF ou senha incorretos");
        }
        setLoading(false);
    }, 1500);
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
                        textUnderlineOffset: "1rem" 
                    }}>
                        IDENTIFICAÇÃO
                    </h1>
                </div>

                <form 
                    onSubmit={handleSubmit} 
                    style={{ 
                        width: "100%", 
                        maxWidth: "400px", 
                        margin: "2rem auto" 
                    }}
                >
                    <div style={{ 
                        display: "flex", 
                        flexDirection: "column", 
                        gap: "1.5rem" 
                    }}>
                        {/* Campo CPF */}
                        <div>
                            <h5 style={{ 
                                color: "#28324E", 
                                marginBottom: "0.5rem" 
                            }}>
                                CPF
                            </h5>
                            <input
                                type="text"
                                placeholder="Digite seu CPF"
                                value={cpf}
                                onChange={(e) => setCpf(formatarCPF(e.target.value))}
                                maxLength="14"
                                style={{
                                    width: "100%",
                                    height: "2.0625rem",
                                    padding: "0.5rem",
                                    borderRadius: "0.3rem",
                                    border: "1px solid #ccc",
                                    fontSize: "1rem"
                                }}
                            />
                        </div>

                        {/* Campo Senha */}
                        <div>
                            <h5 style={{ 
                                color: "#28324E", 
                                marginBottom: "0.5rem" 
                            }}>
                                Senha
                            </h5>
                            <input
                                type="password"
                                placeholder="Digite sua senha"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                style={{
                                    width: "100%",
                                    height: "2.0625rem",
                                    padding: "0.5rem",
                                    borderRadius: "0.3rem",
                                    border: "1px solid #ccc",
                                    fontSize: "1rem"
                                }}
                            />
                        </div>
                    </div>

                    {/* Mensagem de erro */}
                    {erro && (
                        <p style={{ 
                            color: "red", 
                            textAlign: "center", 
                            marginTop: "1rem",
                            fontSize: "0.9rem"
                        }}>
                            {erro}
                        </p>
                    )}

                    {/* Botão de Confirmar */}
                    <div style={{ 
                        display: "flex", 
                        justifyContent: "center", 
                        marginTop: "2rem" 
                    }}>
                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                backgroundColor: loading ? "#cccccc" : "#4CAF50",
                                color: "#fff",
                                fontSize: "1.1rem",
                                width: "12.9375rem",
                                height: "2.6875rem",
                                borderRadius: "0.3rem",
                                fontWeight: "500",
                                border: "none",
                                cursor: "pointer",
                                transition: "background-color 0.3s"
                            }}
                        >
                            {loading ? "Carregando..." : "Confirmar"}
                        </button>
                    </div>

                    {/* Link "Esqueceu a senha?" */}
                    <div style={{ textAlign: "center", marginTop: "1rem" }}>
                        <Link 
                            to="/esqueci-senha"
                            style={{ 
                                color: "#28324E", 
                                textDecoration: "none",
                                fontSize: "0.9rem",
                                fontStyle: "italic"
                            }}
                        >
                            Esqueceu a senha?
                        </Link>
                    </div>
                </form>

                <Footer />
            </div>
        </>
    );
}

export default IdentificacaoPage;
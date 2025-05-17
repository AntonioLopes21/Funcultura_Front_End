import React, { useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { ImagesProject } from "../../assets/Images";
import { useNavigate } from "react-router-dom";

function EsqueciSenhaPage() {
    const [cpf, setCpf] = useState("");
    const [email, setEmail] = useState("");
    const [erro, setErro] = useState("");
    const [sucesso, setSucesso] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Formatação do CPF (mesma função da página de login)
    const formatarCPF = (value) => {
        const numeros = value.replace(/\D/g, "");
        let formatado = "";
        if (numeros.length > 0) formatado = numeros.substring(0, 3);
        if (numeros.length > 3) formatado += "." + numeros.substring(3, 6);
        if (numeros.length > 6) formatado += "." + numeros.substring(6, 9);
        if (numeros.length > 9) formatado += "-" + numeros.substring(9, 11);
        return formatado;
    };

    // Mock de verificação de usuário
    const mockVerificarUsuario = (cpf, email) => {
        const usuarios = [
            { cpf: "123.456.789-09", email: "usuario1@exemplo.com" },
            { cpf: "111.222.333-44", email: "usuario2@exemplo.com" }
        ];
        return usuarios.some(
            (usuario) => usuario.cpf === cpf && usuario.email === email
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setErro("");
        setSucesso("");

        setTimeout(() => {
            if (mockVerificarUsuario(cpf, email)) {
                setSucesso("Um e-mail com instruções para redefinir sua senha foi enviado.");
            } else {
                setErro("CPF ou e-mail não encontrados. Verifique os dados informados.");
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
                        RECUPERAÇÃO DE SENHA
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

                        {/* Campo E-mail */}
                        <div>
                            <h5 style={{ 
                                color: "#28324E", 
                                marginBottom: "0.5rem" 
                            }}>
                                E-mail Cadastrado
                            </h5>
                            <input
                                type="email"
                                placeholder="Digite seu e-mail"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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

                    {/* Mensagem de sucesso */}
                    {sucesso && (
                        <p style={{ 
                            color: "green", 
                            textAlign: "center", 
                            marginTop: "1rem",
                            fontSize: "0.9rem"
                        }}>
                            {sucesso}
                        </p>
                    )}

                    {/* Botão de Enviar */}
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
                            {loading ? "Carregando..." : "Enviar"}
                        </button>
                    </div>

                    {/* Link para voltar ao login */}
                    <div style={{ 
                        textAlign: "center", 
                        marginTop: "1rem" 
                    }}>
                        <a 
                            href="/login" 
                            style={{ 
                                color: "#28324E", 
                                textDecoration: "none",
                                fontSize: "0.9rem",
                                fontStyle: "italic"
                            }}
                        >
                            Voltar para o login
                        </a>
                    </div>
                </form>

                <Footer />
            </div>
        </>
    );
}

export default EsqueciSenhaPage;
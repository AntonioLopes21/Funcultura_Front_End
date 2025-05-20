import React, { useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { ImagesProject } from "../../assets/Images";
import { useNavigate } from "react-router-dom";
import api, { API_KEY } from "../../services/api";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErro("");
        setLoading(true);

        try {
            const payload = {
                email: email,
                senha: senha,
                key: API_KEY
            };

            console.log("Tentando login com dados do formulário");
            
            const response = await api.post('/login', payload, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log("Resposta:", response.data);

            if (response.data.success) {
                const { token, usuario } = response.data;
                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(usuario));
                navigate("/dashboard");
            }
        } catch (error) {
            console.error("Erro detalhado:", error.response?.data);
            setErro(error.response?.data?.message || error.response?.data?.conteudoJson?.message || "Erro ao fazer login");
        } finally {
            setLoading(false);
        }
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
                        margin: "2rem auto",
                        padding: "0 1rem"
                    }}
                >
                    {/* Campo Email */}
                    <div style={{ marginBottom: "1.5rem" }}>
                        <label 
                            htmlFor="email"
                            style={{ 
                                display: "block", 
                                marginBottom: "0.5rem",
                                color: "#28324E",
                                fontSize: "1.1rem"
                            }}
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Digite seu email"
                            style={{
                                width: "100%",
                                padding: "0.75rem",
                                borderRadius: "0.3rem",
                                border: "1px solid #ccc",
                                fontSize: "1rem"
                            }}
                        />
                    </div>

                    {/* Campo Senha */}
                    <div style={{ marginBottom: "1.5rem" }}>
                        <label 
                            htmlFor="senha"
                            style={{ 
                                display: "block", 
                                marginBottom: "0.5rem",
                                color: "#28324E",
                                fontSize: "1.1rem"
                            }}
                        >
                            Senha
                        </label>
                        <input
                            type="password"
                            id="senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            placeholder="Digite sua senha"
                            style={{
                                width: "100%",
                                padding: "0.75rem",
                                borderRadius: "0.3rem",
                                border: "1px solid #ccc",
                                fontSize: "1rem"
                            }}
                        />
                    </div>

                    {/* Mensagem de Erro */}
                    {erro && (
                        <div style={{
                            color: "#dc3545",
                            marginBottom: "1rem",
                            textAlign: "center",
                            fontSize: "0.9rem"
                        }}>
                            {erro}
                        </div>
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
                    {/* Botão de Login */}
                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: "100%",
                            padding: "0.75rem",
                            backgroundColor: "#4CAF50",
                            color: "white",
                            border: "none",
                            borderRadius: "0.3rem",
                            fontSize: "1.1rem",
                            cursor: loading ? "not-allowed" : "pointer",
                            opacity: loading ? 0.7 : 1
                        }}
                    >
                        {loading ? "Entrando..." : "Entrar"}
                    </button>
                </form>

                <Footer />
            </div>
        </>
    );
}

export default LoginPage;
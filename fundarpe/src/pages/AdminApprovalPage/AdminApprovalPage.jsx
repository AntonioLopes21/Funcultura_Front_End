import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./AdminApprovalPage.css";

function AdminApprovalPage() {
    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("all"); // 'all', 'pf', 'pj'
    const [selectedRegistration, setSelectedRegistration] = useState(null);
    const [rejectionReason, setRejectionReason] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    // Simulação de dados - substitua pela chamada real à API
    useEffect(() => {
        const fetchRegistrations = async () => {
            setLoading(true);
            try {
                // Simulando chamada à API
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                // Dados mockados baseados nas páginas de cadastro
                const mockData = [
                    {
                        id: 1,
                        tipo: "pf",
                        nome: "João da Silva",
                        cpf: "123.456.789-00",
                        email: "joao@email.com",
                        dataCadastro: "2023-05-15",
                        status: "pendente",
                        documentos: {
                            identidade: "RG_Joao.pdf",
                            comprovanteResidencia: "Comprovante_Joao.pdf",
                            curriculoAtuacao: "Curriculo_Joao.pdf"
                        }
                    },
                    {
                        id: 2,
                        tipo: "pj",
                        razaoSocial: "Empresa XYZ Ltda",
                        cnpj: "12.345.678/0001-99",
                        email: "contato@empresa.com",
                        dataCadastro: "2023-05-16",
                        status: "pendente",
                        documentos: {
                            contratoSocial: "Contrato_Empresa.pdf",
                            cartaoCnpj: "CNPJ_Empresa.pdf"
                        }
                    }
                ];
                
                setRegistrations(mockData);
                setLoading(false);
            } catch (error) {
                console.error("Erro ao carregar cadastros:", error);
                setLoading(false);
            }
        };
        
        fetchRegistrations();
    }, []);

    const filteredRegistrations = registrations.filter(reg => {
        // Aplica filtro por tipo
        const typeMatch = filter === "all" || reg.tipo === filter;
        
        // Aplica filtro por busca
        const searchMatch = 
            reg.nome?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            reg.razaoSocial?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            reg.cpf?.includes(searchTerm) ||
            reg.cnpj?.includes(searchTerm);
        
        return typeMatch && searchMatch;
    });

    const handleApprove = async (id) => {
        try {
            // Simulando chamada à API para aprovar
            await new Promise(resolve => setTimeout(resolve, 500));
            
            // Atualiza o status localmente
            setRegistrations(prev => 
                prev.map(reg => 
                    reg.id === id ? { ...reg, status: "aprovado" } : reg
                )
            );
            
            if (selectedRegistration?.id === id) {
                setSelectedRegistration(prev => ({ ...prev, status: "aprovado" }));
            }
            
            alert("Cadastro aprovado com sucesso!");
        } catch (error) {
            console.error("Erro ao aprovar cadastro:", error);
            alert("Erro ao aprovar cadastro. Tente novamente.");
        }
    };

    const handleReject = async (id) => {
        if (!rejectionReason) {
            alert("Por favor, informe o motivo da reprovação");
            return;
        }
        
        try {
            // Simulando chamada à API para reprovar
            await new Promise(resolve => setTimeout(resolve, 500));
            
            // Atualiza o status localmente
            setRegistrations(prev => 
                prev.map(reg => 
                    reg.id === id ? { ...reg, status: "reprovado", motivoReprovacao: rejectionReason } : reg
                )
            );
            
            if (selectedRegistration?.id === id) {
                setSelectedRegistration(prev => ({ 
                    ...prev, 
                    status: "reprovado",
                    motivoReprovacao: rejectionReason 
                }));
            }
            
            alert("Cadastro reprovado com sucesso!");
            setRejectionReason("");
        } catch (error) {
            console.error("Erro ao reprovar cadastro:", error);
            alert("Erro ao reprovar cadastro. Tente novamente.");
        }
    };

    const viewDetails = (registration) => {
        setSelectedRegistration(registration);
    };

    const closeDetails = () => {
        setSelectedRegistration(null);
    };

    const downloadDocument = (docName) => {
        // Simulação de download - substitua pela lógica real
        alert(`Download do documento: ${docName}`);
    };

    return (
        <div className="menu_principal">
            <Header />
            
            <div className="admin-approval-container">
                <h1 className="admin-approval-title">Painel de Aprovação de Cadastros</h1>
                
                <div className="admin-controls">
                    <div className="admin-filters">
                        <label>
                            Filtrar por:
                            <select 
                                value={filter} 
                                onChange={(e) => setFilter(e.target.value)}
                                className="admin-filter-select"
                            >
                                <option value="all">Todos</option>
                                <option value="pf">Pessoa Física</option>
                                <option value="pj">Pessoa Jurídica</option>
                            </select>
                        </label>
                        
                        <input
                            type="text"
                            placeholder="Buscar por nome, CPF ou CNPJ..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="admin-search-input"
                        />
                    </div>
                </div>
                
                {loading ? (
                    <div className="loading-message">Carregando cadastros...</div>
                ) : (
                    <>
                        <div className="registrations-list">
                            <table className="registrations-table">
                                <thead>
                                    <tr>
                                        <th>Tipo</th>
                                        <th>Nome/Razão Social</th>
                                        <th>CPF/CNPJ</th>
                                        <th>Data Cadastro</th>
                                        <th>Status</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredRegistrations.length > 0 ? (
                                        filteredRegistrations.map(reg => (
                                            <tr key={reg.id} className={reg.status}>
                                                <td>{reg.tipo === "pf" ? "Pessoa Física" : "Pessoa Jurídica"}</td>
                                                <td>{reg.nome || reg.razaoSocial}</td>
                                                <td>{reg.cpf || reg.cnpj}</td>
                                                <td>{reg.dataCadastro}</td>
                                                <td>
                                                    <span className={`status-badge ${reg.status}`}>
                                                        {reg.status === "pendente" ? "Pendente" : 
                                                         reg.status === "aprovado" ? "Aprovado" : "Reprovado"}
                                                    </span>
                                                </td>
                                                <td>
                                                    <button 
                                                        onClick={() => viewDetails(reg)}
                                                        className="action-btn view-btn"
                                                    >
                                                        Ver Detalhes
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="no-results">
                                                Nenhum cadastro encontrado
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        
                        {/* Modal de Detalhes */}
                        {selectedRegistration && (
                            <div className="registration-details-modal">
                                <div className="modal-content">
                                    <button 
                                        onClick={closeDetails}
                                        className="close-modal-btn"
                                    >
                                        &times;
                                    </button>
                                    
                                    <h2>Detalhes do Cadastro</h2>
                                    
                                    <div className="registration-details">
                                        <h3>Informações Básicas</h3>
                                        <div className="details-grid">
                                            <div>
                                                <strong>Tipo:</strong> 
                                                {selectedRegistration.tipo === "pf" ? "Pessoa Física" : "Pessoa Jurídica"}
                                            </div>
                                            
                                            {selectedRegistration.tipo === "pf" ? (
                                                <>
                                                    <div>
                                                        <strong>Nome:</strong> {selectedRegistration.nome}
                                                    </div>
                                                    <div>
                                                        <strong>CPF:</strong> {selectedRegistration.cpf}
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <div>
                                                        <strong>Razão Social:</strong> {selectedRegistration.razaoSocial}
                                                    </div>
                                                    <div>
                                                        <strong>CNPJ:</strong> {selectedRegistration.cnpj}
                                                    </div>
                                                </>
                                            )}
                                            
                                            <div>
                                                <strong>E-mail:</strong> {selectedRegistration.email}
                                            </div>
                                            <div>
                                                <strong>Data do Cadastro:</strong> {selectedRegistration.dataCadastro}
                                            </div>
                                            <div>
                                                <strong>Status:</strong> 
                                                <span className={`status-badge ${selectedRegistration.status}`}>
                                                    {selectedRegistration.status === "pendente" ? "Pendente" : 
                                                     selectedRegistration.status === "aprovado" ? "Aprovado" : "Reprovado"}
                                                </span>
                                            </div>
                                            
                                            {selectedRegistration.status === "reprovado" && selectedRegistration.motivoReprovacao && (
                                                <div className="rejection-reason">
                                                    <strong>Motivo da reprovação:</strong> 
                                                    {selectedRegistration.motivoReprovacao}
                                                </div>
                                            )}
                                        </div>
                                        
                                        <h3>Documentos Enviados</h3>
                                        <div className="documents-list">
                                            {Object.entries(selectedRegistration.documentos).map(([docType, docName]) => (
                                                <div key={docType} className="document-item">
                                                    <span className="document-name">
                                                        {getDocumentLabel(docType, selectedRegistration.tipo)}: 
                                                        <strong> {docName}</strong>
                                                    </span>
                                                    <button 
                                                        onClick={() => downloadDocument(docName)}
                                                        className="download-doc-btn"
                                                    >
                                                        Baixar
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    
                                    {selectedRegistration.status === "pendente" && (
                                        <div className="approval-actions">
                                            <div className="rejection-reason-input">
                                                <label>
                                                    Motivo da reprovação (se aplicável):
                                                    <textarea
                                                        value={rejectionReason}
                                                        onChange={(e) => setRejectionReason(e.target.value)}
                                                        placeholder="Informe o motivo da reprovação..."
                                                    />
                                                </label>
                                            </div>
                                            
                                            <div className="action-buttons">
                                                <button
                                                    onClick={() => handleApprove(selectedRegistration.id)}
                                                    className="approve-btn"
                                                >
                                                    Aprovar Cadastro
                                                </button>
                                                <button
                                                    onClick={() => handleReject(selectedRegistration.id)}
                                                    className="reject-btn"
                                                    disabled={!rejectionReason}
                                                >
                                                    Reprovar Cadastro
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
            
            <Footer />
        </div>
    );
}

// Função auxiliar para traduzir tipos de documentos
function getDocumentLabel(docType, userType) {
    const labels = {
        pf: {
            identidade: "Documento de Identidade",
            comprovanteResidencia: "Comprovante de Residência",
            curriculoAtuacao: "Currículo de Atuação Cultural",
            certidaoRegularidade: "Certidão de Regularidade Fiscal",
            certidaoPrestacao: "Certidão de Prestação de Contas"
        },
        pj: {
            contratoSocial: "Contrato Social ou Estatuto",
            comprovanteEndereco: "Comprovante de Endereço",
            curriculoEmpresa: "Currículo da Empresa",
            cartaoCnpj: "Cartão de CNPJ",
            certidaoRegularidade: "Certidão de Regularidade Fiscal",
            certidaoPrestacao: "Certidão de Prestação de Contas"
        }
    };
    
    return labels[userType][docType] || docType;
}

export default AdminApprovalPage;
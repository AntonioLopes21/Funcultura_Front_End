import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./UpdateDocumentsPage.css";
import "../../components/MainContent/MainContent.css";

function UpdateDocumentsPage() {
    const { userType } = useParams(); // 'pf' ou 'pj'
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitStatus, setSubmitStatus] = useState({
        message: '',
        isSuccess: false
    });

    // Estado para os documentos - estrutura diferente para PF e PJ
    const [documents, setDocuments] = useState(
        userType === 'pf' 
            ? {
                identidade: null,
                comprovanteResidencia: null,
                curriculoAtuacao: null,
                certidaoRegularidade: null,
                certidaoPrestacao: null
            }
            : {
                contratoSocial: null,
                comprovanteEndereco: null,
                curriculoEmpresa: null,
                cartaoCnpj: null,
                certidaoRegularidade: null,
                certidaoPrestacao: null
            }
    );

    // Simula carregamento dos dados do usuário
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Simulando chamada à API para obter dados do usuário
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                // Dados mockados baseados no tipo de usuário
                const mockData = userType === 'pf'
                    ? {
                        nomeCompleto: "João da Silva",
                        cpf: "123.456.789-00",
                        documentos: {
                            identidade: { name: "RG.pdf" },
                            comprovanteResidencia: { name: "Comprovante.pdf" },
                            // Outros documentos podem estar null ou ter arquivos
                        }
                    }
                    : {
                        razaoSocial: "Empresa XYZ Ltda",
                        cnpj: "12.345.678/0001-99",
                        documentos: {
                            contratoSocial: { name: "Contrato.pdf" },
                            cartaoCnpj: { name: "CNPJ.pdf" },
                            // Outros documentos podem estar null ou ter arquivos
                        }
                    };
                
                setUserData(mockData);
                
                // Preenche os documentos existentes no estado
                if (mockData.documentos) {
                    setDocuments(prev => ({
                        ...prev,
                        ...mockData.documentos
                    }));
                }
                
                setLoading(false);
            } catch (error) {
                console.error("Erro ao carregar dados do usuário:", error);
                setLoading(false);
            }
        };
        
        fetchUserData();
    }, [userType]);

    // Handler para upload de arquivos
    const handleFileUpload = (e, documentType) => {
        const file = e.target.files[0];
        if (file) {
            if (file.type !== 'application/pdf') {
                alert('Por favor, envie apenas arquivos PDF');
                return;
            }
            if (file.size > 5 * 1024 * 1024) {
                alert('O arquivo deve ter no máximo 5MB');
                return;
            }
            
            setDocuments(prev => ({
                ...prev,
                [documentType]: file
            }));
        }
    };

    // Handler para remover arquivo
    const handleRemoveFile = (documentType) => {
        setDocuments(prev => ({
            ...prev,
            [documentType]: null
        }));
    };

    // Handler para envio do formulário
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            setSubmitStatus({ message: 'Atualizando documentos...', isSuccess: true });
            
            // Simulando chamada à API para atualização
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            setSubmitStatus({ 
                message: 'Documentos atualizados com sucesso!', 
                isSuccess: true 
            });
            
            // Atualiza os dados locais para refletir as mudanças
            setUserData(prev => ({
                ...prev,
                documentos: { ...documents }
            }));
            
        } catch (error) {
            setSubmitStatus({ 
                message: 'Erro ao atualizar documentos. Tente novamente.', 
                isSuccess: false 
            });
            console.error('Erro na atualização:', error);
        }
    };

    if (loading) {
        return (
            <div className="menu_principal">
                <Header />
                <div className="main_content">
                    <h1 className="main_content_title">
                        {userType === 'pf' ? 'Atualizar Documentos - Pessoa Física' : 'Atualizar Documentos - Pessoa Jurídica'}
                    </h1>
                    <hr className="main_content_line" />
                    <p>Carregando dados...</p>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="menu_principal">
            <Header />
            <div className="main_content">
                <h1 className="main_content_title">
                    {userType === 'pf' ? 'Atualizar Documentos - Pessoa Física' : 'Atualizar Documentos - Pessoa Jurídica'}
                </h1>
                <hr className="main_content_line" />
                
                {userData && (
                    <div className="user-info">
                        <h3>
                            {userType === 'pf' 
                                ? `Usuário: ${userData.nomeCompleto} (CPF: ${userData.cpf})`
                                : `Empresa: ${userData.razaoSocial} (CNPJ: ${userData.cnpj})`}
                        </h3>
                    </div>
                )}
            </div>
            
            <div className="formulario">
                <h3 className="main_content_subtitle">Atualização de documentos</h3>

                {submitStatus.message && (
                    <div className={`submit-message ${submitStatus.isSuccess ? 'success' : 'error'}`}>
                        {submitStatus.message}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    {/* Seção de Documentos - muda conforme o tipo de usuário */}
                    <div className="documentos_para_envio">
                        <h3 className="main_content_subtitle">Documentos cadastrados:</h3>
                    </div>

                    <div className="documentos_para_envio_campos">
                        {userType === 'pf' ? (
                            <>
                                {/* Documento de Identidade - PF */}
                                <div className="documentos_para_envio_campos_identidade">
                                    <div className="documentos_para_envio_campos_identidade_esquerda">
                                        <h5>RG, CNH, ou Carteira de Trabalho</h5>
                                        <p>(Somente arquivos em PDF)</p>
                                        {documents.identidade && (
                                            <p className="current-file">Documento atual: {documents.identidade.name}</p>
                                        )}
                                    </div>
                                    <div className="documentos_para_envio_campos_identidade_direita">
                                        <label className="btn_documentos documento_pessoal">
                                            {documents.identidade ? 'Substituir arquivo' : 'Adicionar arquivo'}
                                            <input 
                                                type="file" 
                                                accept=".pdf"
                                                style={{ display: 'none' }}
                                                onChange={(e) => handleFileUpload(e, 'identidade')}
                                            />
                                        </label>
                                        {documents.identidade && (
                                            <button 
                                                type="button" 
                                                className="btn-remove-file"
                                                onClick={() => handleRemoveFile('identidade')}
                                            >
                                                Remover
                                            </button>
                                        )}
                                        <p>(Tamanho máximo: 5MB)</p>
                                    </div>
                                </div>

                                <hr className="documentos_para_envio_line" />

                                {/* Comprovante de Residência - PF */}
                                <div className="documentos_para_envio_campos_identidade">
                                    <div className="documentos_para_envio_campos_identidade_esquerda">
                                        <h5>Comprovante de Residência</h5>
                                        <p>(Somente arquivos em PDF)</p>
                                        {documents.comprovanteResidencia && (
                                            <p className="current-file">Documento atual: {documents.comprovanteResidencia.name}</p>
                                        )}
                                    </div>
                                    <div className="documentos_para_envio_campos_identidade_direita">
                                        <label className="btn_documentos comprovante_residencia">
                                            {documents.comprovanteResidencia ? 'Substituir arquivo' : 'Adicionar arquivo'}
                                            <input 
                                                type="file" 
                                                accept=".pdf"
                                                style={{ display: 'none' }}
                                                onChange={(e) => handleFileUpload(e, 'comprovanteResidencia')}
                                            />
                                        </label>
                                        {documents.comprovanteResidencia && (
                                            <button 
                                                type="button" 
                                                className="btn-remove-file"
                                                onClick={() => handleRemoveFile('comprovanteResidencia')}
                                            >
                                                Remover
                                            </button>
                                        )}
                                        <p>(Tamanho máximo: 5MB)</p>
                                    </div>
                                </div>

                                <hr className="documentos_para_envio_line" />

                                {/* Currículo - PF */}
                                <div className="documentos_para_envio_campos_identidade">
                                    <div className="documentos_para_envio_campos_identidade_esquerda">
                                        <h5>Currículo de atuação cultural</h5>
                                        <p>(Somente arquivos em PDF)</p>
                                        {documents.curriculoAtuacao && (
                                            <p className="current-file">Documento atual: {documents.curriculoAtuacao.name}</p>
                                        )}
                                    </div>
                                    <div className="documentos_para_envio_campos_identidade_direita">
                                        <label className="btn_documentos curriculo_atuacao">
                                            {documents.curriculoAtuacao ? 'Substituir arquivo' : 'Adicionar arquivo'}
                                            <input 
                                                type="file" 
                                                accept=".pdf"
                                                style={{ display: 'none' }}
                                                onChange={(e) => handleFileUpload(e, 'curriculoAtuacao')}
                                            />
                                        </label>
                                        {documents.curriculoAtuacao && (
                                            <button 
                                                type="button" 
                                                className="btn-remove-file"
                                                onClick={() => handleRemoveFile('curriculoAtuacao')}
                                            >
                                                Remover
                                            </button>
                                        )}
                                        <p>(Tamanho máximo: 5MB)</p>
                                    </div>
                                </div>

                                <hr className="documentos_para_envio_line" />

                                {/* Certidão de Regularidade Fiscal - PF */}
                                <div className="documentos_para_envio_campos_identidade">
                                    <div className="documentos_para_envio_campos_identidade_esquerda">
                                        <h5>Certidão de Regularidade Fiscal</h5>
                                        <p>(Somente arquivos em PDF)</p>
                                        {documents.certidaoRegularidade && (
                                            <p className="current-file">Documento atual: {documents.certidaoRegularidade.name}</p>
                                        )}
                                    </div>
                                    <div className="documentos_para_envio_campos_identidade_direita">
                                        <label className="btn_documentos certidao_regularidade">
                                            {documents.certidaoRegularidade ? 'Substituir arquivo' : 'Adicionar arquivo'}
                                            <input 
                                                type="file" 
                                                accept=".pdf"
                                                style={{ display: 'none' }}
                                                onChange={(e) => handleFileUpload(e, 'certidaoRegularidade')}
                                            />
                                        </label>
                                        {documents.certidaoRegularidade && (
                                            <button 
                                                type="button" 
                                                className="btn-remove-file"
                                                onClick={() => handleRemoveFile('certidaoRegularidade')}
                                            >
                                                Remover
                                            </button>
                                        )}
                                        <p>(Tamanho máximo: 5MB)</p>
                                    </div>
                                </div>

                                <hr className="documentos_para_envio_line" />

                                {/* Certidão de Prestação de Contas - PF */}
                                <div className="documentos_para_envio_campos_identidade">
                                    <div className="documentos_para_envio_campos_identidade_esquerda">
                                        <h5>Certidão de Prestação de Contas do Funcultura</h5>
                                        <p>(Somente arquivos em PDF)</p>
                                        {documents.certidaoPrestacao && (
                                            <p className="current-file">Documento atual: {documents.certidaoPrestacao.name}</p>
                                        )}
                                    </div>
                                    <div className="documentos_para_envio_campos_identidade_direita">
                                        <label className="btn_documentos certidao_prestacao">
                                            {documents.certidaoPrestacao ? 'Substituir arquivo' : 'Adicionar arquivo'}
                                            <input 
                                                type="file" 
                                                accept=".pdf"
                                                style={{ display: 'none' }}
                                                onChange={(e) => handleFileUpload(e, 'certidaoPrestacao')}
                                            />
                                        </label>
                                        {documents.certidaoPrestacao && (
                                            <button 
                                                type="button" 
                                                className="btn-remove-file"
                                                onClick={() => handleRemoveFile('certidaoPrestacao')}
                                            >
                                                Remover
                                            </button>
                                        )}
                                        <p>(Tamanho máximo: 5MB)</p>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                {/* Contrato Social - PJ */}
                                <div className="documentos_para_envio_campos_identidade">
                                    <div className="documentos_para_envio_campos_identidade_esquerda">
                                        <h5>Contrato Social ou Estatuto da Empresa</h5>
                                        <p>(Somente arquivos em PDF)</p>
                                        {documents.contratoSocial && (
                                            <p className="current-file">Documento atual: {documents.contratoSocial.name}</p>
                                        )}
                                    </div>
                                    <div className="documentos_para_envio_campos_identidade_direita">
                                        <label className="btn_documentos documento_pessoal">
                                            {documents.contratoSocial ? 'Substituir arquivo' : 'Adicionar arquivo'}
                                            <input 
                                                type="file" 
                                                accept=".pdf"
                                                style={{ display: 'none' }}
                                                onChange={(e) => handleFileUpload(e, 'contratoSocial')}
                                            />
                                        </label>
                                        {documents.contratoSocial && (
                                            <button 
                                                type="button" 
                                                className="btn-remove-file"
                                                onClick={() => handleRemoveFile('contratoSocial')}
                                            >
                                                Remover
                                            </button>
                                        )}
                                        <p>(Tamanho máximo: 5MB)</p>
                                    </div>
                                </div>

                                <hr className="documentos_para_envio_line" />

                                {/* Comprovante de Endereço - PJ */}
                                <div className="documentos_para_envio_campos_identidade">
                                    <div className="documentos_para_envio_campos_identidade_esquerda">
                                        <h5>Comprovantes de endereço da empresa</h5>
                                        <p>(Somente arquivos em PDF)</p>
                                        {documents.comprovanteEndereco && (
                                            <p className="current-file">Documento atual: {documents.comprovanteEndereco.name}</p>
                                        )}
                                    </div>
                                    <div className="documentos_para_envio_campos_identidade_direita">
                                        <label className="btn_documentos comprovante_residencia">
                                            {documents.comprovanteEndereco ? 'Substituir arquivo' : 'Adicionar arquivo'}
                                            <input 
                                                type="file" 
                                                accept=".pdf"
                                                style={{ display: 'none' }}
                                                onChange={(e) => handleFileUpload(e, 'comprovanteEndereco')}
                                            />
                                        </label>
                                        {documents.comprovanteEndereco && (
                                            <button 
                                                type="button" 
                                                className="btn-remove-file"
                                                onClick={() => handleRemoveFile('comprovanteEndereco')}
                                            >
                                                Remover
                                            </button>
                                        )}
                                        <p>(Tamanho máximo: 5MB)</p>
                                    </div>
                                </div>

                                <hr className="documentos_para_envio_line" />

                                {/* Currículo da Empresa - PJ */}
                                <div className="documentos_para_envio_campos_identidade">
                                    <div className="documentos_para_envio_campos_identidade_esquerda">
                                        <h5>Curriculo da empresa destacando atuação cultural</h5>
                                        <p>(Somente arquivos em PDF)</p>
                                        {documents.curriculoEmpresa && (
                                            <p className="current-file">Documento atual: {documents.curriculoEmpresa.name}</p>
                                        )}
                                    </div>
                                    <div className="documentos_para_envio_campos_identidade_direita">
                                        <label className="btn_documentos curriculo_atuacao">
                                            {documents.curriculoEmpresa ? 'Substituir arquivo' : 'Adicionar arquivo'}
                                            <input 
                                                type="file" 
                                                accept=".pdf"
                                                style={{ display: 'none' }}
                                                onChange={(e) => handleFileUpload(e, 'curriculoEmpresa')}
                                            />
                                        </label>
                                        {documents.curriculoEmpresa && (
                                            <button 
                                                type="button" 
                                                className="btn-remove-file"
                                                onClick={() => handleRemoveFile('curriculoEmpresa')}
                                            >
                                                Remover
                                            </button>
                                        )}
                                        <p>(Tamanho máximo: 5MB)</p>
                                    </div>
                                </div>

                                <hr className="documentos_para_envio_line" />

                                {/* Cartão de CNPJ - PJ */}
                                <div className="documentos_para_envio_campos_identidade">
                                    <div className="documentos_para_envio_campos_identidade_esquerda">
                                        <h5>Cartão de CNPJ atualizado</h5>
                                        <p>(Somente arquivos em PDF)</p>
                                        {documents.cartaoCnpj && (
                                            <p className="current-file">Documento atual: {documents.cartaoCnpj.name}</p>
                                        )}
                                    </div>
                                    <div className="documentos_para_envio_campos_identidade_direita">
                                        <label className="btn_documentos certidao_regularidade">
                                            {documents.cartaoCnpj ? 'Substituir arquivo' : 'Adicionar arquivo'}
                                            <input 
                                                type="file" 
                                                accept=".pdf"
                                                style={{ display: 'none' }}
                                                onChange={(e) => handleFileUpload(e, 'cartaoCnpj')}
                                            />
                                        </label>
                                        {documents.cartaoCnpj && (
                                            <button 
                                                type="button" 
                                                className="btn-remove-file"
                                                onClick={() => handleRemoveFile('cartaoCnpj')}
                                            >
                                                Remover
                                            </button>
                                        )}
                                        <p>(Tamanho máximo: 5MB)</p>
                                    </div>
                                </div>

                                <hr className="documentos_para_envio_line" />

                                {/* Certidão de Regularidade Fiscal - PJ */}
                                <div className="documentos_para_envio_campos_identidade">
                                    <div className="documentos_para_envio_campos_identidade_esquerda">
                                        <h5>Certidão de Regularidade Fiscal</h5>
                                        <p>(Somente arquivos em PDF)</p>
                                        {documents.certidaoRegularidade && (
                                            <p className="current-file">Documento atual: {documents.certidaoRegularidade.name}</p>
                                        )}
                                    </div>
                                    <div className="documentos_para_envio_campos_identidade_direita">
                                        <label className="btn_documentos certidao_regularidade">
                                            {documents.certidaoRegularidade ? 'Substituir arquivo' : 'Adicionar arquivo'}
                                            <input 
                                                type="file" 
                                                accept=".pdf"
                                                style={{ display: 'none' }}
                                                onChange={(e) => handleFileUpload(e, 'certidaoRegularidade')}
                                            />
                                        </label>
                                        {documents.certidaoRegularidade && (
                                            <button 
                                                type="button" 
                                                className="btn-remove-file"
                                                onClick={() => handleRemoveFile('certidaoRegularidade')}
                                            >
                                                Remover
                                            </button>
                                        )}
                                        <p>(Tamanho máximo: 5MB)</p>
                                    </div>
                                </div>

                                <hr className="documentos_para_envio_line" />

                                {/* Certidão de Prestação de Contas - PJ */}
                                <div className="documentos_para_envio_campos_identidade">
                                    <div className="documentos_para_envio_campos_identidade_esquerda">
                                        <h5>Certidão de Prestação de Contas do Funcultura</h5>
                                        <p>(Somente arquivos em PDF)</p>
                                        {documents.certidaoPrestacao && (
                                            <p className="current-file">Documento atual: {documents.certidaoPrestacao.name}</p>
                                        )}
                                    </div>
                                    <div className="documentos_para_envio_campos_identidade_direita">
                                        <label className="btn_documentos certidao_prestacao">
                                            {documents.certidaoPrestacao ? 'Substituir arquivo' : 'Adicionar arquivo'}
                                            <input 
                                                type="file" 
                                                accept=".pdf"
                                                style={{ display: 'none' }}
                                                onChange={(e) => handleFileUpload(e, 'certidaoPrestacao')}
                                            />
                                        </label>
                                        {documents.certidaoPrestacao && (
                                            <button 
                                                type="button" 
                                                className="btn-remove-file"
                                                onClick={() => handleRemoveFile('certidaoPrestacao')}
                                            >
                                                Remover
                                            </button>
                                        )}
                                        <p>(Tamanho máximo: 5MB)</p>
                                    </div>
                                </div>
                            </>
                        )}

                        <hr className="documentos_para_envio_line" />

                        <div className="paragrafo_explicacao">
                            <p className="paragrafo_info">
                                Você pode atualizar seus documentos a qualquer momento. 
                                Certifique-se de que os arquivos estejam legíveis e dentro 
                                das especificações (PDF, máximo 5MB).
                            </p>
                        </div>
                    </div>

                    {/* Botão de Submit */}
                    <div className="btn_cadastro_div">
                        <button type="submit" className="btn_cadastro">Atualizar Documentos</button>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    );
}

export default UpdateDocumentsPage;
import { useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "../PJFormsPage/PJFormsPage.css";
import "../../components/MainContent/MainContent.css";

function PJFormsPage() {
    // Estado unificado como no formulário PF
    const [formData, setFormData] = useState({
        empresa: {
            razaoSocial: '',
            cnpj: '',
            endereco: ''
        },
        dirigentes: [{
            nomeCompleto: '',
            dataNascimento: '',
            cpf: '',
            email: '',
            senha: '',
            confirmarSenha: ''
        }],
        documentos: {
            contratoSocial: null,
            comprovanteEndereco: null,
            curriculoEmpresa: null,
            cartaoCnpj: null,
            certidaoRegularidade: null,
            certidaoPrestacao: null
        }
    });

    // Estado de erros unificado
    const [errors, setErrors] = useState({
        empresa: {
            razaoSocial: '',
            cnpj: '',
            endereco: ''
        },
        dirigentes: [{
            nomeCompleto: '',
            dataNascimento: '',
            cpf: '',
            email: '',
            senha: '',
            confirmarSenha: ''
        }]
    });

    // Estado para mensagem de sucesso/erro no envio
    const [submitStatus, setSubmitStatus] = useState({
        message: '',
        isSuccess: false
    });

    // Funções auxiliares (formatar e validar) - mantidas iguais
    const formatCNPJ = (value) => {
        const cleaned = value.replace(/\D/g, '');
        
        let formatted = cleaned;
        if (cleaned.length > 2) {
            formatted = `${cleaned.slice(0, 2)}.${cleaned.slice(2)}`;
        }
        if (cleaned.length > 5) {
            formatted = `${formatted.slice(0, 6)}.${formatted.slice(6)}`;
        }
        if (cleaned.length > 8) {
            formatted = `${formatted.slice(0, 10)}/${formatted.slice(10)}`;
        }
        if (cleaned.length > 12) {
            formatted = `${formatted.slice(0, 15)}-${formatted.slice(15, 17)}`;
        }
        
        return formatted.slice(0, 18);
    };

    const formatCPF = (value) => {
        const cleaned = value.replace(/\D/g, '');
        
        let formatted = cleaned;
        if (cleaned.length > 3) {
            formatted = `${cleaned.slice(0, 3)}.${cleaned.slice(3)}`;
        }
        if (cleaned.length > 6) {
            formatted = `${formatted.slice(0, 7)}.${formatted.slice(7)}`;
        }
        if (cleaned.length > 9) {
            formatted = `${formatted.slice(0, 11)}-${formatted.slice(11, 13)}`;
        }
        
        return formatted.slice(0, 14);
    };

    const validateCNPJ = (cnpj) => {
        cnpj = cnpj.replace(/[^\d]+/g, '');
        
        if (cnpj.length !== 14 || /^(\d)\1{13}$/.test(cnpj)) return false;
        
        let length = cnpj.length - 2;
        let numbers = cnpj.substring(0, length);
        const digits = cnpj.substring(length);
        let sum = 0;
        let pos = length - 7;
        
        for (let i = length; i >= 1; i--) {
            sum += numbers.charAt(length - i) * pos--;
            if (pos < 2) pos = 9;
        }
        
        let result = sum % 11 < 2 ? 0 : 11 - sum % 11;
        if (result !== parseInt(digits.charAt(0))) return false;
        
        length = length + 1;
        numbers = cnpj.substring(0, length);
        sum = 0;
        pos = length - 7;
        
        for (let i = length; i >= 1; i--) {
            sum += numbers.charAt(length - i) * pos--;
            if (pos < 2) pos = 9;
        }
        
        result = sum % 11 < 2 ? 0 : 11 - sum % 11;
        if (result !== parseInt(digits.charAt(1))) return false;
        
        return true;
    };

    const validateCPF = (cpf) => {
        cpf = cpf.replace(/[^\d]+/g, '');
        if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
        
        let sum = 0;
        let remainder;
        
        for (let i = 1; i <= 9; i++) {
            sum += parseInt(cpf.substring(i-1, i)) * (11 - i);
        }
        
        remainder = (sum * 10) % 11;
        if ((remainder === 10) || (remainder === 11)) remainder = 0;
        if (remainder !== parseInt(cpf.substring(9, 10))) return false;
        
        sum = 0;
        for (let i = 1; i <= 10; i++) {
            sum += parseInt(cpf.substring(i-1, i)) * (12 - i);
        }
        
        remainder = (sum * 10) % 11;
        if ((remainder === 10) || (remainder === 11)) remainder = 0;
        if (remainder !== parseInt(cpf.substring(10, 11))) return false;
        
        return true;
    };

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const validatePassword = (password) => {
        const re = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
        return re.test(password);
    };

    const validateBirthDate = (date) => {
        const birthDate = new Date(date);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            return age - 1;
        }
        return age;
    };

    // Handler unificado para campos da empresa
    const handleEmpresaChange = (e) => {
        const { name, value } = e.target;
        
        if (name === 'cnpj') {
            const formattedValue = formatCNPJ(value);
            setFormData(prev => ({
                ...prev,
                empresa: {
                    ...prev.empresa,
                    [name]: formattedValue
                }
            }));
            
            if (formattedValue.replace(/\D/g, '').length === 14 && !validateCNPJ(formattedValue)) {
                setErrors(prev => ({
                    ...prev,
                    empresa: {
                        ...prev.empresa,
                        cnpj: 'CNPJ inválido'
                    }
                }));
            } else {
                setErrors(prev => ({
                    ...prev,
                    empresa: {
                        ...prev.empresa,
                        cnpj: ''
                    }
                }));
            }
            return;
        }
        
        setFormData(prev => ({
            ...prev,
            empresa: {
                ...prev.empresa,
                [name]: value
            }
        }));
    };

    // Handler para dirigentes
    const handleDirigenteChange = (e, index) => {
        const { name, value } = e.target;
        
        if (name === 'cpf') {
            const formattedValue = formatCPF(value);
            const newDirigentes = [...formData.dirigentes];
            newDirigentes[index] = {
                ...newDirigentes[index],
                [name]: formattedValue
            };
            
            setFormData(prev => ({
                ...prev,
                dirigentes: newDirigentes
            }));
            
            // Atualiza erros
            const newErrors = {...errors};
            if (formattedValue.replace(/\D/g, '').length === 11 && !validateCPF(formattedValue)) {
                newErrors.dirigentes[index].cpf = 'CPF inválido';
            } else {
                newErrors.dirigentes[index].cpf = '';
            }
            setErrors(newErrors);
            return;
        }
        
        const newDirigentes = [...formData.dirigentes];
        newDirigentes[index] = {
            ...newDirigentes[index],
            [name]: value
        };
        
        setFormData(prev => ({
            ...prev,
            dirigentes: newDirigentes
        }));
        
        // Validação em tempo real
        const newErrors = {...errors};
        
        if (name === 'email' && value && !validateEmail(value)) {
            newErrors.dirigentes[index].email = 'Email inválido';
        } else if (name === 'dataNascimento' && value) {
            const age = validateBirthDate(value);
            if (age < 18) {
                newErrors.dirigentes[index].dataNascimento = 'Você deve ter pelo menos 18 anos';
            } else {
                newErrors.dirigentes[index].dataNascimento = '';
            }
        } else if (name === 'senha' && value && !validatePassword(value)) {
            newErrors.dirigentes[index].senha = 'Senha deve ter pelo menos 8 caracteres, 1 número e 1 letra maiúscula';
        } else if (name === 'confirmarSenha' && value && value !== newDirigentes[index].senha) {
            newErrors.dirigentes[index].confirmarSenha = 'As senhas não coincidem';
        } else {
            newErrors.dirigentes[index][name] = '';
        }
        
        setErrors(newErrors);
    };

    // Handler para arquivos
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
            
            setFormData(prev => ({
                ...prev,
                documentos: {
                    ...prev.documentos,
                    [documentType]: file
                }
            }));
        }
    };

    // Adicionar/remover dirigentes
    const addDirigente = () => {
        setFormData(prev => ({
            ...prev,
            dirigentes: [...prev.dirigentes, {
                nomeCompleto: '',
                dataNascimento: '',
                cpf: '',
                email: '',
                senha: '',
                confirmarSenha: ''
            }]
        }));
        
        setErrors(prev => ({
            ...prev,
            dirigentes: [...prev.dirigentes, {
                nomeCompleto: '',
                dataNascimento: '',
                cpf: '',
                email: '',
                senha: '',
                confirmarSenha: ''
            }]
        }));
    };

    const removeDirigente = (index) => {
        if (formData.dirigentes.length <= 1) return;
        
        const newDirigentes = [...formData.dirigentes];
        newDirigentes.splice(index, 1);
        
        setFormData(prev => ({
            ...prev,
            dirigentes: newDirigentes
        }));
        
        const newErrors = {...errors};
        newErrors.dirigentes.splice(index, 1);
        setErrors(newErrors);
    };

    // Validação do formulário
    const validateForm = () => {
        let valid = true;
        const newErrors = {...errors};
        
        // Validação da empresa
        if (!formData.empresa.razaoSocial.trim()) {
            newErrors.empresa.razaoSocial = 'Razão social é obrigatória';
            valid = false;
        }
        
        if (!formData.empresa.cnpj) {
            newErrors.empresa.cnpj = 'CNPJ é obrigatório';
            valid = false;
        } else if (!validateCNPJ(formData.empresa.cnpj)) {
            newErrors.empresa.cnpj = 'CNPJ inválido';
            valid = false;
        }
        
        if (!formData.empresa.endereco.trim()) {
            newErrors.empresa.endereco = 'Endereço é obrigatório';
            valid = false;
        }
        
        // Validação dos dirigentes
        formData.dirigentes.forEach((dirigente, index) => {
            if (!dirigente.nomeCompleto.trim()) {
                newErrors.dirigentes[index].nomeCompleto = 'Nome completo é obrigatório';
                valid = false;
            }
            
            if (!dirigente.dataNascimento) {
                newErrors.dirigentes[index].dataNascimento = 'Data de nascimento é obrigatória';
                valid = false;
            } else if (validateBirthDate(dirigente.dataNascimento) < 18) {
                newErrors.dirigentes[index].dataNascimento = 'Você deve ter pelo menos 18 anos';
                valid = false;
            }
            
            if (!dirigente.cpf) {
                newErrors.dirigentes[index].cpf = 'CPF é obrigatório';
                valid = false;
            } else if (!validateCPF(dirigente.cpf)) {
                newErrors.dirigentes[index].cpf = 'CPF inválido';
                valid = false;
            }
            
            if (!dirigente.email) {
                newErrors.dirigentes[index].email = 'Email é obrigatório';
                valid = false;
            } else if (!validateEmail(dirigente.email)) {
                newErrors.dirigentes[index].email = 'Email inválido';
                valid = false;
            }
            
            if (!dirigente.senha) {
                newErrors.dirigentes[index].senha = 'Senha é obrigatória';
                valid = false;
            } else if (!validatePassword(dirigente.senha)) {
                newErrors.dirigentes[index].senha = 'Senha deve ter pelo menos 8 caracteres, 1 número e 1 letra maiúscula';
                valid = false;
            }
            
            if (!dirigente.confirmarSenha) {
                newErrors.dirigentes[index].confirmarSenha = 'Confirmação de senha é obrigatória';
                valid = false;
            } else if (dirigente.confirmarSenha !== dirigente.senha) {
                newErrors.dirigentes[index].confirmarSenha = 'As senhas não coincidem';
                valid = false;
            }
        });
        
        setErrors(newErrors);
        return valid;
    };

    // Envio do formulário
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            try {
                setSubmitStatus({ message: 'Enviando dados...', isSuccess: true });
                
                // Simulação de chamada à API
                console.log('Dados do formulário:', formData);
                
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                setSubmitStatus({ 
                    message: 'Cadastro realizado com sucesso!', 
                    isSuccess: true 
                });
                
            } catch (error) {
                setSubmitStatus({ 
                    message: 'Erro ao cadastrar. Tente novamente.', 
                    isSuccess: false 
                });
                console.error('Erro no cadastro:', error);
            }
        } else {
            setSubmitStatus({ 
                message: 'Por favor, corrija os erros no formulário.', 
                isSuccess: false 
            });
        }
    };

    return (
        <div className="menu_principal">
            <Header />
            <div className="main_content">
                <h1 className="main_content_title">Cadastro Pessoa Jurídica</h1>
                <hr className="main_content_line" />
            </div>

            {/* Mensagem de status */}
            {submitStatus.message && (
                <div className={`submit-message ${submitStatus.isSuccess ? 'success' : 'error'}`}>
                    {submitStatus.message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="formulario">
                {/* Seção Dados da Empresa */}
                <div className="main_content_subtitle">
                    <h3>Dados da Empresa:</h3>
                </div>

                <div className="form_primeira_coluna">
                    <div className="form_primeira_coluna_nome_info">
                        <h5>Razão Social</h5>
                        <input 
                            type="text" 
                            name="razaoSocial"
                            className={`form_primeira_coluna_input_nome ${errors.empresa.razaoSocial ? 'error' : ''}`}
                            value={formData.empresa.razaoSocial}
                            onChange={handleEmpresaChange}
                        />
                        {errors.empresa.razaoSocial && <span className="error-message">{errors.empresa.razaoSocial}</span>}
                    </div>
                    <div className="form_primeira_coluna_data_info">
                        <h5>CNPJ</h5>
                        <input 
                            type="text" 
                            name="cnpj"
                            placeholder="00.000.000/0000-00"
                            className={`form_primeira_coluna_input_data ${errors.empresa.cnpj ? 'error' : ''}`}
                            value={formData.empresa.cnpj}
                            onChange={handleEmpresaChange}
                            maxLength="18"
                        />
                        {errors.empresa.cnpj && <span className="error-message">{errors.empresa.cnpj}</span>}
                    </div>
                </div>

                <div className="form_segunda_coluna">
                    <div className="form_segunda_coluna_cpf_info">
                        <h5>Endereço Completo</h5>
                        <input 
                            type="text" 
                            name="endereco"
                            className={`form_segunda_coluna_input_cpf ${errors.empresa.endereco ? 'error' : ''}`}
                            value={formData.empresa.endereco}
                            onChange={handleEmpresaChange}
                        />
                        {errors.empresa.endereco && <span className="error-message">{errors.empresa.endereco}</span>}
                    </div>
                </div>

                <hr className="main_content_line2" />

                {/* Seção Dirigentes */}
                <div className="main_content_subtitle">
                    <h3>Dados dos Dirigentes Responsáveis:</h3>
                </div>

                {formData.dirigentes.map((dirigente, index) => (
                    <div key={index} className="dirigente-container">
                        {formData.dirigentes.length > 1 && (
                            <button 
                                type="button" 
                                className="btn-remover-dirigente"
                                onClick={() => removeDirigente(index)}
                            >
                                Remover
                            </button>
                        )}

                        <div className="form_primeira_coluna">
                            <div className="form_primeira_coluna_nome_info">
                                <h5>Nome completo</h5>
                                <input 
                                    type="text" 
                                    name="nomeCompleto"
                                    placeholder="Nome completo" 
                                    className={`form_primeira_coluna_input_nome ${errors.dirigentes[index]?.nomeCompleto ? 'error' : ''}`}
                                    value={dirigente.nomeCompleto}
                                    onChange={(e) => handleDirigenteChange(e, index)}
                                />
                                {errors.dirigentes[index]?.nomeCompleto && <span className="error-message">{errors.dirigentes[index].nomeCompleto}</span>}
                            </div>
                            <div className="form_primeira_coluna_data_info">
                                <h5>Data de nascimento</h5>
                                <input 
                                    type="date" 
                                    name="dataNascimento"
                                    className={`form_primeira_coluna_input_data ${errors.dirigentes[index]?.dataNascimento ? 'error' : ''}`}
                                    value={dirigente.dataNascimento}
                                    onChange={(e) => handleDirigenteChange(e, index)}
                                />
                                {errors.dirigentes[index]?.dataNascimento && <span className="error-message">{errors.dirigentes[index].dataNascimento}</span>}
                            </div>
                        </div>

                        <div className="form_segunda_coluna">
                            <div className="form_segunda_coluna_cpf_info">
                                <h5>CPF</h5>
                                <input 
                                    type="text" 
                                    name="cpf"
                                    placeholder="000.000.000-00" 
                                    className={`form_segunda_coluna_input_cpf ${errors.dirigentes[index]?.cpf ? 'error' : ''}`}
                                    value={dirigente.cpf}
                                    onChange={(e) => handleDirigenteChange(e, index)}
                                    maxLength="14"
                                />
                                {errors.dirigentes[index]?.cpf && <span className="error-message">{errors.dirigentes[index].cpf}</span>}
                            </div>
                            <div className="form_segunda_coluna_email_info">
                                <h5>Email</h5>
                                <input 
                                    type="email" 
                                    name="email"
                                    placeholder="E-mail" 
                                    className={`form_segunda_coluna_input_email ${errors.dirigentes[index]?.email ? 'error' : ''}`}
                                    value={dirigente.email}
                                    onChange={(e) => handleDirigenteChange(e, index)}
                                />
                                {errors.dirigentes[index]?.email && <span className="error-message">{errors.dirigentes[index].email}</span>}
                            </div>
                        </div>

                        <div className="form_segunda_coluna">
                            <div className="form_segunda_coluna_senha_info">
                                <h5>Senha</h5>
                                <input 
                                    type="password" 
                                    name="senha"
                                    placeholder="Senha" 
                                    className={`form_segunda_coluna_input_senha ${errors.dirigentes[index]?.senha ? 'error' : ''}`}
                                    value={dirigente.senha}
                                    onChange={(e) => handleDirigenteChange(e, index)}
                                />
                                {errors.dirigentes[index]?.senha && <span className="error-message">{errors.dirigentes[index].senha}</span>}
                                <p className="password-hint">Mínimo 8 caracteres, 1 número e 1 letra maiúscula</p>
                            </div>
                            <div className="form_segunda_coluna_confirmar_senha_info">
                                <h5>Confirmar Senha</h5>
                                <input 
                                    type="password" 
                                    name="confirmarSenha"
                                    placeholder="Confirmar senha" 
                                    className={`form_segunda_coluna_input_confirmar_senha ${errors.dirigentes[index]?.confirmarSenha ? 'error' : ''}`}
                                    value={dirigente.confirmarSenha}
                                    onChange={(e) => handleDirigenteChange(e, index)}
                                />
                                {errors.dirigentes[index]?.confirmarSenha && <span className="error-message">{errors.dirigentes[index].confirmarSenha}</span>}
                            </div>
                        </div>

                        {index < formData.dirigentes.length - 1 && <hr className="main_content_line2" />}
                    </div>
                ))}

                <div className="adicionar_dirigente">
                    <button 
                        type="button" 
                        className="adicionar_dirigente_novo"
                        onClick={addDirigente}
                    >
                        Adicionar dirigente responsável
                    </button>
                </div>

                <hr className="main_content_line2" />

                {/* Seção Documentos */}
                <div className="main_content_subtitle">
                    <h3>Envio de documentos:</h3>
                </div>

                {/* Seção Documentos completa */}
<div className="documentos_para_envio_campos">
    {/* Contrato Social */}
    <div className="documentos_para_envio_campos_identidade">
        <div className="documentos_para_envio_campos_identidade_esquerda">
            <h5>Contrato Social ou Estatuto da Empresa</h5>
            <p>(Somente arquivos em PDF)</p>
        </div>
        <div className="documentos_para_envio_campos_identidade_direita">
            <label className="btn_documentos documento_pessoal">
                Adicionar arquivo
                <input 
                    type="file" 
                    accept=".pdf"
                    style={{ display: 'none' }}
                    onChange={(e) => handleFileUpload(e, 'contratoSocial')}
                />
            </label>
            <p>(Tamanho máximo: 5MB)</p>
            {formData.documentos.contratoSocial && (
                <p className="file-info">{formData.documentos.contratoSocial.name}</p>
            )}
        </div>
    </div>

    <hr className="documentos_para_envio_line" />

    {/* Comprovante de Endereço */}
    <div className="documentos_para_envio_campos_identidade">
        <div className="documentos_para_envio_campos_identidade_esquerda">
            <h5>Comprovantes de endereço da empresa</h5>
            <p>(Somente arquivos em PDF)</p>
        </div>
        <div className="documentos_para_envio_campos_identidade_direita">
            <label className="btn_documentos comprovante_residencia">
                Adicionar arquivo
                <input 
                    type="file" 
                    accept=".pdf"
                    style={{ display: 'none' }}
                    onChange={(e) => handleFileUpload(e, 'comprovanteEndereco')}
                />
            </label>
            <p>(Tamanho máximo: 5MB)</p>
            {formData.documentos.comprovanteEndereco && (
                <p className="file-info">{formData.documentos.comprovanteEndereco.name}</p>
            )}
        </div>
    </div>

    <hr className="documentos_para_envio_line" />

    {/* Currículo da Empresa */}
    <div className="documentos_para_envio_campos_identidade">
        <div className="documentos_para_envio_campos_identidade_esquerda">
            <h5>Curriculo da empresa destacando atuação cultural</h5>
            <p>(Somente arquivos em PDF)</p>
        </div>
        <div className="documentos_para_envio_campos_identidade_direita">
            <label className="btn_documentos curriculo_atuacao">
                Adicionar arquivo
                <input 
                    type="file" 
                    accept=".pdf"
                    style={{ display: 'none' }}
                    onChange={(e) => handleFileUpload(e, 'curriculoEmpresa')}
                />
            </label>
            <p>(Tamanho máximo: 5MB)</p>
            {formData.documentos.curriculoEmpresa && (
                <p className="file-info">{formData.documentos.curriculoEmpresa.name}</p>
            )}
        </div>
    </div>

    <hr className="documentos_para_envio_line" />

    {/* Cartão de CNPJ */}
    <div className="documentos_para_envio_campos_identidade">
        <div className="documentos_para_envio_campos_identidade_esquerda">
            <h5>Cartão de CNPJ atualizado</h5>
            <p>(Somente arquivos em PDF)</p>
        </div>
        <div className="documentos_para_envio_campos_identidade_direita">
            <label className="btn_documentos certidao_regularidade">
                Adicionar arquivo
                <input 
                    type="file" 
                    accept=".pdf"
                    style={{ display: 'none' }}
                    onChange={(e) => handleFileUpload(e, 'cartaoCnpj')}
                />
            </label>
            <p>(Tamanho máximo: 5MB)</p>
            {formData.documentos.cartaoCnpj && (
                <p className="file-info">{formData.documentos.cartaoCnpj.name}</p>
            )}
        </div>
    </div>

    <hr className="documentos_para_envio_line" />

    {/* Certidão de Regularidade Fiscal */}
    <div className="documentos_para_envio_campos_identidade">
        <div className="documentos_para_envio_campos_identidade_esquerda">
            <h5>Certidão de Regularidade Fiscal</h5>
            <p>(Somente arquivos em PDF)</p>
        </div>
        <div className="documentos_para_envio_campos_identidade_direita">
            <label className="btn_documentos certidao_regularidade">
                Adicionar arquivo
                <input 
                    type="file" 
                    accept=".pdf"
                    style={{ display: 'none' }}
                    onChange={(e) => handleFileUpload(e, 'certidaoRegularidade')}
                />
            </label>
            <p>(Tamanho máximo: 5MB)</p>
            {formData.documentos.certidaoRegularidade && (
                <p className="file-info">{formData.documentos.certidaoRegularidade.name}</p>
            )}
        </div>
    </div>

    <hr className="documentos_para_envio_line" />

    {/* Certidão de Prestação de Contas */}
    <div className="documentos_para_envio_campos_identidade">
        <div className="documentos_para_envio_campos_identidade_esquerda">
            <h5>Certidão de Prestação de Contas do Funcultura</h5>
            <p>(Somente arquivos em PDF)</p>
        </div>
        <div className="documentos_para_envio_campos_identidade_direita">
            <label className="btn_documentos certidao_prestacao">
                Adicionar arquivo
                <input 
                    type="file" 
                    accept=".pdf"
                    style={{ display: 'none' }}
                    onChange={(e) => handleFileUpload(e, 'certidaoPrestacao')}
                />
            </label>
            <p>(Tamanho máximo: 5MB)</p>
            {formData.documentos.certidaoPrestacao && (
                <p className="file-info">{formData.documentos.certidaoPrestacao.name}</p>
            )}
        </div>
    </div>

    <hr className="documentos_para_envio_line" />
</div>

                {/* Botão de Submit */}
                <div className="btn_cadastro_div">
                    <button type="submit" className="btn_cadastro">Finalizar Cadastro</button>
                </div>
            </form>

            <Footer />
        </div>
    );
}

export default PJFormsPage;
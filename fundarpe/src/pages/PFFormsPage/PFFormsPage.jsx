import { useState } from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import "../PFFormsPage/PFFormsPage.css";
import "../../components/MainContent/MainContent.css";
import api from "../../services/api";

function PFFormsPage() {
    // Estados para os campos do formulário
    const [formData, setFormData] = useState({
        nomeCompleto: '',
        dataNascimento: '',
        cpf: '',
        email: '',
        senha: '',
        endereco: '',
        confirmarSenha: '',
        tipoUsuario: 'fisico',
        documentos: {
            identidade: null,
            comprovanteResidencia: null,
            curriculoAtuacao: null,
            certidaoRegularidade: null,
            certidaoPrestacao: null
        }
    });

    // Estados para erros de validação
    const [errors, setErrors] = useState({
        nomeCompleto: '',
        dataNascimento: '',
        cpf: '',
        email: '',
        senha: '',
        confirmarSenha: ''
    });

    // Estado para mensagem de sucesso/erro no envio
    const [submitStatus, setSubmitStatus] = useState({
        message: '',
        isSuccess: false
    });

    // Função para formatar CPF
    const formatCPF = (value) => {
        const cleaned = value.replace(/\D/g, '');  // Remove todos os caracteres não numéricos
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

        return formatted.slice(0, 14);  // Limita para o formato correto
    };

    // Função para validar CPF
    const validateCPF = (cpf) => {
        cpf = cpf.replace(/[^\d]+/g, '');  // Remove qualquer caractere não numérico
        if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

        let sum = 0;
        let remainder;

        for (let i = 1; i <= 9; i++) {
            sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
        }

        remainder = (sum * 10) % 11;
        if ((remainder === 10) || (remainder === 11)) remainder = 0;
        if (remainder !== parseInt(cpf.substring(9, 10))) return false;

        sum = 0;
        for (let i = 1; i <= 10; i++) {
            sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
        }

        remainder = (sum * 10) % 11;
        if ((remainder === 10) || (remainder === 11)) remainder = 0;
        if (remainder !== parseInt(cpf.substring(10, 11))) return false;

        return true;
    };

    // Função para validar email
    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    // Função para validar senha
    const validatePassword = (password) => {
        const re = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
        return re.test(password);
    };

    // Função para validar data de nascimento
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

    // Handler para mudanças nos campos
    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'cpf') {
            // Formata o CPF enquanto o usuário digita
            const formattedValue = formatCPF(value);
            setFormData(prev => ({
                ...prev,
                [name]: formattedValue
            }));

            // Valida o CPF
            if (formattedValue.replace(/\D/g, '').length === 11 && !validateCPF(formattedValue)) {
                setErrors(prev => ({ ...prev, cpf: 'CPF inválido' }));
            } else {
                setErrors(prev => ({ ...prev, cpf: '' }));
            }
            return;
        }

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Validação em tempo real para outros campos
        if (name === 'email' && value && !validateEmail(value)) {
            setErrors(prev => ({ ...prev, email: 'Email inválido' }));
        } else if (name === 'dataNascimento' && value) {
            const age = validateBirthDate(value);
            if (age < 18) {
                setErrors(prev => ({ ...prev, dataNascimento: 'Você deve ter pelo menos 18 anos' }));
            } else {
                setErrors(prev => ({ ...prev, dataNascimento: '' }));
            }
        } else if (name === 'senha' && value && !validatePassword(value)) {
            setErrors(prev => ({ ...prev, senha: 'Senha deve ter pelo menos 8 caracteres, 1 número e 1 letra maiúscula' }));
        } else if (name === 'confirmarSenha' && value && value !== formData.senha) {
            setErrors(prev => ({ ...prev, confirmarSenha: 'As senhas não coincidem' }));
        } else {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

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

            setFormData(prev => ({
                ...prev,
                documentos: {
                    ...prev.documentos,
                    [documentType]: file
                }
            }));
        }
    };

    // Validação final antes do envio
    const validateForm = () => {
        let valid = true;
        const newErrors = { ...errors };

        // Validação de campos obrigatórios
        const requiredFields = [
            { field: 'nomeCompleto', message: 'Nome completo é obrigatório' },
            { field: 'dataNascimento', message: 'Data de nascimento é obrigatória' },
            { field: 'cpf', message: 'CPF é obrigatório' },
            { field: 'email', message: 'Email é obrigatório' },
            { field: 'senha', message: 'Senha é obrigatória' },
            { field: 'confirmarSenha', message: 'Confirmação de senha é obrigatória' }
        ];

        requiredFields.forEach(({ field, message }) => {
            if (!formData[field]) {
                newErrors[field] = message;
                valid = false;
            }
        });

        // Validações específicas
        if (formData.dataNascimento && validateBirthDate(formData.dataNascimento) < 18) {
            newErrors.dataNascimento = 'Você deve ter pelo menos 18 anos';
            valid = false;
        }

        if (formData.cpf && !validateCPF(formData.cpf)) {
            newErrors.cpf = 'CPF inválido';
            valid = false;
        }

        if (formData.email && !validateEmail(formData.email)) {
            newErrors.email = 'Email inválido';
            valid = false;
        }

        if (formData.senha && !validatePassword(formData.senha)) {
            newErrors.senha = 'Senha deve ter pelo menos 8 caracteres, 1 número e 1 letra maiúscula';
            valid = false;
        }

        if (formData.confirmarSenha && formData.confirmarSenha !== formData.senha) {
            newErrors.confirmarSenha = 'As senhas não coincidem';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    // Função de envio - antes de enviar o CPF, removemos a formatação
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Limpa o CPF de qualquer formatação antes de enviar
        const cpfParaEnviar = formData.cpf.replace(/\D/g, '');  // Remove formatação (.) e (-)

        // Validação do formulário
        if (validateForm()) {
            try {
                setSubmitStatus({ message: 'Enviando dados...', isSuccess: true });
                
                // Simulando chamada à API
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Redireciona para a página de sucesso após cadastro
                window.location.href = '/cadastro-sucesso';
                
                // Extraindo dados sem campos que não precisam ser enviados
                const { confirmarSenha, tipoUsuario, documentos, ...userPayload } = formData;
                const userTipo = tipoUsuario || "fisico";
                
                // Formata a data de nascimento para o formato correto (YYYY-MM-DD)
                const formattedBirthDate = new Date(formData.dataNascimento).toISOString().split('T')[0];

                const payload = {
                    nome_completo: userPayload.nomeCompleto,
                    data_nascimento: formattedBirthDate,
                    cpf: cpfParaEnviar,
                    email: userPayload.email,
                    senha: userPayload.senha,
                    endereco: userPayload.endereco || "Endereço Fictício",
                    tipo_usuario: userTipo
                };

                console.log("Payload enviado: ", payload);  // Verifique o payload

                setSubmitStatus({ message: 'Enviando dados...', isSuccess: true });

                // Envio da requisição para a API
                const response = await api.post('/user/create', payload);

                // Simulando delay de rede
                await new Promise(resolve => setTimeout(resolve, 1500));

                setSubmitStatus({
                    message: 'Cadastro realizado com sucesso!',
                    isSuccess: true
                });
            } catch (error) {
                console.error("Erro no cadastro:", error.response?.data || error.message);
                setSubmitStatus({
                    message: 'Erro ao cadastrar. Tente novamente.',
                    isSuccess: false
                });
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
                <h1 className="main_content_title">Cadastro Pessoa Física</h1>
                <hr className="main_content_line" />
            </div>

            <div className="formulario">
                <h3 className="main_content_subtitle">Informações cadastrais</h3>

                {submitStatus.message && (
                    <div className={`submit-message ${submitStatus.isSuccess ? 'success' : 'error'}`}>
                        {submitStatus.message}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    {/* Seção de Informações Pessoais */}
                    <div className="form_primeira_coluna">
                        <div className="form_primeira_coluna_nome_info">
                            <h5>Nome completo</h5>
                            <input
                                type="text"
                                name="nomeCompleto"
                                placeholder="Nome completo"
                                className={`form_primeira_coluna_input_nome ${errors.nomeCompleto ? 'error' : ''}`}
                                value={formData.nomeCompleto}
                                onChange={handleChange}
                            />
                            {errors.nomeCompleto && <span className="error-message">{errors.nomeCompleto}</span>}
                        </div>
                        <div className="form_primeira_coluna_data_info">
                            <h5>Data de nascimento</h5>
                            <input
                                type="date"
                                name="dataNascimento"
                                className={`form_primeira_coluna_input_data ${errors.dataNascimento ? 'error' : ''}`}
                                value={formData.dataNascimento}
                                onChange={handleChange}
                            />
                            {errors.dataNascimento && <span className="error-message">{errors.dataNascimento}</span>}
                        </div>
                    </div>

                    <div className="form_segunda_coluna">
                        <div className="form_segunda_coluna_cpf_info">
                            <h5>CPF</h5>
                            <input
                                type="text"
                                name="cpf"
                                placeholder="000.000.000-00"
                                className={`form_segunda_coluna_input_cpf ${errors.cpf ? 'error' : ''}`}
                                value={formData.cpf}
                                onChange={handleChange}
                                maxLength="14"
                            />
                            {errors.cpf && <span className="error-message">{errors.cpf}</span>}
                        </div>
                        <div className="form_segunda_coluna_email_info">
                            <h5>Email</h5>
                            <input
                                type="email"
                                name="email"
                                placeholder="E-mail"
                                className={`form_segunda_coluna_input_email ${errors.email ? 'error' : ''}`}
                                value={formData.email}
                                onChange={handleChange}
                            />
                            {errors.email && <span className="error-message">{errors.email}</span>}
                        </div>
                    </div>

                    {/* Seção de Senha */}
                    <div className="form_segunda_coluna">
                        <div className="form_segunda_coluna_senha_info">
                            <h5>Senha</h5>
                            <input
                                type="password"
                                name="senha"
                                placeholder="Senha"
                                className={`form_segunda_coluna_input_senha ${errors.senha ? 'error' : ''}`}
                                value={formData.senha}
                                onChange={handleChange}
                            />
                            {errors.senha && <span className="error-message">{errors.senha}</span>}
                            <p className="password-hint">Mínimo 8 caracteres, 1 número e 1 letra maiúscula</p>
                        </div>
                        <div className="form_segunda_coluna_confirmar_senha_info">
                            <h5>Confirmar Senha</h5>
                            <input
                                type="password"
                                name="confirmarSenha"
                                placeholder="Confirmar senha"
                                className={`form_segunda_coluna_input_confirmar_senha ${errors.confirmarSenha ? 'error' : ''}`}
                                value={formData.confirmarSenha}
                                onChange={handleChange}
                            />
                            {errors.confirmarSenha && <span className="error-message">{errors.confirmarSenha}</span>}
                        </div>
                    </div>

                    {/* Seção de Documentos */}
                    <hr className="main_content_line2" />

                    <div className="documentos_para_envio">
                        <h3 className="main_content_subtitle">Envio de documentos:</h3>
                    </div>

                    <div className="documentos_para_envio_campos">
                        {/* Documento de Identidade */}
                        <div className="documentos_para_envio_campos_identidade">
                            <div className="documentos_para_envio_campos_identidade_esquerda">
                                <h5>RG, CNH, ou Carteira de Trabalho</h5>
                                <p>(Somente arquivos em PDF)</p>
                            </div>
                            <div className="documentos_para_envio_campos_identidade_direita">
                                <label className="btn_documentos documento_pessoal">
                                    Adicionar arquivo
                                    <input
                                        type="file"
                                        accept=".pdf"
                                        style={{ display: 'none' }}
                                        onChange={(e) => handleFileUpload(e, 'identidade')}
                                    />
                                </label>
                                <p>(Tamanho máximo: 5MB)</p>
                                {formData.documentos.identidade && (
                                    <p className="file-info">{formData.documentos.identidade.name}</p>
                                )}
                            </div>
                        </div>

                        <hr className="documentos_para_envio_line" />

                        {/* Comprovante de Residência */}
                        <div className="documentos_para_envio_campos_identidade">
                            <div className="documentos_para_envio_campos_identidade_esquerda">
                                <h5>Comprovante de Residência</h5>
                                <p>(Somente arquivos em PDF)</p>
                            </div>
                            <div className="documentos_para_envio_campos_identidade_direita">
                                <label className="btn_documentos comprovante_residencia">
                                    Adicionar arquivo
                                    <input
                                        type="file"
                                        accept=".pdf"
                                        style={{ display: 'none' }}
                                        onChange={(e) => handleFileUpload(e, 'comprovanteResidencia')}
                                    />
                                </label>
                                <p>(Tamanho máximo: 5MB)</p>
                                {formData.documentos.comprovanteResidencia && (
                                    <p className="file-info">{formData.documentos.comprovanteResidencia.name}</p>
                                )}
                            </div>
                        </div>

                        <hr className="documentos_para_envio_line" />

                        {/* Currículo */}
                        <div className="documentos_para_envio_campos_identidade">
                            <div className="documentos_para_envio_campos_identidade_esquerda">
                                <h5>Currículo de atuação cultural</h5>
                                <p>(Somente arquivos em PDF)</p>
                            </div>
                            <div className="documentos_para_envio_campos_identidade_direita">
                                <label className="btn_documentos curriculo_atuacao">
                                    Adicionar arquivo
                                    <input
                                        type="file"
                                        accept=".pdf"
                                        style={{ display: 'none' }}
                                        onChange={(e) => handleFileUpload(e, 'curriculoAtuacao')}
                                    />
                                </label>
                                <p>(Tamanho máximo: 5MB)</p>
                                {formData.documentos.curriculoAtuacao && (
                                    <p className="file-info">{formData.documentos.curriculoAtuacao.name}</p>
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

                        <div className="paragrafo_explicacao">
                            <p className="paragrafo_info">
                                Certidão de Regularidade Fiscal e de Prestação de contas são sobre ****
                                e todo este processo pode ser editado/alterado posteriormente
                            </p>
                        </div>
                    </div>

                    {/* Botão de Submit */}
                    <div className="btn_cadastro_div">
                        <button type="submit" className="btn_cadastro">Finalizar Cadastro</button>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    );
}

export default PFFormsPage;
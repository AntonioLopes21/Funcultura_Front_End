import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import "../PFFormsPage/PFFormsPage.css"
import "../../components/MainContent/MainContent.css"

function PFFormsPage() {
    return (
        <>
            <div className="menu_principal">
                <Header />
                <div className="main_content">
                    <h1 className="main_content_title">Cadastro Pessoa Física</h1>
                    <hr className="main_content_line" />
                </div>
                <div className="formulario">
                    <h3 className="main_content_subtitle">Informações cadastrais</h3>

                    <form>
                        <div className="form_primeira_coluna">
                            <div className="form_primeira_coluna_nome_info">
                                <h5>Nome completo</h5>
                                <input type="text" placeholder="Nome completo" className="form_primeira_coluna_input_nome" />
                            </div>
                            <div className="form_primeira_coluna_data_info">
                                <h5>Data de nascimento</h5>
                                <input type="date" className="form_primeira_coluna_input_data" />
                            </div>
                        </div>

                        <div className="form_segunda_coluna">
                            <div className="form_segunda_coluna_cpf_info">
                                <h5>CPF</h5>
                                <input type="text" placeholder="CPF" className="form_segunda_coluna_input_cpf" />
                            </div>
                            <div className="form_segunda_coluna_email_info">
                                <h5>Email</h5>
                                <input type="email" placeholder="E-mail" className="form_segunda_coluna_input_email" />
                            </div>
                        </div>

                        {/* seção de documentação */}
                        <hr className="main_content_line2" />

                        <div className="documentos_para_envio">
                            <h3 className="main_content_subtitle">Envio de documentos:</h3>
                        </div>

                        <div className="documentos_para_envio_campos">
                            <div className="documentos_para_envio_campos_identidade">
                                <div className="documentos_para_envio_campos_identidade_esquerda">
                                    <h5>RG, CNH, ou Carteira de Trabalho</h5>
                                    <p>(Somente arquivos em PDF)</p>
                                </div>
                                <div className="documentos_para_envio_campos_identidade_direita">
                                    <button className="btn_documentos documento_pessoal">Adicionar arquivo</button>
                                    <p>(Tamanho máximo: 5MB)</p>
                                </div>

                            </div>

                            <hr className="documentos_para_envio_line"/>
                            <div className="documentos_para_envio_campos_identidade">
                                <div className="documentos_para_envio_campos_identidade_esquerda">
                                    <h5>Comprovante de Residência</h5>
                                    <p>(Somente arquivos em PDF)</p>
                                </div>
                                <div className="documentos_para_envio_campos_identidade_direita">
                                    <button className="btn_documentos comprovante_residencia">Adicionar arquivo</button>
                                    <p>(Tamanho máximo: 5MB)</p>
                                </div>

                            </div>

                            <hr className="documentos_para_envio_line"/><div className="documentos_para_envio_campos_identidade">
                                <div className="documentos_para_envio_campos_identidade_esquerda">
                                    <h5>Currículo de atuação cultural</h5>
                                    <p>(Somente arquivos em PDF)</p>
                                </div>
                                <div className="documentos_para_envio_campos_identidade_direita">
                                    <button className="btn_documentos curriculo_atuacao">Adicionar arquivo</button>
                                    <p>(Tamanho máximo: 5MB)</p>
                                </div>

                            </div>

                            <hr className="documentos_para_envio_line"/><div className="documentos_para_envio_campos_identidade">
                                <div className="documentos_para_envio_campos_identidade_esquerda">
                                    <h5>Certidão de Regularidade Fiscal</h5>
                                    <p>(Somente arquivos em PDF)</p>
                                </div>
                                <div className="documentos_para_envio_campos_identidade_direita">
                                    <button className="btn_documentos certidao_regularidade">Adicionar arquivo</button>
                                    <p>(Tamanho máximo: 5MB)</p>
                                </div>

                            </div>
                            <hr className="documentos_para_envio_line"/>
                            
                            <div className="documentos_para_envio_campos_identidade">
                                <div className="documentos_para_envio_campos_identidade_esquerda">
                                    <h5>Certidão de Prestação de Contas do Funcultura</h5>
                                    <p>(Somente arquivos em PDF)</p>
                                </div>
                                <div className="documentos_para_envio_campos_identidade_direita">
                                    <button className="btn_documentos certidao_prestacao">Adicionar arquivo</button>
                                    <p>(Tamanho máximo: 5MB)</p>
                                </div>

                            </div>
                            <hr className="documentos_para_envio_line"/>
                        </div>
                        <div className="btn_cadastro_div">
                            <button type="submit" className="btn_cadastro">Finalizar Cadastro</button>
                        </div>
                    </form>
                </div>
                <Footer />
            </div>
        </>
    )
}

export default PFFormsPage
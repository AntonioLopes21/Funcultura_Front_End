import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "../PJFormsPage/PJFormsPage.css"

function PJFormsPage() {
    return (
        <>
            <div className="menu_principal">
                <Header />
                <div className="main_content">
                    <h1 className="main_content_title">Cadastro Pessoa Física</h1>
                    <hr className="main_content_line" />
                </div>

                <div className="main_content_subtitle">
                    <h3>Dados da Empresa:</h3>
                </div>

                <form className="main_content_forms">
                    <div className="main_content_first_col">
                        <div className="main_content_first_col_left">
                            <h4>Razão Social</h4>
                            <input type="text" className="main_content_forms_razao_social" />
                        </div>
                        <div className="main_content_second_col_right">

                            <h4>CNPJ</h4>
                            <input type="number" className="main_content_forms_cnpj" />
                        </div>
                    </div>
                    <div className="main_content_forms_address">
                        <h4>Endereço Completo da Empresa</h4>
                        <input type="text" className="main_content_forms_endereco_empresa" />
                    </div>
                </form>

                <div className="break_line">
                </div>

                <div className="main_content_dirigentes">

                    <h3>Dados dos Dirigentes Responsáveis:</h3>

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


                </div>

                <div className="break_line">
                </div>

                <div className="adicionar_dirigente">
                    <p className="adicionar_dirigente_novo">Adicionar dirigente responsável</p>
                </div>

                <div className="break_line">
                </div>

                <div className="main_content_second_part">


                    <div className="documentos_para_envio">
                        <h3 className="main_content_subtitle_second_part">Envio de documentos:</h3>
                    </div>

                    <div className="documentos_para_envio_campos">
                        <div className="documentos_para_envio_campos_identidade">
                            <div className="documentos_para_envio_campos_identidade_esquerda">
                                <h5>Contrato Social ou Estatuto da Empresa</h5>
                                <p>(Somente arquivos em PDF)</p>
                            </div>
                            <div className="documentos_para_envio_campos_identidade_direita">
                                <button className="btn_documentos documento_pessoal">Adicionar arquivo</button>
                                <p>(Tamanho máximo: 5MB)</p>
                            </div>

                        </div>

                        <hr className="documentos_para_envio_line" />
                        <div className="documentos_para_envio_campos_identidade">
                            <div className="documentos_para_envio_campos_identidade_esquerda">
                                <h5>Comprovantes de endereço da empresa</h5>
                                <p>(Somente arquivos em PDF)</p>
                            </div>
                            <div className="documentos_para_envio_campos_identidade_direita">
                                <button className="btn_documentos comprovante_residencia">Adicionar arquivo</button>
                                <p>(Tamanho máximo: 5MB)</p>
                            </div>

                        </div>

                        <hr className="documentos_para_envio_line" /><div className="documentos_para_envio_campos_identidade">
                            <div className="documentos_para_envio_campos_identidade_esquerda">
                                <h5>Curriculo da empresa destacando atuação cultural</h5>
                                <p>(Somente arquivos em PDF)</p>
                            </div>
                            <div className="documentos_para_envio_campos_identidade_direita">
                                <button className="btn_documentos curriculo_atuacao">Adicionar arquivo</button>
                                <p>(Tamanho máximo: 5MB)</p>
                            </div>

                        </div>

                        <hr className="documentos_para_envio_line" /><div className="documentos_para_envio_campos_identidade">
                            <div className="documentos_para_envio_campos_identidade_esquerda">
                                <h5>cartão de CNPJ atualizado</h5>
                                <p>(Somente arquivos em PDF)</p>
                            </div>
                            <div className="documentos_para_envio_campos_identidade_direita">
                                <button className="btn_documentos certidao_regularidade">Adicionar arquivo</button>
                                <p>(Tamanho máximo: 5MB)</p>
                            </div>

                        </div>
                        <hr className="documentos_para_envio_line" />

                        <div className="documentos_para_envio_campos_identidade">
                            <div className="documentos_para_envio_campos_identidade_esquerda">
                                <h5>Certidão de Regularidade Fiscal</h5>
                                <p>(Somente arquivos em PDF)</p>
                            </div>
                            <div className="documentos_para_envio_campos_identidade_direita">
                                <button className="btn_documentos certidao_prestacao">Adicionar arquivo</button>
                                <p>(Tamanho máximo: 5MB)</p>
                            </div>

                        </div>
                        <hr className="documentos_para_envio_line" />

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
                        <hr className="documentos_para_envio_line" />
                    </div>
                    <div className="btn_cadastro_div">
                        <button type="submit" className="btn_cadastro">Finalizar Cadastro</button>
                    </div>
                </div>


                <Footer />
            </div>
        </>
    )
}

export default PJFormsPage;
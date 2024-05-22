import { Button, Card, Col, Divider, Drawer, DrawerProps, Form, Input, Layout, Radio, RadioChangeEvent, Row, Space, Switch, Typography } from "antd";
import { useContext, useEffect, useState } from "react";
import { UsuarioContext } from "../../context/useContext";
import EmpresasService from "../../services/EmpresasService";
import Table, { ColumnsType } from "antd/es/table";
import { CaretLeftOutlined, CaretRightOutlined, EditOutlined, PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import PopUpConfirmarAcaoDeletar from "../../components/DeletarRegComponent";
import PopUpConfirmarAcaoAtivarInativar from "../../components/InativarRegComponent";
import { EmpresaModel } from "../../models/Empresa";
import PopNotificacao from "../../components/PopNotificacao";


const service = new EmpresasService();

const estiloForm = {
    backgroundColor: '#FFFFFF',
}

export default function EmpresasPage() {
    
    /********************* variaveis de contexto  ********************/
    const { id_empresa, setIdEmpresa } = useContext(UsuarioContext);
    const { usuario_id, setUsuarioId } = useContext(UsuarioContext);
    
    const [rua, setRua] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [uf, setUF] = useState('');
    
    /************************** FORM PADRAO *****************************/
    const [form] = Form.useForm();
    const [isNewCadastro, setIsNewCadastro] = useState(true); // Estado para controlar se é um novo cadastro ou não

    const [dados, setDados] = useState([]);
    const [registros, setRegistros] = useState(0);
    const [editando, setEditando] = useState(false)
    const [loading, setLoading] = useState(false);

    //**************** retorno da chamada *********/
    const [status, setStatus] = useState('');
    //**************** retorno da chamada *********/

    //************* PopNotificacao *****************/
    const [popNotificacao, setPopNotificacao] = useState(false)
    const [tituloNotificacao, setTituloNotificacao] = useState('Salvar/Atualizar Empresa')
    const [subTituloNotificacao, setSubTituloNotificacao] = useState('Empresa Salva/Atualizada com sucesso.')
    const [tipoNotificacao, setTipoNotificacao] = useState('success')
    //************* PopNotificacao *****************/

    /***************** padrao das telas(INICIO) ******************* */
    /***************** teste setar dados ******************/
    // Estado para armazenar os dados do formulário
    const [formData, setFormData] = useState({
        id_empresa: 0,
        cpf_cnpj: '',
        ie: '',
        descricao_empresa: '',
        razao: '',
        fantasia: '',
        rua: '',
        bairro: '',
        cidade: '',
        uf: '',
        cep: '',
        numero: '',
        telefone1: '',
        telefone2: '',
        ativo: true
    });

    useEffect(() => {
        listaEmpresas(id_empresa)
    }, []);

    async function listaEmpresas(id_empresa: number) {
        console.log('id_empresa: ' + id_empresa)
        let rs = await service.listarEmpresas(id_empresa);
        console.log(rs)
        setDados(rs.data.empresas)
        setRegistros(rs.data.tamanho)
    }

    function editarEmpresa(dadosrecebidos: any) {
        setEditando(true)

        setFormData({
            id_empresa: dadosrecebidos.id_empresa,
            descricao_empresa: dadosrecebidos.descricao_empresa,
            razao: dadosrecebidos.razao,
            fantasia: dadosrecebidos.fantasia,
            cpf_cnpj: dadosrecebidos.cpf_cnpj,
            ie: dadosrecebidos.ie,
            rua: dadosrecebidos.rua,
            bairro: dadosrecebidos.bairro,
            cidade: dadosrecebidos.cidade,
            uf: dadosrecebidos.uf,
            cep: dadosrecebidos.cep,
            numero: dadosrecebidos.numero,
            telefone1: dadosrecebidos.telefone1,
            telefone2: dadosrecebidos.telefone2 !== null ? dadosrecebidos.telefone2 : '',
            ativo: dadosrecebidos.ativo
        })
        form.setFieldsValue({
            id_empresa: dadosrecebidos.id_empresa,
            descricao_empresa: dadosrecebidos.descricao_empresa,
            razao: dadosrecebidos.razao,
            fantasia: dadosrecebidos.fantasia,
            cpf_cnpj: dadosrecebidos.cpf_cnpj,
            ie: dadosrecebidos.ie,
            rua: dadosrecebidos.rua,
            bairro: dadosrecebidos.bairro,
            cidade: dadosrecebidos.cidade,
            uf: dadosrecebidos.uf,
            cep: dadosrecebidos.cep,
            numero: dadosrecebidos.numero,
            telefone1: dadosrecebidos.telefone1,
            telefone2: dadosrecebidos.telefone2,
            ativo: dadosrecebidos.ativo
        });
        console.log(dadosrecebidos)

        showDrawer()

    }

    function voltarRegisto(idEmpresa: Number) {
        console.log(idEmpresa)
    }

    function avancarRegisto(idEmpresa: Number) {
        console.log(idEmpresa)
    }

    async function buscarCep(e: any) {
        let x = e.target.value;
        if (x.length === 8) {
            let rs = await service.buscaCep(x)
            console.log(rs);
            setRua(rs.logradouro)
            setBairro(rs.bairro)
            setCidade(rs.localidade)
            setUF(rs.uf)
        }
    }

    function novaEmpresa() {
        setEditando(false)
        setFormData({
            id_empresa: 0,
            cpf_cnpj: '',
            ie: '',
            descricao_empresa: '',
            razao: '',
            fantasia: '',
            rua: '',
            bairro: '',
            cidade: '',
            uf: '',
            cep: '',
            numero: '',
            telefone1: '',
            telefone2: '',
            ativo: true
        })
        form.setFieldsValue({
            id_empresa: 0,
            cpf_cnpj: '',
            ie: '',
            descricao_empresa: '',
            razao: '',
            fantasia: '',
            rua: '',
            bairro: '',
            cidade: '',
            uf: '',
            cep: '',
            numero: '',
            telefone1: '',
            telefone2: '',
            ativo: true
        });
        console.log(formData)
        showDrawer()
    }
    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };

    const onReset = () => {
        form.resetFields();
    };

    // Função para manipular a alteração nos campos do formulário
    const handleInputChange = (fieldName: string, value: any) => {
        setFormData({
            ...formData,
            [fieldName]: value,
        });
        console.log(formData);
    };
    // Função para lidar com o envio do formulário
    const salvarEmpresa = async () => {

        setLoading(true);
        console.log('************* salvando(ON FINISH) ***********')
        let empresa = new EmpresaModel(
            +formData.id_empresa,
            formData.descricao_empresa,
            formData.cpf_cnpj,
            formData.ie,
            formData.razao,
            formData.fantasia,
            formData.rua,
            formData.bairro,
            formData.cidade,
            formData.uf,
            formData.cep,
            formData.numero,
            formData.telefone1,
            formData.telefone2,
            formData.ativo)

        let res;
        !editando ? res = await service.cadastrarEmpresa(empresa) : res = await service.atualizarEmpresa(empresa)
        setStatus(res)


        //************ pop notificacao ************/
        setPopNotificacao(true);
        setSubTituloNotificacao(res.mensagem)
        res.status === 401 ?? setTipoNotificacao('error')
        //************ pop notificacao ************/

        setTimeout(function () {
            listaEmpresas(id_empresa)
            setLoading(false)
            onClose()
        }, 1000);
        listaEmpresas(id_empresa)

        //************ pop notificacao ************/
        setTimeout(() => {
            setPopNotificacao(false);
        }, 5000);
        //************ pop notificacao ************/
    };

    function _atualizarDados() {
        listaEmpresas(id_empresa)
    }

    function atualizarDados() {
        listaEmpresas(id_empresa)
    }




    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: '${label} is not a valid email!',
            number: '${label} is not a valid number!',
        },
        number: {
            range: '${label} must be between ${min} and ${max}',
        },
    };

    interface DataTypeEmpresas {
        key: number;
        id_empresa: number;
        cpf_cnpj: string;
        ie: string;
        descricao_empresa: string;
        razao: string;
        fantasia: string;
        cep: string;
        cidade: string;
        bairro: string;
        numero: string;
        uf: string;
        telefone1: string;
        telefone2: string;
        ativo: boolean;
    }

    const columns: ColumnsType<DataTypeEmpresas> = [
        {
            title: 'Empresa', dataIndex: 'descricao_empresa', key: 'descricao_empresa',
            render: (descricao_empresa, record) => <span style={{ color: record.ativo ? '#000' : 'red' }}>{descricao_empresa}</span>
        },
        {
            title: 'Cpf/Cnpj', dataIndex: 'cpf_cnpj', key: 'cpf_cnpj',
            render: (cpf_cnpj, record) => <span style={{ color: record.ativo ? '#000' : 'red' }}>{cpf_cnpj}</span>
        },
        {
            title: 'Ativo', dataIndex: 'ativo', key: 'ativo', width: '30px', align: 'center',
            render: (ativo: string) => <span style={{ color: ativo ? '#000' : 'red' }}>{ativo ? 'SIM' : 'NÃO'}</span>
        },
        {
            title: 'Action',
            dataIndex: 'id_empresa',
            key: 'id_empresa',
            width: '140px',
            //render: (_, index) => <Button icon={<EditOutlined />} onClick={() => <CadUsuarios nome={index.nome} idusuario={index.usuario_id} />} />
            render: (item, record, index) =>
                <>
                    <Button icon={<EditOutlined />} onClick={() => editarEmpresa(record)} style={{ color: 'blue', marginRight: '5px', borderColor: 'blue' }} title="Editar Empresa" />
                    <PopUpConfirmarAcaoDeletar titulo='Deletar Empresa' subTitulo='Confirma a exclusão da Empresa?' idRegistro={(record.id_empresa)} atualizar={_atualizarDados} metodoService={service.deletarEmpresa} title="Deletar Empresa" />
                    <PopUpConfirmarAcaoAtivarInativar titulo='Ativar/Inativar' subTitulo='Confirma Ativar/Inativar a Empresa' idRegistro={(record.id_empresa)} atualizar={_atualizarDados} metodoService={service.desativarEmpresa} title="Ativar/Inativar Empresa" />

                </>
        },
    ];


    /************* DRAWER INICIO *************/
    //************* PARAMETROS DRAWER INICIO *******************/
    const gutterPadrao = { xs: 2, sm: 4, md: 4, lg: 4 }
    const [open, setOpen] = useState(false);
    const [placement, setPlacement] = useState<DrawerProps['placement']>('right');
    const showDrawer = () => {
        setOpen(true);
    };

    const onChange = (e: RadioChangeEvent) => {
        setPlacement(e.target.value);
    };

    const onClose = () => {
        setOpen(false);
    };

    const estiloDivDrawer = {
        animation: 'fadeout 50s'
    }

    const DrawerComponent = (
        <>
            <div className="fade-in-div">
                <Drawer
                    title="Cadastro de Empresa"
                    width={700}
                    onClose={onClose}
                    open={open}
                    placement={placement}
                    bodyStyle={{ paddingBottom: 80 }}
                >
                    {formData.id_empresa > 0 && (
                        <>
                            <Card title="Avançar/Retroceder Registros">
                                <Button icon={<CaretLeftOutlined />} onClick={() => voltarRegisto(formData.id_empresa)} style={{ color: 'blue', marginRight: '5px', borderColor: 'blue' }} title="Registro Anterior" />
                                <Button icon={<CaretRightOutlined />} onClick={() => avancarRegisto(formData.id_empresa)} style={{ color: 'blue', marginRight: '5px', borderColor: 'blue' }} title="Próximo Registro" />
                            </Card>
                        </>
                    )}
                    <Typography style={{ paddingBottom: '10px' }}>Posição do Formulário</Typography>
                    <Space>
                        <Radio.Group value={placement} onChange={onChange}>
                            <Radio value="top">top</Radio>
                            <Radio value="right">right</Radio>
                            <Radio value="bottom">bottom</Radio>
                            <Radio value="left">left</Radio>
                        </Radio.Group>
                    </Space>
                    <Divider />
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={salvarEmpresa} /*teste */
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        style={{ maxWidth: 600 }}
                        validateMessages={validateMessages}

                    >

                        <Space>
                            <Button onClick={onClose}>Fechar</Button>
                            <Button type="primary" htmlType="submit" tabIndex={20} loading={loading}>
                                {loading ? "Aguarde ..." : editando ? "Atualizar" : "Salvar"}
                            </Button>
                            <Button /*onClick={resetCampos}*/ onClick={onReset} type="default" htmlType="button" tabIndex={21}>
                                Limpar
                            </Button>
                        </Space>
                        <Divider />
                        <Row gutter={gutterPadrao}>
                            <Col span={2}>
                                <Form.Item
                                    label="ID"
                                    name='id_empresa'
                                >
                                    <Input placeholder="Id" readOnly value={editando ? formData.id_empresa : ''} />
                                </Form.Item>
                            </Col>
                            <Col span={22}>
                                <Form.Item
                                    label="Descrição Empresa"
                                    name='descricao_empresa'
                                    rules={[{ required: true, message: 'Digite a descrição da empresa(mín.10 caracteres)', min: 10, max: 80 }]}
                                    validateFirst
                                    hasFeedback
                                >
                                    <Input
                                        placeholder="Descrição Empresa"
                                        showCount={formData.descricao_empresa.length > 0 ? true : false}
                                        tabIndex={1}
                                        maxLength={80}
                                        onChange={(e) => handleInputChange('descricao_empresa', e.target.value)}
                                        autoFocus />
                                </Form.Item>
                            </Col>

                        </Row>
                        <Row gutter={gutterPadrao}>
                            <Col span={6}>
                                <Form.Item
                                    label="Cep"
                                    name='cep'
                                    rules={[{ required: true, message: 'Digite o cep.', min: 8, max: 8 }]}
                                    validateFirst
                                    hasFeedback
                                >
                                    <Input
                                        style={{ width: '100%' }}
                                        type="text"
                                        placeholder="Cep"
                                        tabIndex={2}
                                        maxLength={8}
                                        showCount={formData.cep.length > 0 ? true : false}
                                        /*onChange={(e)=>Number.parseInt(e.target.value) == 8 ? buscarCep : salvarCep}*/
                                        onChange={(e) => handleInputChange('cep', e.target.value)}
                                        onKeyUp={buscarCep}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={18}>
                                <Form.Item
                                    label="Rua"
                                    name='rua'
                                    rules={[{ required: true, message: 'Digite a rua.', min: 5, max: 60 }]}
                                    validateFirst
                                    hasFeedback
                                >
                                    <Input
                                        style={{ width: '100%' }}
                                        type="text"
                                        placeholder="Rua"
                                        showCount={formData.rua.length > 0 ? true : false}
                                        maxLength={60}
                                        onChange={(e) => handleInputChange('rua', e.target.value)}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    label="Número"
                                    name='numero'
                                    rules={[{ required: true, message: 'Digite o número.', min: 1, max: 10 }]}
                                    validateFirst
                                    hasFeedback
                                >
                                    <Input
                                        style={{ width: '100%' }}
                                        type="text"
                                        placeholder="Nº"
                                        tabIndex={3}
                                        maxLength={10}
                                        showCount={formData.numero.length > 0 ? true : false}
                                        onChange={(e) => handleInputChange('numero', e.target.value)}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={18}>
                                <Form.Item
                                    label="Bairro"
                                    name='bairro'
                                    rules={[{ required: true, message: 'Digite o bairro.', min: 3, max: 20 }]}
                                    validateFirst
                                    hasFeedback
                                >
                                    <Input
                                        style={{ width: '100%' }}
                                        type="text"
                                        placeholder="Bairro"
                                        maxLength={20}
                                        showCount={formData.bairro.length > 0 ? true : false}
                                        onChange={(e) => handleInputChange('bairro', e.target.value)}

                                    />
                                </Form.Item>
                            </Col>

                        </Row>
                        <Row gutter={gutterPadrao}>

                            <Col span={11}>
                                <Form.Item
                                    label="Cidade"
                                    name='cidade'
                                    rules={[{ required: true, message: 'Digite a cidade.', min: 5, max: 30 }]}
                                    validateFirst
                                    hasFeedback
                                >
                                    <Input
                                        style={{ width: '100%' }}
                                        type="text"
                                        placeholder="Cidade"
                                        maxLength={30}
                                        showCount={formData.cidade.length > 0 ? true : false}
                                        onChange={(e) => handleInputChange('cidade', e.target.value)}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={3}>
                                <Form.Item
                                    label="uf"
                                    name='uf'
                                    rules={[{ required: true, message: 'Digite a UF.', min: 2, max: 2 }]}
                                    validateFirst
                                    hasFeedback
                                >
                                    <Input
                                        style={{ width: '100%' }}
                                        type="text"
                                        placeholder="Uf"
                                        maxLength={2}
                                        onChange={(e) => handleInputChange('uf', e.target.value)}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={gutterPadrao}>
                            <Col span={8}>
                                <Form.Item
                                    label="Telefone"
                                    name='telefone1'
                                    rules={[{ required: true, message: 'Digite o Telefone.', min: 11, max: 11 }]}
                                    validateFirst
                                    hasFeedback
                                >
                                    <Input
                                        style={{ width: '100%' }}
                                        type="text"
                                        placeholder="Telefone"
                                        tabIndex={4}
                                        showCount={formData.telefone1.length > 0 ? true : false}
                                        onChange={(e) => handleInputChange('telefone1', e.target.value)}
                                        maxLength={11}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    label="Telefone"
                                    name='telefone2'
                                    rules={[{ required: false, message: 'Digite o Telefone.', min: 11, max: 11 }]}
                                    validateFirst
                                    hasFeedback
                                >
                                    <Input
                                        style={{ width: '100%' }}
                                        type="text"
                                        placeholder="Telefone"
                                        tabIndex={5}
                                        showCount={formData.telefone2.length > 0 ? true : false}
                                        onChange={(e) => handleInputChange('telefone2', e.target.value)}
                                        maxLength={11}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    name="ativo"
                                    label="Ativo?"
                                    rules={[{ required: false, message: '' }]}
                                    validateFirst
                                    hasFeedback
                                >
                                    <Switch onChange={(e) => handleInputChange('ativo', e)} title="Ativo?" tabIndex={3} checked={formData.ativo} />
                                </Form.Item>
                            </Col>
                        </Row>

                    </Form>
                </Drawer>
            </div>
        </>
    );


    return (
        <>
            {popNotificacao ? <PopNotificacao titulo={tituloNotificacao} subTitulo={subTituloNotificacao} tipoNotificacao={tipoNotificacao} /> : null}
            <Layout style={estiloForm}>
                <Typography style={{ paddingBottom: 10, fontSize: 18 }}>Cadastro de Empresa - Registros: {registros}</Typography>
                <div>
                    <Button type="primary" onClick={novaEmpresa} style={{ width: 150 }} icon={<PlusOutlined />}>
                        Nova Empresa
                    </Button>
                    <Button onClick={atualizarDados} style={{ width: 150, marginLeft: 5 }} icon={<ReloadOutlined />}>
                        Atualizar
                    </Button>
                </div>
                <Divider />
                <Table
                    bordered
                    size="small"
                    dataSource={dados}
                    columns={columns}
                    rowKey={(record) => record.id_empresa}
                />

            </Layout>
            {DrawerComponent}
        </>
    )
}
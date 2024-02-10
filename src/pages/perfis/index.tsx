
import { CaretLeftOutlined, CaretRightOutlined, EditOutlined, PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import { Button, Card, Col, Divider, Drawer, DrawerProps, Form, Input, Layout, Radio, RadioChangeEvent, Row, Space, Switch, Table, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import { useContext, useEffect, useState } from "react";
import PopUpConfirmarAcaoDeletar from "../../components/DeletarRegComponent";
import PopNotificacao from "../../components/PopNotificacao";
import { UsuarioContext } from "../../context/useContext";
import Perfis from "../../models/Perfil";
import PerfisService from "../../services/PerfisService";
import { default as PopUpConfirmarAcaoAtivarInativar } from "./../../components/InativarRegComponent";

const service = new PerfisService();

const estiloForm = {
    backgroundColor: '#FFFFFF',
}

export default function PerfisPage() {
    const [form] = Form.useForm();
    const { id_empresa, setIdEmpresa } = useContext(UsuarioContext);
    const { usuario_id, setUsuarioId } = useContext(UsuarioContext);

    const [dados, setDados] = useState([]);
    const [registros, setRegistros] = useState(0);
    const [editando, setEditando] = useState(false)
    const [loading, setLoading] = useState(false);

    //**************** retorno da chamada *********/
    const [status, setStatus] = useState('');
    //**************** retorno da chamada *********/

    //************* PopNotificacao *****************/
    const [popNotificacao, setPopNotificacao] = useState(false)
    const [tituloNotificacao, setTituloNotificacao] = useState('Salvar/Atualizar Perfil')
    const [subTituloNotificacao, setSubTituloNotificacao] = useState('Perfil Salvo/Atualizado com sucesso.')
    const [tipoNotificacao, setTipoNotificacao] = useState('success')
    //************* PopNotificacao *****************/

    /***************** padrao das telas(INICIO) ******************* */
    /***************** teste setar dados ******************/
    // Estado para armazenar os dados do formulário
    const [formData, setFormData] = useState({
        id_nivel: 0,
        codigo_nivel: '',
        descricao_nivel: '',
        ativo: true
    });

    interface PerfisType {
        key: number;
        id_nivel: number;
        codigoPerfil: string;
        descricaoPerfil: string;
        ativo: boolean;
    }

    /********************* LISTA DE PERFIS(TABELA) INICIO ************** */
    const columns: ColumnsType<PerfisType> = [
        {
            title: 'Código', dataIndex: 'codigo_nivel', key: 'id_nivel',
            render: (codigo_nivel, record) => <span style={{ color: record.ativo ? '#000' : 'red' }}>{codigo_nivel}</span>
        },
        {
            title: 'Descrição Perfil', dataIndex: 'descricao_nivel', key: 'id_nivel',
            render: (descricao_nivel, record) => <span style={{ color: record.ativo ? '#000' : 'red' }}>{descricao_nivel}</span>
        },
        {
            title: 'Ativo', dataIndex: 'ativo', key: 'id_nivel', width: '30px', align: 'center',
            render: (ativo: string) => <span style={{ color: ativo ? '#000' : 'red' }}>{ativo ? 'SIM' : 'NÃO'}</span>
            /*render: (ativo: string) => <span style={{ color: ativo ? '#000' : 'red' }}>{String(ativo).toUpperCase()}</span>*/
        },
        {
            title: 'Ações',
            key: 'id_nivel',
            width: '180px',
            //render: (_, index) => <Button icon={<EditOutlined />} onClick={() => <CadUsuarios nome={index.nome} idusuario={index.usuario_id} />} />
            render: (item, record, index) =>
                <>
                    <Button icon={<EditOutlined />} onClick={() => editarPerfil(record)} style={{ color: 'blue', marginRight: '5px', borderColor: 'blue' }} title="Editar Perfil" />
                    <PopUpConfirmarAcaoDeletar titulo='Deletar Perfil' subTitulo='Confirma a exclusão do Perfil?' idRegistro={(record.id_nivel)} atualizar={_atualizarDados} metodoService={service.deletarPerfil} title="Deletar Perfil" />
                    <PopUpConfirmarAcaoAtivarInativar titulo='Ativar/Inativar Perfil?' subTitulo='Confirma Ativar/Inativar o Perfil?' idRegistro={(record.id_nivel)} atualizar={_atualizarDados} metodoService={service.desativarPerfil} title="Ativar/Inativar Perfil" />
                </>
        },
    ];

    /********************* LISTA DE PERFIS(TABELA) FIM ************** */
    useEffect(() => {
        listaPerfis(id_empresa)
    }, []);

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };

    const onReset = () => {
        form.resetFields();
    };
    /**************** FUNCÕES(INICIO) ***************** */
    // Função para manipular a alteração nos campos do formulário

    const handleInputChange = (fieldName: string, value: any) => {
        setFormData({
            ...formData,
            [fieldName]: value,
        });
        console.log(formData);
    };
    // Função para lidar com o envio do formulário
    const salvarPerfil = async () => {

        setLoading(true);

        console.log('************* salvando(ON FINISH) ***********')
        let perfil = new Perfis(+formData.id_nivel, id_empresa, formData.codigo_nivel, formData.descricao_nivel, formData.ativo)
        let res;
        !editando ? res = await service.cadastrarPerfil(perfil) : res = await service.atualizarPerfil(perfil)
        setStatus(res)

        //************ pop notificacao ************/
        setPopNotificacao(true);
        setSubTituloNotificacao(res.mensagem)
        res.status == 401 ?? setTipoNotificacao('error')
        //************ pop notificacao ************/

        setTimeout(function () {
            listaPerfis(id_empresa)
            setLoading(false)
            onClose()
        }, 1000);
        listaPerfis(id_empresa)

        //************ pop notificacao ************/
        setTimeout(() => {
            setPopNotificacao(false);
        }, 5000);
        //************ pop notificacao ************/
    };

    //******** nao apagar , retornado de components ***************/
    //****************  privado para não ser chamado no build do componetos ****************
    function _atualizarDados() {
        listaPerfis(id_empresa)
    }

    function atualizarDados() {
        listaPerfis(id_empresa)
    }

    async function listaPerfis(id_empresa: number) {
        console.log('id_empresa: ' + id_empresa)
        let rs = await service.listarPerfis(id_empresa);
        console.log(rs)
        setDados(rs.data.perfis)
        setRegistros(rs.data.tamanho)
    }

    function novoPerfil() {
        setEditando(false)
        setFormData({
            id_nivel: 0,
            codigo_nivel: '',
            descricao_nivel: '',
            ativo: true
        })
        form.setFieldsValue({
            id_nivel: 0,
            codigo_nivel: '',
            descricao_nivel: '',
            ativo: true
        });
        console.log(formData)
        showDrawer()
    }

    function editarPerfil(dadosrecebidos: any) {
        setEditando(true)

        setFormData({
            id_nivel: dadosrecebidos.id_nivel,
            codigo_nivel: dadosrecebidos.codigo_nivel,
            descricao_nivel: dadosrecebidos.descricao_nivel,
            ativo: dadosrecebidos.ativo
        })
        form.setFieldsValue({
            id_nivel: dadosrecebidos.id_nivel,
            codigo_nivel: dadosrecebidos.codigo_nivel,
            descricao_nivel: dadosrecebidos.descricao_nivel,
            ativo: dadosrecebidos.ativo
        });
        console.log(dadosrecebidos)

        showDrawer()

    }
    /**************** FUNCÕES (FIM) ***************** */

    function voltarRegisto(idPerfil: Number) {
        console.log(idPerfil)
    }

    function avancarRegisto(idPerfil: Number) {
        console.log(idPerfil)
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
    //************* PARAMETROS DRAWER FIM  *******************/
    const DrawerComponent = (
        <>
            <div className="fade-in-div">
                <Drawer
                    title="Cadastro de Perfis"
                    width={720}
                    onClose={onClose}
                    open={open}
                    placement={placement}
                    bodyStyle={{ paddingBottom: 80 }}
                >

                    {formData.id_nivel > 0 && (
                        <>
                            <Card title="Avançar/Retroceder Registros" style={{padding: '0px', margin: '0px'}}>
                                <Button icon={<CaretLeftOutlined />} onClick={() => voltarRegisto(formData.id_nivel)} style={{ color: 'blue', marginRight: '5px', borderColor: 'blue' }} title="Registro Anterior" />
                                <Button icon={<CaretRightOutlined />} onClick={() => avancarRegisto(formData.id_nivel)} style={{ color: 'blue', marginRight: '5px', borderColor: 'blue' }} title="Próximo Registro" />
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
                        onFinish={salvarPerfil} /*teste */
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        style={{ maxWidth: 600 }}
                        validateMessages={validateMessages}

                    >
                        <Form.Item>
                            <Space>
                                <Button onClick={onClose}>Fechar</Button>
                                <Button type="primary" htmlType="submit" tabIndex={20} loading={loading}>
                                    {loading ? "Aguarde ..." : editando ? "Atualizar" : "Salvar"}
                                </Button>
                                <Button /*onClick={resetCampos}*/ onClick={onReset} type="default" htmlType="button" tabIndex={21}>
                                    Limpar
                                </Button>
                            </Space>
                        </Form.Item>
                        <Divider />
                        <Row gutter={gutterPadrao}>
                            <Col span={2}>
                                <Form.Item
                                    label="ID"
                                    name='id_nivel'
                                >
                                    <Input placeholder="Id" readOnly value={editando ? formData.id_nivel : ''} />
                                </Form.Item>
                            </Col>
                            <Col span={11}>
                                <Form.Item
                                    label="Código no Nível"
                                    name='codigo_nivel'
                                    rules={[{ required: true, message: 'Digite o código do nível.', min: 2, max: 2 }]}
                                    validateFirst
                                    hasFeedback
                                >
                                    <Input
                                        style={{ width: '100%' }}
                                        placeholder="Código do nível..."
                                        onChange={(e) => handleInputChange('codigo_nivel', e.target.value)}
                                        tabIndex={1}
                                        maxLength={2}
                                        showCount={formData.codigo_nivel.length > 0 ? true : false}
                                        autoFocus
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={gutterPadrao}>
                            <Col span={22}>
                                <Form.Item
                                    label="Descrição do Nível"
                                    name="descricao_nivel"
                                    rules={[{ required: true, message: 'Digite a descrição do nível', min: 5, max: 20 }]}
                                    validateFirst
                                    hasFeedback
                                >
                                    <Input
                                        placeholder="Descrição no nível..."
                                        showCount={formData.descricao_nivel.length > 0 ? true : false}
                                        maxLength={20}
                                        tabIndex={2}
                                        onChange={(e) => handleInputChange('descricao_nivel', e.target.value)} />
                                </Form.Item>
                            </Col>

                        </Row>
                        <Row gutter={gutterPadrao}>
                            <Col span={6}>
                                <Form.Item
                                    name="ativo"
                                    label="Ativo?"
                                >
                                    <Switch onChange={(e) => handleInputChange('ativo', e)} title="Ativo?" tabIndex={3} checked={formData.ativo} />
                                </Form.Item>
                            </Col>
                        </Row>

                    </Form>
                    <div>Ativo: {formData.ativo}</div>
                </Drawer>
            </div>
        </>
    );
    /*************DRAWER FIM *************/

    return (
        <>
            {popNotificacao ? <PopNotificacao titulo={tituloNotificacao} subTitulo={subTituloNotificacao} tipoNotificacao={tipoNotificacao} /> : null}
            <Layout style={estiloForm}>
                <Typography style={{ paddingBottom: 10, fontSize: 18 }}>Cadastro de Níveis(Perfis) - Registros: {registros}</Typography>
                <div>
                    <Button type="primary" onClick={novoPerfil} style={{ width: 150 }} icon={<PlusOutlined />}>
                        Novo Perfil
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
                    rowKey={(record) => record.id_nivel}
                />
            </Layout>
            {DrawerComponent}
        </>
    )
}





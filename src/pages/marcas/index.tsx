
import { Button, Card, Col, Divider, Drawer, DrawerProps, Form, Input, Layout, Radio, RadioChangeEvent, Row, Space, Switch, Typography } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { UsuarioContext } from '../../context/useContext';
import Table, { ColumnsType } from 'antd/es/table';
import { CaretLeftOutlined, CaretRightOutlined, EditOutlined, PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import PopUpConfirmarAcaoDeletar from '../../components/DeletarRegComponent';
import PopUpConfirmarAcaoAtivarInativar from '../../components/InativarRegComponent';
import MarcasService from '../../services/MarcasService';
import PopNotificacao from '../../components/PopNotificacao';


const service = new MarcasService();

const estiloForm = {
    backgroundColor: '#FFFFFF',
}

interface DataTypeMarcas {
    key: number;
    id_marca: number;
    id_fabricante: number;
    descricao: string;
    ativo: boolean;
}

export default function Marcas() {

    /********************* variaveis de contexto  ********************/
    const { id_empresa, setIdEmpresa } = useContext(UsuarioContext);
    const { usuario_id, setUsuarioId } = useContext(UsuarioContext);

    /************************** FORM PADRAO *****************************/
    const [form] = Form.useForm();
    const [isNewCadastro, setIsNewCadastro] = useState(true); // Estado para controlar se é um novo cadastro ou não
    //const [hasFeedback, setHasFeedback] = useState(false);

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

    const modulo = "MARCA"
    //************* PopNotificacao *****************/

    useEffect(() => {
        // listaEmpresas(id_empresa)

        // const interval = setInterval(() => {
        //     listaEmpresas(id_empresa)
        // }, 10000);

        // // Limpa o intervalo quando o componente é desmontado
        // return () => clearInterval(interval);
    }, []);

    const columns: ColumnsType<DataTypeMarcas> = [
        {
            title: 'ID', dataIndex: 'id_marca', key: 'id_marca',
            render: (id_marca, record) => <span style={{ color: record.ativo ? '#000' : 'red' }}>{id_marca}</span>
        },
        {
            title: 'Descrição', dataIndex: 'descricao', key: 'descricao',
            render: (descricao, record) => <span style={{ color: record.ativo ? '#000' : 'red' }}>{descricao}</span>
        },
        {
            title: 'Fabricante', dataIndex: 'id_fabricante', key: 'id_fabricante',
            render: (id_fabricante, record) => <span style={{ color: record.ativo ? '#000' : 'red' }}>{id_fabricante}</span>
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
                    <Button icon={<EditOutlined />} onClick={() => editarMarca(record)} style={{ color: 'blue', marginRight: '5px', borderColor: 'blue' }} title="Editar MARCA" />
                    <PopUpConfirmarAcaoDeletar titulo={`Deletar ${modulo}}`} subTitulo={`Confirma a exclusão da ${modulo}?`} idRegistro={(record.id_marca)} atualizar={_atualizarDados} metodoService={service.deletarMarca} title={`Deletar ${modulo}`} />
                    <PopUpConfirmarAcaoAtivarInativar titulo={`Ativar/Inativar`} subTitulo={`Confirma Ativar/Inativar ${modulo}`} idRegistro={(record.id_marca)} atualizar={_atualizarDados} metodoService={service.desativarMarca} title={`Ativar/Inativar ${modulo}`} />
                </>
        },
    ];
    const [formData, setFormData] = useState({
        id_marca: 1,
        id_fabricante: 1,
        descricao: '',
        ativo: true
    });

    function novaMarca() {

        setEditando(false)
        setFormData({
            id_marca: 0,
            id_fabricante: 0,
            descricao: '',
            ativo: true
        })
        form.setFieldsValue({
            id_marca: 0,
            codigo: '',
            ativo: true
        });
        showDrawer()
    }
    function editarMarca(dadosrecebidos: DataTypeMarcas) {
        setEditando(true)

        setFormData({
            id_marca: dadosrecebidos.id_marca,
            id_fabricante: dadosrecebidos.id_fabricante,
            descricao: dadosrecebidos.descricao,
            ativo: dadosrecebidos.ativo
        })
        form.setFieldsValue({
            id_marca: dadosrecebidos.id_marca,
            id_fabricante: dadosrecebidos.id_fabricante,
            codidescricaoo: dadosrecebidos.descricao,
            ativo: dadosrecebidos.ativo
        });
        console.log(dadosrecebidos)

        showDrawer()
    }

    const salvarMarca = async () => {

        //************ pop notificacao ************/
        setTimeout(() => {
            setPopNotificacao(false);
        }, 5000);
        //************ pop notificacao ************/
    };
    async function listaMarcas(id_empresa: number) {
        console.log('id_empresa: ' + id_empresa)
        let rs = await service.listarMarcas(id_empresa);
        console.log(rs)
        setDados(rs.data.empresas)
        setRegistros(rs.data.tamanho)
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };

    // Função para manipular a alteração nos campos do formulário
    const handleInputChange = (fieldName: string, value: any) => {
        setFormData({
            ...formData,
            [fieldName]: value,
        });

        // console.log(formData);
    };

    const onReset = () => {
        form.resetFields();
        setFormData({
            id_marca: 0,
            id_fabricante: 0,
            descricao: '',
            ativo: true
        })

        //setHasFeedback(false);  // Desativa o feedback visual
    };


    function _atualizarDados() {
        listaMarcas(id_empresa)
    }

    function atualizarDados() {
        listaMarcas(id_empresa)
    }

    function voltarRegisto(idEmpresa: Number) {
        console.log(idEmpresa)
    }

    function avancarRegisto(idEmpresa: Number) {
        console.log(idEmpresa)
    }




    /************* DRAWER INICIO *************/
    //************* PARAMETROS DRAWER INICIO *******************/
    const gutterPadrao = { xs: 2, sm: 4, md: 4, lg: 4 }
    const [open, setOpen] = useState(false);
    const [placement, setPlacement] = useState<DrawerProps['placement']>('right');

    const showDrawer = () => {
        console.log('**** showDrawer ****')
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
                    width={1000}
                    onClose={onClose}
                    open={open}
                    placement={placement}
                    bodyStyle={{ paddingBottom: 80 }}
                >
                    {formData.id_marca > 0 && (
                        <>
                            <Card title="Avançar/Retroceder Registros">
                                <Button icon={<CaretLeftOutlined />} onClick={() => voltarRegisto(formData.id_marca)} style={{ color: 'blue', marginRight: '5px', borderColor: 'blue' }} title="Registro Anterior" />
                                <Button icon={<CaretRightOutlined />} onClick={() => avancarRegisto(formData.id_marca)} style={{ color: 'blue', marginRight: '5px', borderColor: 'blue' }} title="Próximo Registro" />
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
                        // initialValues={formData}
                        layout="vertical"
                        onFinish={salvarMarca} /*teste */
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        style={{ maxWidth: 1000 }}
                    // validateMessages={validateMessages}

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
                            <Col span={4}>
                                <Form.Item
                                    label="ID"
                                    name='id_marca'
                                >
                                    <Input placeholder="Id..." readOnly value={editando ? formData.id_marca : ''} />
                                </Form.Item>
                            </Col>
                            <Col span={10}>
                                <Form.Item
                                    label="Fabricante"
                                    name='id_fabricante'
                                    validateFirst
                                    hasFeedback={formData.id_fabricante > 0 ? true : false}
                                    rules={[{ required: true, message: 'Selecione o fabricante!', min: 10, max: 40 }]}
                                >
                                    <Input
                                        placeholder="fabricante..."
                                        tabIndex={1}
                                        showCount
                                        maxLength={40}
                                        value={formData.id_fabricante}
                                        onChange={(e) => handleInputChange('id_fabricante', e.target.value)}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={10}>
                                <Form.Item
                                    label="Descrição"
                                    name='descricao'
                                    validateFirst
                                    hasFeedback={formData.descricao.length > 0 ? true : false}
                                    rules={[{ required: true, message: 'Digite a descriçaõ!', min: 10, max: 40 }]}
                                >
                                    <Input
                                        placeholder="descrição..."
                                        tabIndex={1}
                                        showCount
                                        maxLength={40}
                                        value={formData.id_fabricante}
                                        onChange={(e) => handleInputChange('codigo', e.target.value)}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={2}>
                                <Form.Item
                                    name="ativo"
                                    label="Ativo?"
                                    rules={[{ required: false, message: '' }]}
                                // validateFirst
                                >
                                    <Switch onChange={(e) => handleInputChange('ativo', e)} title="Ativo?" checked={formData.ativo} />
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
                <Typography style={{ paddingBottom: 10, fontSize: 18 }}>{`Cadastro de ${modulo} - Registros: ${registros}`}</Typography>
                <div>
                    <Button type="primary" onClick={novaMarca} style={{ width: 150 }} icon={<PlusOutlined />}>
                        {`Nova(o) ${modulo}`}
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
                    rowKey={(record) => record.id_marca}
                />

            </Layout>
            {DrawerComponent}
        </>
    )
}
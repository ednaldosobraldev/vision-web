import { Button, Checkbox, Col, DatePicker, Divider, Drawer, DrawerProps, Form, Input, Layout, Radio, RadioChangeEvent, Row, Select, Space, Table, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import { useContext, useEffect, useState } from "react";
import UsuariosService from "../../services/UsuarioService";
import { UsuarioContext } from "../../context/useContext";
import { DeleteOutlined, EditOutlined, PlayCircleOutlined, PlusOutlined, StopOutlined } from "@ant-design/icons";

const service = new UsuariosService();
const estilorow = {
    paddingTop: '10px'
}

const estiloForm = {
    backgroundColor: '#FFFFFF',
}



export default function UsuariosAdminPage() {
    const { id_empresa, setIdEmpresa } = useContext(UsuarioContext);
    const { usuario_id, setUsuarioId } = useContext(UsuarioContext);

    const [usuario_nome, setUsuarioNome] = useState('')
    const [usuario_email, setUsuarioEmail] = useState('');
    const [usuario_login, setUsuarioLogin] = useState('');
    const [usuario_senha, setUsuarioSenha] = useState('');
    const [usuario_telefone1, setUsuarioTelefone1] = useState('');
    const [usuario_telefone2, setUsuarioTelefone2] = useState('');
    const [usuario_ativo, setUsuarioAtivo] = useState('');
    const [usuario_nivel, setUsuarioNivel] = useState(0);
    const [usuario_id_alt, setUsuarioIdAlt] = useState(0);

    const [dados, setDados] = useState([]);
    const [dadosEnviados, setDadosEnviados] = useState([])
    const [edit, setEdit] = useState(false)

    async function listaUsuarios(id_empresa: number) {
        console.log(id_empresa)
        let rs = await service.listaUsuarios(id_empresa);
        console.log(rs)
        setDados(rs.data.usuarios)
    }

    useEffect(() => {
        listaUsuarios(id_empresa)
    }, []);


    interface DataType {
        key: number;
        nome: string;
        ativo: boolean;
        usuario_id: number;
    }
    const columns: ColumnsType<DataType> = [
        { title: 'Nome', dataIndex: 'nome', key: 'nome' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'Telefone', dataIndex: 'telefone1', key: 'telefone1' },
        { title: 'Ativo', dataIndex: 'ativo', key: 'ativo', width: '30px', align: 'center', render: (texto: string) => <a style={{ color: 'red' }}>{texto}</a> },

        {
            title: 'Action',
            dataIndex: 'nome',
            key: 'id_usuario',
            width: '140px',
            //render: (_, index) => <Button icon={<EditOutlined />} onClick={() => <CadUsuarios nome={index.nome} idusuario={index.usuario_id} />} />
            render: (_, index) =>
                <>
                    <Button icon={<EditOutlined />} onClick={() => editarUsuarios(index)} style={{ color: 'blue', marginRight: '5px', borderColor: 'blue' }} title="Editar usuário" />
                    <Button icon={<StopOutlined />} onClick={() => desabilitarUsuario(index.usuario_id)} style={{ color: 'orange', marginRight: '5px', borderColor: 'orange' }} title="Ativar/Desativar usuário" />
                    <Button icon={<DeleteOutlined />} onClick={() => deletarUsuario(index.usuario_id)} style={{ color: 'red', marginRight: '5px', borderColor: 'red' }} title='Excluir usuário' />

                </>
        },
    ];

    function editarUsuarios(dadosrecebidos: any) {
        console.log('--------------------------editarUsuarios--------------------------------------')
        console.log(dadosrecebidos)
        console.log('---------------------------editarUsuarios-------------------------------------')
        console.log(usuario_id)
        //setEdit(true)
        //setId(dadosrecebidos.usuario_id)
        // setNome(dadosrecebidos.usuario_nome)
        setDadosEnviados(dadosrecebidos)

        showDrawer()
        //console.log('-------------------- DADOS CONVERTIDOS -------------------------------')
        ///const obj = Object.assign({}, dadosrecebidos);
        //console.log(obj)

        // setDados(JSON.parse(dados.data))
        // const obj = (JSON.parse(dados.usuario_id))
        // console.log(obj)

        // ///showDrawer()
        // setTimeout(function () {
        //     setEdit(false)

        // }, 3000);
    }

    function desabilitarUsuario(idusuario: number) {
        console.log('desabilitar usuario')
    }
    function deletarUsuario(idusuario: number) {
        console.log('deletar usuario')
    }
    function limparCampos() {
        console.log('limparCampos')
    }

    /***************** funcoes salvar campos *********************/
    function salvarUsuario(e: any) {
        setUsuarioNome(e.target.value)
    }
    function salvarNivelUsuario(valor: any) {
        console.log(valor)
    }
    function salvarEmailUsuario(e: any) {
        setUsuarioEmail(e.target.value)
    }
    function salvarLoginUsuario(e: any) {
        setUsuarioLogin(e.targe.value)
    }
    function salvarSenhaUsuario(e: any) {
        setUsuarioSenha(e.target.value)
    }
    function salvarTelefone1Usuario(e: any) {
        setUsuarioTelefone1(e.tager.value)
    }
    function salvarTelefone2Usuario(e: any) {
        setUsuarioTelefone2(e.target.value)
    }
    function salvarAtivo(valor: any) {
        setUsuarioAtivo(valor)
    }
    function salvarIdUsuarioAlt() {
        setUsuarioIdAlt(usuario_id)
    }
    /***************** funcoes salvar campos *********************/




    /*************DRAWER *************/
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

    const gutterPadrao = { xs: 2, sm: 4, md: 4, lg: 4 }

    const DrawerComponent = (
        <>
            <div className="fade-in-div">
                <Drawer
                    title="Cadastro de usuários"
                    width={720}
                    onClose={onClose}
                    open={open}
                    placement={placement}
                    bodyStyle={{ paddingBottom: 80 }}
                >
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
                    <Form layout="vertical">
                        <Space>
                            <Button onClick={onClose}>Cancelar</Button>
                            <Button onClick={salvarUsuario} type="primary" htmlType="submit">
                                Submit
                            </Button>
                            <Button onClick={limparCampos} type="default" htmlType="reset">
                                Limpar
                            </Button>
                        </Space>
                        <Divider />
                        <Row gutter={gutterPadrao}>
                            <Col span={4}>
                                <Form.Item
                                    name="id_usuario"
                                    label="ID"
                                    rules={[{ required: true, message: 'Digite o nome do usuário', }]}
                                >
                                    <Input placeholder="Id" readOnly />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    name="nome"
                                    label="Nome do usuário"
                                    rules={[{ required: true, message: 'Digite o nome do usuário' }]}
                                >
                                    <Input placeholder="Please enter user name" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="email"
                                    label="Email"
                                    rules={[{ required: true, message: 'Digite o email do usuário' }]}
                                >
                                    <Input
                                        style={{ width: '100%' }}
                                        type="email"
                                        placeholder="Digite o email do usuário"
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={gutterPadrao}>
                            <Col span={12}>
                                <Form.Item
                                    name="nivel"
                                    label="Nível do usuário"
                                    rules={[{ required: true, message: 'Please select an owner' }]}
                                >
                                    <Select
                                        onChange={salvarNivelUsuario}
                                        options={[
                                            { value: '1', label: 'Administrador' },
                                            { value: '2', label: 'Operador' },
                                            { value: '3', label: 'Gerente' },
                                            { value: '4', label: 'Suporte', disabled: true },
                                        ]}


                                        placeholder="Please select an owner" />
                                </Form.Item>
                            </Col>

                        </Row>
                        <Row gutter={gutterPadrao}>

                            <Col span={12}>
                                <Form.Item
                                    name="dateTime"
                                    label="DateTime"
                                    rules={[{ required: true, message: 'Please choose the dateTime' }]}
                                >
                                    <DatePicker.RangePicker
                                        style={{ width: '100%' }}
                                        getPopupContainer={(trigger) => trigger.parentElement!}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={gutterPadrao}>
                            <Col span={24}>
                                <Form.Item
                                    name="description"
                                    label="Description"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'please enter url description',
                                        },
                                    ]}
                                >
                                    <Input.TextArea rows={4} placeholder="please enter url description" />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Drawer>
            </div>
        </>
    );


    const teste = (
        <div>
            <Typography>Anita Gabryella</Typography>
        </div>
    )


    /*************DRAWER *************/

    return (
        <>
            <Layout style={estiloForm}>
                <Typography style={{paddingBottom: 10, fontSize: 18}}>Cadastro de Usuários</Typography>
                <Button type="primary" onClick={showDrawer} style={{width: 150, padding: 4}} icon={<PlusOutlined />}>
                    Novo Usuário
                </Button>
                <Divider />
                <Table
                    bordered
                    size="small"
                    dataSource={dados}
                    columns={columns}
                    rowKey={(record) => record.usuario_id}
                />

            </Layout>
            {DrawerComponent}
        </>
    )
}
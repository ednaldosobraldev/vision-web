import { Button, Col, Divider, Drawer, DrawerProps, Form, Input, Layout, Radio, RadioChangeEvent, Row, Space, Switch, Table, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import { useContext, useEffect, useState } from "react";

import { DeleteOutlined, EditOutlined, PlusOutlined, ReloadOutlined, StopOutlined } from "@ant-design/icons";
import { UsuarioContext } from "../../context/useContext";
import EscolasService from "../../services/EscolasService";

const service = new EscolasService();

const estiloForm = {
    backgroundColor: '#FFFFFF',
}

export default function EscolasPageOldxxxxxxxxxxxxxx(this: any)   {
    const [form] = Form.useForm();

    const { id_empresa, setIdEmpresa } = useContext(UsuarioContext);
    const { usuario_id, setUsuarioId } = useContext(UsuarioContext);

    const [id_escola, setIdEscola] = useState(0);
    const [nome_escola, setNomeEscola] = useState('')
    const [rua, setRua] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [uf, setUF] = useState('');
    const [cep, setCep] = useState('');
    const [numero, setNumero] = useState('');
    const [telefone1, setTelefone1] = useState('');
    const [telefone2, setTelefone2] = useState('');
    const [ativo, setAtivo] = useState(true);

    const [dados, setDados] = useState([]);
    const [editando, setEditando] = useState(false)

    const [loading, setLoading] = useState(false);



    useEffect(() => {
        listaEscolas(id_empresa)
    }, []);

    interface DataType {
        key: number;
        id_escola: number;
        nome_escola: string;
        rua: string;
        bairro: string;
        cidade: string;
        cep: string;
        numero: string;
        telefone1: string;
        telefone2: string;
        ativo: boolean;
    }
    const columns: ColumnsType<DataType> = [
        { title: 'Nome Escola', dataIndex: 'nome_escola', key: 'nome' },
        { title: 'Telefone', dataIndex: 'telefone1', key: 'email' },
        { title: 'Ativo', dataIndex: 'ativo', key: 'ativo', width: '30px', align: 'center', 
            render: (texto: string) => <span style={{ color: 'blue' }}>{String(texto).toUpperCase()}</span> },
        {
            title: 'Action',
            dataIndex: 'nome_escola',
            key: 'id_escola',
            width: '140px',
            //render: (_, index) => <Button icon={<EditOutlined />} onClick={() => <CadUsuarios nome={index.nome} idusuario={index.usuario_id} />} />
            render: (_, index) =>
                <>
                    <Button icon={<EditOutlined />} onClick={() => editarEscola(index)} style={{ color: 'blue', marginRight: '5px', borderColor: 'blue' }} title="Editar escola" />
                    <Button icon={<StopOutlined />} onClick={() => desabilitarEscola(index.id_escola)} style={{ color: 'orange', marginRight: '5px', borderColor: 'orange' }} title="Ativar/Desativar escola" />
                    <Button icon={<DeleteOutlined />} onClick={() => deletarEscola(index.id_escola)} style={{ color: 'red', marginRight: '5px', borderColor: 'red' }} title='Excluir escola' />

                </>
        },
    ];

    //**************** SETs CAMPOS FORMULÁRIO INCIO **********************/

    function novaEscola() {
        setEditando(false)
        resetCampos()
        showDrawer()
    }
    function salvarNomeEscola(e: any) {
        let y = e.target.value
        setNomeEscola(y.toUpperCase())
    }
    function salvarRua(e: any) {
        setRua(e.target.value)
    }
    function salvarNumero(e: any) {
        setNumero(e.target.value)
    }
    function salvarBairro(e: any) {
        setBairro(e.target.value)
    }
    function salvarCidade(e: any) {
        setCidade(e.target.value)
    }
    function salvarUf(e: any) {
        setUF(e.target.value)
    }
    function salvarTelefone1(e: any) {
        setTelefone1(e.target.value)
    }
    function salvarTelefone2(e: any) {
        setTelefone2(e.target.value)
    }
    function salvarAtivo(e: any) {
        setAtivo(e)
        console.log(ativo)
    }
    function salvarCep(e: any) {
        setCep(e.target.value)
        console.log(e.target.value)
    }
    //**************** SETs CAMPOS FORMULÁRIO FIM **********************/



    //****************  FUNÇÕS DE CONSULTA INICIO *********************/
    async function listaEscolas(id_empresa: number) {
        console.log('id_empresa: ' + id_empresa)
        let rs = await service.listaEscolas(id_empresa);
        console.log(rs)
        setDados(rs.data.escolas)
    }

    async function salvarEscola(escola: any) {

        let rs = await service.cadastrarEscola(escola)
        console.log(rs)

    }

    function atualizarDados() {
        listaEscolas(id_empresa)
    }
    function editarEscola(dadosrecebidos: any) {
        setEditando(true)

        setIdEscola(dadosrecebidos.id_escola)
        setNomeEscola(dadosrecebidos.nome_escola)
        setCep(dadosrecebidos.cep)
        setRua(dadosrecebidos.rua)
        setBairro(dadosrecebidos.bairro)
        setCidade(dadosrecebidos.cidade)
        setNumero(dadosrecebidos.numero)
        setUF(dadosrecebidos.uf)
        setTelefone1(dadosrecebidos.telefone1)
        setTelefone2(dadosrecebidos.telefone2)
        setAtivo(dadosrecebidos.ativo);
        //setEdit(true)

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
    function deletarEscola(id_escola: number) {
        console.log('deletar escola')
    }
    function desabilitarEscola(id_escola: number) {
        console.log('desabilitar escola')
    }

    async function buscarCep(e: any) {
        let x = e.target.value;
        if (x.length == 8) {
            let rs = await service.buscaCep(x)
            console.log(rs);
            setRua(rs.logradouro)
            setBairro(rs.bairro)
            setCidade(rs.localidade)
            setUF(rs.uf)
            //setCep(e.target.value)
        }

    }
    async function onFinish(values: any) {
        setLoading(true);

        console.log('************* salvando(ON FINISH) ***********')
        //console.log(values)
        console.log(nome_escola)
        console.log(cep)
        console.log(rua)
        console.log(numero)
        console.log(bairro)
        console.log(cidade)
        console.log(uf)
        console.log(telefone1)
        console.log(telefone2)
        console.log(ativo)
        const escola = {
            nome_escola,
            cep,
            rua,
            numero,
            bairro,
            cidade,
            uf,
            telefone1,
            telefone2,
            id_empresa,
            ativo
        }

        salvarEscola(escola)

        setTimeout(function () {
            setLoading(false)
            console.log('loading.....: ' + loading)
        }, 3000);

        //setLoading(false);
        //resetCampos()
        setTimeout(function () {
            listaEscolas(id_empresa)
            onClose()
        }, 5000);
        
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };



    //****************  FUNÇÕS DE CONSULTA FIM *********************/
    const onReset = () => {
        form.resetFields();
    };
    function resetCampos() {
        console.log('------------------- resetCampos ------------------------')
        setIdEscola(0);
        setNomeEscola('')
        setRua('');
        setBairro('');
        setCidade('');
        setCep('');
        setNumero('');
        setTelefone1('');
        setTelefone2('');
        setAtivo(true);
        //setLoading(false);
    }

    /*************DRAWER INICIO *************/
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
    /*************DRAWER FIM *************/

    //************* PARAMETROS INICIO *******************/
    const gutterPadrao = { xs: 2, sm: 4, md: 4, lg: 4 }
    //************* PARAMETROS FIM  *******************/

    const DrawerComponent = (
        <>
            <div className="fade-in-div">
                <Drawer
                    title="Cadastro de Escolas `"
                    width={720}
                    onClose={onClose}
                    open={open}
                    placement={placement}
                    bodyStyle={{ paddingBottom: 80 }}
                >
                    <Typography style={{ paddingBottom: '10px' }}>Posição do Formulário({ativo} )</Typography>
                    <Space>
                        <Radio.Group value={placement} onChange={onChange}>
                            <Radio value="top">top</Radio>
                            <Radio value="right">right</Radio>
                            <Radio value="bottom">bottom</Radio>
                            <Radio value="left">left</Radio>
                        </Radio.Group>
                    </Space>
                    <Divider />
                    <Form layout="vertical"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        style={{ maxWidth: 600 }}>

                        <Space>
                            <Button onClick={onClose}>Fechar</Button>
                            <Button onClick={onFinish} type="primary" htmlType="submit" tabIndex={20} loading={loading}>
                                {loading ? "Aguarde ..." : editando ? "Atualizar" : "Salvar"}
                            </Button>
                            <Button onClick={resetCampos} type="default" htmlType="button" tabIndex={21}>
                                Limpar
                            </Button>
                        </Space>
                        <Divider />
                        <Row gutter={gutterPadrao}>
                            <Col span={2}>
                                <Form.Item
                                    label="ID"
                                >
                                    <Input placeholder="Id" readOnly value={editando ? id_escola : ''} />
                                </Form.Item>
                            </Col>
                            <Col span={22}>
                                <Form.Item
                                    label="Nome da Escola"
                                    rules={[{ required: true, message: 'Digite o nome da escola' }]}
                                >
                                    <Input placeholder="Nome da escola" value={nome_escola} tabIndex={1} onChange={salvarNomeEscola} autoFocus />
                                </Form.Item>
                            </Col>

                        </Row>
                        <Row gutter={gutterPadrao}>
                            <Col span={4}>
                                <Form.Item
                                    label="Cep"
                                    rules={[{ required: true, message: 'Digite o cep.' }]}
                                >
                                    <Input
                                        style={{ width: '100%' }}
                                        type="text"
                                        placeholder="Cep"
                                        tabIndex={2}
                                        value={cep}
                                        /*onChange={(e)=>Number.parseInt(e.target.value) == 8 ? buscarCep : salvarCep}*/
                                        onChange={salvarCep}
                                        onKeyUp={buscarCep}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={16}>
                                <Form.Item
                                    label="Rua"
                                    rules={[{ required: true, message: 'Digite a rua.' }]}

                                >
                                    <Input
                                        style={{ width: '100%' }}
                                        type="text"
                                        placeholder="Rua"
                                        value={rua}
                                        onChange={salvarRua}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={4}>
                                <Form.Item
                                    label="Número"
                                    rules={[{ required: true, message: 'Digite o número.' }]}
                                >
                                    <Input
                                        style={{ width: '100%' }}
                                        type="text"
                                        placeholder="Nº"
                                        tabIndex={3}
                                        onChange={salvarNumero}
                                        value={numero}

                                    />
                                </Form.Item>
                            </Col>

                        </Row>
                        <Row gutter={gutterPadrao}>
                            <Col span={11}>
                                <Form.Item
                                    label="Bairro"
                                    rules={[{ required: true, message: 'Digite o bairro.' }]}
                                >
                                    <Input
                                        style={{ width: '100%' }}
                                        type="text"
                                        placeholder="Bairro"
                                        value={bairro}
                                        onChange={salvarBairro}

                                    />
                                </Form.Item>
                            </Col>
                            <Col span={11}>
                                <Form.Item
                                    label="Cidade"
                                    rules={[{ required: true, message: 'Digite a cidade.' }]}
                                >
                                    <Input
                                        style={{ width: '100%' }}
                                        type="text"
                                        placeholder="Cidade"
                                        value={cidade}
                                        onChange={salvarCidade}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={2}>
                                <Form.Item
                                    label="uf"
                                    rules={[{ required: true, message: 'Digite a UF.' }]}
                                >
                                    <Input
                                        style={{ width: '100%' }}
                                        type="text"
                                        placeholder="Uf"
                                        value={uf}
                                        onChange={salvarUf}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={gutterPadrao}>
                            <Col span={6}>
                                <Form.Item
                                    label="Telefone"

                                    rules={[
                                        {
                                            required: true,
                                            message: 'Digite o Telefone.',
                                        },
                                    ]}
                                >
                                    <Input
                                        style={{ width: '100%' }}
                                        type="text"
                                        placeholder="Telefone"
                                        tabIndex={4}
                                        onChange={salvarTelefone1}
                                        value={telefone1}
                                        maxLength={11}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    label="Telefone"
                                    rules={[
                                        {
                                            required: false,
                                            message: 'Digite o Telefone.',
                                        },
                                    ]}
                                >
                                    <Input
                                        style={{ width: '100%' }}
                                        type="text"
                                        placeholder="Telefone"
                                        tabIndex={5}
                                        onChange={salvarTelefone2}
                                        value={telefone2}
                                        maxLength={11}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    name="ativo"
                                    label="Ativo?"
                                    rules={[
                                        {
                                            required: false,
                                            message: '',
                                        },
                                    ]}
                                >
                                    <Switch onChange={salvarAtivo} title="Ativo?" tabIndex={6} checked={ativo}/>
                                </Form.Item>
                            </Col>
                        </Row>

                    </Form>
                </Drawer>
            </div>
        </>
    );
    /*************DRAWER *************/
    return (
        <>
            <Layout style={estiloForm}>
                <Typography style={{ paddingBottom: 10, fontSize: 18 }}>Cadastro de Escolas</Typography>
                <div>
                    <Button type="primary" onClick={novaEscola} style={{ width: 150 }} icon={<PlusOutlined />}>
                        Nova Escola
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
                    rowKey={(record) => record.id_escola}
                />

            </Layout>
            {DrawerComponent}
            {/* {openDrawer ? <DrawerCadUsuarios open={openDrawer} mostrarDrawer={onClose} dadosEnvidados={dadosEnviados}/> : null}
            {edit ? <CadUsuarios idusuario={id} nome={nome} /> : null}
            {open ? <CardCadUsuario id={0} nome={nome} ativo={""} open={open} titulo={`Cadastro de usuário ${nome}`} esconderModal={hideModal} /> : null} */}
        </>
    )
}
import { useEffect, useState } from "react";
import { Button, Checkbox, Col, Divider, Form, Input, Layout, Row, Typography } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

const estiloForm = {
    backgroundColor: '#FFFFFF',
}

interface PropsCadUsuario {
    idusuario: number;
    nome: string;
}

export default function CadUsuarios(props: PropsCadUsuario) {
    const [idUsuario, setIdUsuario] = useState(props?.idusuario)
    const [nome, setNome] = useState(props?.nome)

    useEffect(() => {
        setValores()
        setIdUsuario(props.idusuario)
        setNome(props.nome)
    }, []);

    function setValores() {
        let i = props.idusuario
        let x = props.nome
        setIdUsuario(i)
        setNome(x)
    }




    console.log('******** Component CadUsuarios A****************')
    console.log(props)
    console.log('******** Component CadUsuarios B****************')
    return (
        <div>
            <Layout style={estiloForm}>
                <Typography>Cadastro de usuários</Typography>
                <Divider />
                <Input value={nome} />
                <Input value={idUsuario} />
                <Form>
                    <Row gutter={4} style={{ padding: '10px' }}>
                        <Col span={2}>
                            <Form.Item

                                label="ID"
                                name="idUsuario"

                                style={{ marginBottom: '5px' }}
                                rules={[{ required: true }]}>
                                <Input placeholder="ID" name="id" value={idUsuario} maxLength={50} max={50} />
                            </Form.Item>
                        </Col>
                        <Col span={10}>
                            <Form.Item
                                label="Nome"
                                name="nome"
                                style={{ marginBottom: '5px' }}
                                rules={[{ required: true }]}>
                                <Input placeholder="Nome do usuário" value={nome} autoFocus />
                            </Form.Item>
                        </Col>




                    </Row>
                    <Row gutter={4}>
                        <Col span={4}>
                            <Form.Item label="Usuário" name="usuario" rules={[{ max: 10, required: true, message: "Digite o login do usuário(Limite de 10 caracteres)!" }]}>
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col>
                            <Form.Item label="Senha" name="senha" rules={[{ required: true, message: "Digite sua senha!" }]}>
                                <Input.Password
                                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                />
                            </Form.Item>
                        </Col>
                        <Col>
                            <Form.Item label="RepSenha" name="repsenha" rules={[{ required: true, message: "Repita sua senha!" }]}>
                                <Input.Password />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={4} style={{ padding: '10px' }}>
                        <Checkbox>Inativo</Checkbox>
                    </Row>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form>

            </Layout>
        </div>
    )
}
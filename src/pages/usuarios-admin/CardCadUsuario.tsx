import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Card, Col, Form, Input, Modal, Row, Space } from "antd";
import { useEffect, useState } from "react";

interface PropsCadUsuario {
    id: number;
    nome: string;
    ativo: string;
    open: boolean;
    titulo: string;
    esconderModal: () => void;
}

export default function CardCadUsuario(props: PropsCadUsuario) {
    const [id, setIdUsuario] = useState(0)
    const [nome, setNome] = useState('')
    const [open, setOpen] = useState(props.open)

    const gutterPadrao = 2

    const layout = {
        labelCol: { span: 16 },
        wrapperCol: { span: 24 },
        
    };

    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };

    useEffect(() => {
        setNome(props.nome)

    }, [])

    const [form] = Form.useForm();
    const onFinish = (values: any) => {
        console.log(values);
    };

    const onReset = () => {
        form.resetFields();
    };

    const onFill = () => {
        form.setFieldsValue({ note: 'Hello world!', gender: 'male' });
    };



    console.log(props)

    const hideModal = () => {
        setOpen(false);
    }

    const showModal = () => {
        console.log('open modal')
        setOpen(true);
    };

    const handleOk = () => {
        console.log('handleOk')
        setOpen(false);
    };

    const handleCancel = () => {
        console.log('handleCancel')
        setOpen(false);
    };

    //{ xs: 8, sm: 16, md: 24, lg: 32 }
    return (
        <>
            <Space>
                <Modal open={open} onCancel={props.esconderModal} onOk={props.esconderModal} title="Cadastro de usuário" width={1000} >

                        <Form layout="vertical"
                            {...layout}
                            form={form}
                            name="control-hooks"
                            onFinish={onFinish}
                            

                        >
                            <Row gutter={gutterPadrao}>
                                <Col span={2}>
                                    <Form.Item
                                        label="ID"
                                        name="id"
                                        style={{ marginBottom: '5px' }}>
                                        <Input placeholder="ID" readOnly value={nome} maxLength={10} />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Nome" name="nome" rules={[{ required: true, message: "Digite o nome do usuário!" }]}>
                                        <Input value={nome} />
                                    </Form.Item>
                                </Col>
                                
                            </Row>
                            <Row gutter={gutterPadrao}>
                                <Col span={4}>
                                    <Form.Item label="Usuário" name="usuario" rules={[{   max: 10, required: true , message: "Digite o login do usuário(Limite de 10 caracteres)!"}]}>
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
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form>


                </Modal>
                <Button onClick={props.esconderModal} />
            </Space>


        </>

    )

}
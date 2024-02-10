import { LoginOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, Input, Row, Switch, Typography } from "antd";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { UsuarioContext } from "../context/useContext";
import UsuariosService from "../services/UsuarioService";

const service = new UsuariosService();


export default function LoginPage() {
  const navigate = useNavigate()
  /************ user context *************/
  const { nome, setNome } = useContext(UsuarioContext);
  const { logado, setLogado } = useContext(UsuarioContext);
  const { remember, setRemember } = useContext(UsuarioContext);
  const { token, setToken } = useContext(UsuarioContext);
  const { id_empresa, setIdEmpresa } = useContext(UsuarioContext);
  const [senha, setSenha] = useState("");
  const [msg, setMsg] = useState('')
  const [loading, setLoading] = useState(false);
  const [login, setLogin] = useState('')

  //console.log(saveLogin);

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  function salvarUsuario(e: any) {
    setMsg('')
    setLogin(e.target.value);
  }

  function salvarSenha(e: any) {
    setSenha(e.target.value);
  }

  function resetCampos() {
    setNome("");
    setSenha("");
    setToken('');
    setLogin('')
    setMsg('')
    setIdEmpresa(0);
    setRemember(false);
    setLoading(false);
  }

  function salvarLogin() {
    console.log(remember);
    setRemember(!remember);
    console.log(remember);
  }

  const estiloDiv = {
    display: "flex",
    flexdirection: 'column',
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  };

  const estiloCard = {
    width: "300px",
    height: "400px",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
  };

  useEffect(() => {
    //let resp = service.listaUsuarios();
    //let resp2 = UsuarioService.listaUsuarios('usuariosg/1');
    //console.log(resp);
    //console.log(resp2);



    /*const lembrar = localStorage.getItem("logado");
    try {
      if (lembrar) {
        let usuario = localStorage.getItem("usuario");
      }
    } catch (error) {}*/
    // eslint-disable-next-line react-hooks/exhaustive-deps
    //return navigate('/home')
  }, []);

  async function onFinish() {
    console.log("*************** onfinish ************");
    setLoading(true);
    console.log(loading);
    let resp = await service.login(login, senha);

    console.log(resp?.data);
    if (resp) {
      setToken(resp.data.token);
      setIdEmpresa(resp.data.id_empresa);
      setNome(resp.data.nome);
      setLogado(true);
      setRemember(true);
      console.log('id_empresa: ' + resp.data.id_empresa)

      localStorage.setItem("token", resp.data.token);
      localStorage.setItem("nome", nome);
      localStorage.setItem("remember", remember);
      localStorage.setItem("logado", logado);
      localStorage.setItem("id_empresa", id_empresa);

      console.log("Success");
      console.log("remember: " + remember);
      setTimeout(function () {

        setLoading(false);
        console.log("************** function redirecionar ******************");
        setLogado(true);
        console.log(logado);
        if (logado) {
          return navigate('/')
        }
      }, 3000);


    } else {
      setLoading(false);
      localStorage.removeItem("nome");
      localStorage.removeItem("id_empresa");
      localStorage.removeItem("token");
      localStorage.removeItem("remember");
      console.log("Failed");

      setNome('')
      setSenha('')
      setToken('')
      setLogin('')
      setIdEmpresa(0)
      setMsg('Falha de autenticação!')
      setRemember(false)
      setLogado(false)
    }
  }

  return (
    <div id="login_page" style={estiloDiv}>
      <Card
        title="Login do Sistema"
        bordered={true}
        style={{
          width: "350px",
          padding: "0px",
          borderRadius: "5px",
          backgroundColor: "#fff",
          boxShadow: "1px 1px 1px 1px #363333",
        }}
      >
        <Form
          style={{ width: "100%" }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="login"
            label="Usuário"
            rules={[{ required: true, message: "Digite seu usuário!" }]}
          >
            <Row>
              <Col span={24} style={{ width: "100%" }}>
                {/*<label htmlFor="usuario">Username:</label>*/}
                <Input onChange={salvarUsuario} value={login} autoFocus />
              </Col>
            </Row>
          </Form.Item>
          <Form.Item
            label="Senha..."
            name="senha"
            rules={[{ required: true, message: "Digite sua senha!" }]}
          >
            <Row>
              <Col span={24} style={{ width: "100%" }}>
                <Input.Password onChange={salvarSenha} value={senha} />
              </Col>
            </Row>
          </Form.Item>
          <Row style={{ padding: "", justifyContent: "flex-end" }}>
            <Typography style={{ padding: "0px 10px 10px 0px" }}>
              Manter conectado
            </Typography>
            <Switch onChange={salvarLogin} title="Salvar Login" />
          </Row>
          <Form.Item>
            <Row>
              <Col span={48} style={{ width: "100%" }}>
                <Button
                  loading={loading}
                  style={{
                    width: "100%",
                    height: "40px",
                    backgroundColor: "#3282c7",
                    color: "#fff",
                  }}
                  type="primary"
                  htmlType="submit"
                  icon={<LoginOutlined />}
                >
                  {loading ? "Aguarde ..." : "Entrar"}
                </Button>
              </Col>
            </Row>
          </Form.Item>
          <Row>
            <Col span={48} style={{ width: "100%" }}>
              <Button
                style={{
                  width: "100%",
                  height: "40px",
                  backgroundColor: "#dfe187",
                  color: "#000",
                }}
                type="primary"
                htmlType="reset"
                onClick={resetCampos}
              >
                Limpar Campos
              </Button>
            </Col>
          </Row>
        </Form>
        <div style={{ alignContent: 'center', justifyContent: 'center', display: 'flex', marginTop: 10, color: 'red' }}>{msg}</div>
      </Card>
    </div>
  );
}
function _(): void {
  throw new Error("Function not implemented.");
}

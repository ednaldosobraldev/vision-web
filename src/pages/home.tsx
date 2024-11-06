import {
  BarChartOutlined,
  FilePdfOutlined,
  FolderAddOutlined,
  HomeOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme, Image, Row, Typography, Col } from "antd";
import { useContext, useEffect, useState } from "react";
import { Link, Outlet, redirect, useNavigate } from "react-router-dom";
import { UsuarioContext } from "../context/useContext";

const { SubMenu } = Menu;
const { Header, Sider, Content } = Layout;

export default function HomePage() {
  /************ user context *************/
  const navigate = useNavigate()

  const { nome, setNome } = useContext(UsuarioContext);
  const { logado, setLogado } = useContext(UsuarioContext);
  const { remember, setRemember } = useContext(UsuarioContext);
  const { token, setToken } = useContext(UsuarioContext);
  const { id_empresa, setIdEmpresa } = useContext(UsuarioContext);
  const { idUsuario, setIdUsuario } = useContext(UsuarioContext);
  const { idNivel, setIdNIvel } = useContext(UsuarioContext);
  /************ user context *************/

  useEffect(() => {

  })


  const [collapsed, setCollapsed] = useState(true);
  const {
    token: { colorBgContainer },
  } = theme.useToken();



  const logOut = () => {
    // localStorage.removeItem("token");
    // localStorage.removeItem("nome");
    // localStorage.removeItem("remember");
    // localStorage.removeItem("logado");
    // localStorage.removeItem("id_empresa");
    // //localStorage.removeItem("logado");

    setNome("");
    setToken('');
    setIdUsuario(-1)
    setIdNIvel(-1)
    setIdEmpresa(-1);
    setRemember(false);
    setLogado(false)

    return navigate('/login')
    //redirect('/login')
  };

  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ backgroundColor: "#fff" }}
        width="250px"
        theme="light"
      >
        <div
          style={{
            alignItems: "center",
            justifyContent: "center",
            verticalAlign: "middle",
            alignContent: "center",
            flexDirection: "column",
            display: "flex",
          }}
        >
          {collapsed ? (
            <Image
              src="logo_vision.jpg"
              style={{
                width: "60px",
                height: "60px",
              }}
              preview={false}
            />
          ) : (
            <Image
              src="logo_vision.jpg"
              style={{ width: "200px", height: "60px" }}
              preview={false}
            />
          )}
        </div>
        <Menu theme="light" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="dashboard" icon={<BarChartOutlined />}>
            <Link to="/dashboard" className="nav-text" accessKey="c">
              DashBoard
            </Link>
          </Menu.Item>
          <SubMenu
            key="sub-menu-cadastro"
            icon={<FolderAddOutlined />}
            title="Cadastros"
          >
            <SubMenu
              key="sub-menu-cad-usuarios"
              icon={<FolderAddOutlined />}
              title="Usuários(adm)"
            >
              <Menu.Item key="usuarios-admin">
                <Link
                  to="/usuarios-admin"
                  className="nav-text"
                  title="Usuários da administração"
                >
                  Usuários
                </Link>
              </Menu.Item>
            </SubMenu>

            <SubMenu
              key="sub-menu-empresas"
              icon={<FolderAddOutlined />}
              title="Empresas"
            >
              <Menu.Item key="escolas">
                <Link to="/empresas" className="nav-text">
                  Empresas
                </Link>
              </Menu.Item>
            </SubMenu>
          </SubMenu>

          <Menu.Item key="relatorios" icon={<FilePdfOutlined />}>
            <Link to="/relatorios" className="nav-text">
              Relatórios
            </Link>
          </Menu.Item>
          <Menu.Item key="chat" icon={<WhatsAppOutlined />}>
            <Link to="/chat" className="nav-text">
              Chat
            </Link>
          </Menu.Item>
          <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={logOut}>
            <Link to="/login">
              Sair
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Row>

          <Header style={{ padding: 0, background: colorBgContainer, backgroundColor: '#fff', width: '100%', display: 'flex', justifyContent: 'space-between' }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />

            <div style={{ paddingRight: 10 }}>
              Usuário: {nome.toUpperCase()} Nível: {idNivel}
            </div>
          </Header>
        </Row>

        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

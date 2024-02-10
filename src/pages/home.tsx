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
import { useContext, useState } from "react";
import { Link, Outlet, redirect } from "react-router-dom";
import { UsuarioContext } from "../context/useContext";

const { SubMenu } = Menu;
const { Header, Sider, Content } = Layout;

export default function HomePage() {
  const { nome, setNome } = useContext(UsuarioContext);
  const { id_empresa, setIdEmpresa } = useContext(UsuarioContext);
  const { logado, setLogado } = useContext(UsuarioContext);
  const { remember, setRemember } = useContext(UsuarioContext);
  const { token, setToken } = useContext(UsuarioContext);

  const [collapsed, setCollapsed] = useState(true);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("nome");
    localStorage.removeItem("remember");
    localStorage.removeItem("logado");
    localStorage.removeItem("id_empresa");
    //localStorage.removeItem("logado");
    setNome('')
    setToken('');
    setLogado(false);
    setRemember(false);
    setIdEmpresa(0);

    redirect('/login')
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
              src="logo2.png"
              style={{
                width: "50px",
                height: "70px",
              }}
              preview={false}
            />
          ) : (
            <Image
              src="logo.png"
              style={{ width: "200px", height: "70px" }}
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
              key="sub-menu-escolas"
              icon={<FolderAddOutlined />}
              title="Escolas"
            >
              <Menu.Item key="escolas">
                <Link to="/escolas" className="nav-text">
                  Escolas
                </Link>
              </Menu.Item>
              <Menu.Item key="turmas">
                <Link to="/turmas" className="nav-text">
                  Turmas
                </Link>
              </Menu.Item>
              <Menu.Item key="perfilusuariospage">
                <Link
                  to="/perfis"
                  className="nav-text"
                  title="Perfís dos Usuários"
                >
                  Perfis
                </Link>
              </Menu.Item>
              <Menu.Item key="usuarios">
                <Link to="/usuarios" className="nav-text">
                  Usuários
                </Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub-menu-acervo"
              icon={<FolderAddOutlined />}
              title="Acervo"
            >
              <Menu.Item key="acervo-manuais">
                <Link
                  to="/manuais"
                  className="nav-text"
                  title="Manuais para consulta"
                >
                  Manuais
                </Link>
              </Menu.Item>
              <Menu.Item key="acervo-videos">
                <Link
                  to="/videos"
                  className="nav-text"
                  title="Vídeo/Revistas Educativas"
                >
                  Videos
                </Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub-menu-quiz"
              icon={<FolderAddOutlined />}
              title="Quiz"
            >
              <Menu.Item key="quiz">
                <Link to="/quiz" className="nav-text" title="Cadastro de Quiz">
                  Perguntas
                </Link>
              </Menu.Item>
              <Menu.Item key="quiz-niveis">
                <Link to="/niveisquiz" className="nav-text" title="Cadastro de níveis do Quiz">
                  Níveis Quiz
                </Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub-menu-salas-desafio"
              icon={<FolderAddOutlined />}
              title="Salas Desafio"
            >
              <Menu.Item key="salas-desafio">
                <Link to="/salasdesafio" className="nav-text" title="Salas Desafio">
                  Salas
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
              Usuário: {nome.toUpperCase()}
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

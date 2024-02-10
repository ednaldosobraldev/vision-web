import {
    FilePdfOutlined,
    FolderAddOutlined,
    HomeOutlined,
    LogoutOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    WhatsAppOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme, Image } from "antd";
import { useContext, useState } from "react";
import { UsuarioContext } from "../context/useContext";
import { Link } from "react-router-dom";

const { SubMenu } = Menu;
const { Header, Sider, Content } = Layout;

export default function MenuComponent() {

    const { usuario, setUsuario } = useContext(UsuarioContext);
    const { logado, setLogado } = useContext(UsuarioContext);
    const [collapsed, setCollapsed] = useState(true);
    

    const logOut = () => {
        setLogado(false);
    };

    return (
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
                <Menu.Item key="dashboard" icon={<HomeOutlined />}>
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
                        <Menu.Item key="teste">
                            <Link
                                to="/teste"
                                className="nav-text"
                                title="Usuários da administração"
                            >
                                Teste
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
                                to="/perfil"
                                className="nav-text"
                                title="Perfís dos Usuários"
                            >
                                Perfis
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="usuarios-escolas">
                            <Link to="/usuarios-escolas" className="nav-text">
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
                                to="/acervo-manuais"
                                className="nav-text"
                                title="Manuais para consulta"
                            >
                                Manuais
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="acervo-videos">
                            <Link
                                to="/acervo-videos"
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
                        <Menu.Item key="cadastro-quiz">
                            <Link to="/quiz" className="nav-text" title="Cadastro de Quiz">
                                Perguntas
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
                    Sair
                </Menu.Item>
            </Menu>
        </Sider>
    )
}
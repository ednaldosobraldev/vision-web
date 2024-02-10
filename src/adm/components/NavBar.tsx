import { Link } from "react-router-dom"
import {Layout, Menu} from 'antd';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from "@ant-design/icons";

export default function NavBar(){
    return(
        <><nav>
            <Link to="/home">Home</Link>
            <span> </span>
            <Link to="/content">Conteudo</Link>
        </nav>
        <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['1']}
                items={[
                    {
                        key: '1',
                        icon: <UserOutlined />,
                        label: 'nav 1',
                    },
                    {
                        key: '2',
                        icon: <VideoCameraOutlined />,
                        label: 'nav 2',
                    },
                    {
                        key: '3',
                        icon: <UploadOutlined />,
                        label: 'nav 3',
                    },
                ]} />

    
    </>
    )
}

import { StopOutlined } from '@ant-design/icons';
import { Button, Popconfirm } from 'antd';
import { useState } from 'react';

import PopNotificacao from './PopNotificacao';

interface PropsPopUpConfirmarAcaoAtivarInativar {
    titulo: String,
    subTitulo: String,
    idRegistro: number,
    atualizar: Function,
    metodoService: Function,
    title: string
}

export default function PopUpConfirmarAcaoAtivarInativar(props: PropsPopUpConfirmarAcaoAtivarInativar) {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    //const [status, setStatus] = useState('');

    //************* PopNotificacao *****************/
    const [popNotificacao, setPopNotificacao] = useState(false)
    const [tituloNotificacao, setTituloNotificacao] = useState('Ativar/Inativar Perfil')
    const [subTituloNotificacao, setSubTituloNotificacao] = useState('Perfil Ativado/Desativado com sucesso.')
    const [tipoNotificacao, setTipoNotificacao] = useState('success')
    //************* PopNotificacao *****************/

    async function ativarDesativar(id: number) {
        //------------- ativar/desativar registro -----------------
        var rs
        try {
            rs = await props.metodoService(id);
            let x = rs.data.mensagem
            return x;
        } catch (e) {
            setSubTituloNotificacao('Não foi possível atualizar o perfil.')
            setTipoNotificacao('error')
        }
    }
    const showPopconfirm = () => {
        setOpen(true);
    };

    const handleOk = async () => {
        setConfirmLoading(true);

        await ativarDesativar(props.idRegistro)
        setPopNotificacao(true);

        setTimeout(() => {
            props.atualizar()
            setOpen(false);
            setConfirmLoading(false);
        }, 2000);

        setTimeout(() => {
            setPopNotificacao(false);
        }, 5000);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <>
            {popNotificacao ? <PopNotificacao titulo={tituloNotificacao} subTitulo={subTituloNotificacao} tipoNotificacao={tipoNotificacao} /> : null}
            <Popconfirm
                title={props.titulo}
                description={props.subTitulo}
                open={open}
                onConfirm={handleOk}
                okButtonProps={{ loading: confirmLoading }}
                onCancel={handleCancel}
            >
                <Button
                    type="primary"
                    onClick={showPopconfirm}
                    icon={<StopOutlined />}
                    style={{ backgroundColor: '#fff', color: 'orange', marginRight: '5px', borderColor: 'orange' }}
                    title={props.title} />
            </Popconfirm>
        </>
    );
}
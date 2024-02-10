import { DeleteOutlined } from '@ant-design/icons';
import { Button, Popconfirm } from 'antd';
import { useState } from 'react';

import PopNotificacao from './PopNotificacao';


interface PropsPopUpConfirmarAcaoDeletar {
    titulo: String,
    subTitulo: String,
    idRegistro: number,
    atualizar: Function,
    metodoService: Function,
    title: string
}

export default function PopUpConfirmarAcaoDeletar(props: PropsPopUpConfirmarAcaoDeletar) {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [status, setStatus] = useState('');

    //************* PopNotificacao *****************/
    const [popNotificacao, setPopNotificacao] = useState(false)
    const [tituloNotificacao, setTituloNotificacao] = useState('Excluir Perfil')
    const [subTituloNotificacao, setSubTituloNotificacao] = useState('Perfil excluído com sucesso.')
    const [tipoNotificacao, setTipoNotificacao] = useState('success')
    //************* PopNotificacao *****************/

    async function deletarRegistro(id: number) {
        //------------- deletar registro -----------------
        var rs
        try {
            rs = await props.metodoService(id);
            let x = rs.data.mensagem
            setStatus(x)
            return x;
        } catch (e) {
            setSubTituloNotificacao('Não foi possível excluír o perfil.')
            setTipoNotificacao('error')
            setStatus('Ocorreu um erro ao tentar excluír o registro.')
        }
    }
    const showPopconfirm = () => {
        setOpen(true);
    };

    const handleOk = async () => {
        setConfirmLoading(true);

        await deletarRegistro(props.idRegistro);
        setPopNotificacao(true);

        setTimeout(() => {
            props.atualizar(status)
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
                    icon={<DeleteOutlined />}
                    style={{ backgroundColor: '#fff', color: 'red', marginRight: '5px', borderColor: 'red' }}
                    title={props.title} />
            </Popconfirm>
        </>
    );
}
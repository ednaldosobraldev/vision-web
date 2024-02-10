import { Button, Drawer, Radio, Space, RadioChangeEvent } from 'antd';
import type { DrawerProps } from 'antd';
import { useState } from "react";

interface DrawerCadProps {
    mostrarDrawer: () => void
    open: boolean
    dadosEnvidados: any
}

export default function DrawerCadUsuarios(props: DrawerCadProps) {
    const [open, setOpen] = useState(props.open);
    const [placement, setPlacement] = useState<DrawerProps['placement']>('bottom');
    console.log(props)
    const [usuario1, setUsuario1] = useState(props.dadosEnvidados)


    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        console.log('onClose dentro do drawer')
        console.log(open)
        setOpen(false);
        console.log(open)
    };

    const onChange = (e: RadioChangeEvent) => {
        setPlacement(e.target.value);
    };
    return (
        <Drawer
            title="Cadastro de usuários(admin)"
            placement={placement}
            closable={false}
            onClose={onClose}
            open={open}
            key={placement}
        >
            <div style={{width:'500px'}}>

{props.dadosEnvidados.usuario_id}
{props.dadosEnvidados.usuario_nome}
            </div>
            <Button onClick={props.mostrarDrawer}>Close</Button>
        </Drawer>
    )
}
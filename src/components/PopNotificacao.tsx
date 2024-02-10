import { notification } from 'antd';
import { useEffect } from 'react';

interface PropsPopNotificacao {
  titulo: String,
  subTitulo: String,
  tipoNotificacao: String
}

export default function PopNotificacao(props: PropsPopNotificacao) {

  type NotificationType = 'success' | 'info' | 'warning' | 'error';
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    props.tipoNotificacao == 'success' ? openNotificationWithIcon('success')
      : props.tipoNotificacao == 'info' ? openNotificationWithIcon('info')
        : props.tipoNotificacao == 'warning' ? openNotificationWithIcon('warning')
          : openNotificationWithIcon('error')
  }, []);

  const openNotificationWithIcon = (type: NotificationType) => {
    api[type]({
      message: props.titulo,
      description: props.subTitulo,
      placement: 'bottom',
      duration: 5000
    });
  };

  return (
    <>
      {contextHolder}
    </>
  );
};

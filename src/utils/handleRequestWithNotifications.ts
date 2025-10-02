import { notifications } from '@mantine/notifications';
import React from 'react';

type Data = {
  title: string;
  message: string;
};

export const handleRequestWithNotifications = (data: Data) => {
  const notificationId = `request-${Date.now()}`;
  console.log('>>>data: ', data);
  notifications.show({
    id: notificationId,
    title: data.title,
    message: data.message,
    autoClose: 4000,
    withCloseButton: false,
    color: 'red',
    position: 'top-right',
  });
};

"use client"

import React, { useEffect, useState } from 'react';
import { useNotification } from '@/provider/notificationContext';
import styles from './notification.module.css';

const Notification = () => {
  const { notification, hideNotification } = useNotification();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (notification) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => hideNotification(), 500);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [notification, hideNotification]);

  const notificationClasses = `${styles.notification} ${isVisible ? styles.notificationVisible : ''}`;

  return (
    <div className={notificationClasses}>
      {notification}
    </div>
  );
};

export default Notification;

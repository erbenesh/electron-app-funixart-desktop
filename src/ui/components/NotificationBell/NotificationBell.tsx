import { useDeleteNotification, useGetAllNotifications, useGetNotificationCount, useMarkNotificationsAsRead } from '#/api/hooks/useNotification';
import { useUserStore } from '#/auth/store/auth';
import { useRef, useState } from 'react';
import { IoMdNotifications, IoMdNotificationsOutline } from 'react-icons/io';
import { IoClose } from 'react-icons/io5';
import { Button } from 'ui-kit/components/Button/Button';
import { useClickOutside } from '../../hooks/useClickOutside';
import styles from './NotificationBell.module.css';

export const NotificationBell = () => {
    const userStore = useUserStore();
    const [isOpen, setIsOpen] = useState(false);
    
    const { data: notificationCount } = useGetNotificationCount(userStore.token);
    const { data: notifications } = useGetAllNotifications(userStore.token);
    const deleteNotification = useDeleteNotification();
    const markAsRead = useMarkNotificationsAsRead();

    const panelRef = useRef<HTMLDivElement>(null);
    useClickOutside(panelRef, () => setIsOpen(false));

    const handleMarkAsRead = () => {
        if (userStore.token) {
            markAsRead.mutate({ token: userStore.token });
        }
    };

    const handleDeleteNotification = (notificationId: number | string, type: string) => {
        if (userStore.token) {
            deleteNotification.mutate({ 
                notificationId, 
                token: userStore.token,
                type 
            });
        }
    };

    const unreadCount = notificationCount?.count || 0;

    return (
        <div className={styles.notificationBell}>
            <button 
                className={styles.bellButton}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Уведомления"
            >
                {unreadCount > 0 ? (
                    <IoMdNotifications className={styles.bellIcon} />
                ) : (
                    <IoMdNotificationsOutline className={styles.bellIcon} />
                )}
                {unreadCount > 0 && (
                    <span className={styles.badge}>{unreadCount > 99 ? '99+' : unreadCount}</span>
                )}
            </button>
            
            {isOpen && (
                <div className={styles.notificationPanel} ref={panelRef}>
                    <div className={styles.panelHeader}>
                        <h3>Уведомления</h3>
                        {unreadCount > 0 && (
                            <Button 
                                variant="ghost"
                                size="sm"
                                onClick={handleMarkAsRead}
                                disabled={markAsRead.isPending}
                            >
                                Прочитать все
                            </Button>
                        )}
                    </div>
                    
                    <div className={styles.notificationList}>
                        {(notifications?.pages?.flatMap((page: any) => 
                            page.content?.map((notification: any) => notification) || []
                        ) || []).map((notification: any) => (
                            <div 
                                key={notification.id} 
                                className={`${styles.notificationItem} ${!notification.read ? styles.unread : ''}`}
                            >
                                <div className={styles.notificationContent}>
                                    {notification.message || notification.text}
                                </div>
                                <button
                                    onClick={() => handleDeleteNotification(notification.id, notification.type)}
                                    className={styles.deleteButton}
                                    aria-label="Удалить уведомление"
                                >
                                    <IoClose />
                                </button>
                            </div>
                        ))}
                        
                        {(!notifications?.pages || notifications.pages.length === 0 || notifications.pages[0]?.content?.length === 0) && (
                            <div className={styles.emptyState}>
                                Нет уведомлений
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};


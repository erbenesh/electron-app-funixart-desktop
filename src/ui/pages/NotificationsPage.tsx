import { useDeleteNotification, useGetAllNotifications, useMarkNotificationsAsRead } from '#/api/hooks/useNotification'
import { useUserStore } from '#/auth/store/auth'
import { useEffect } from 'react'
import { Button } from 'ui-kit/components/Button/Button'
import { Card } from 'ui-kit/components/Card/Card'
import { IconButton } from 'ui-kit/components/IconButton/IconButton'
import { Spinner } from 'ui-kit/components/Spinner/Spinner'
import { unixToDate } from '../api/utils'
import { useScrollPosition } from '../hooks/useScrollPosition'
import styles from './NotificationsPage.module.css'

export const NotificationsPage = () => {
    const userStore = useUserStore()
    
    const notifications = useGetAllNotifications(userStore.token)
    const deleteNotification = useDeleteNotification()
    const markAsRead = useMarkNotificationsAsRead()

    const scrollPosition = useScrollPosition()

    useEffect(() => {
        if (notifications.isSuccess && !notifications.isFetchingNextPage && scrollPosition >= 90) {
            notifications.fetchNextPage()
        }
    }, [scrollPosition, notifications])

    const handleMarkAsRead = () => {
        if (userStore.token) {
            markAsRead.mutate({ token: userStore.token })
        }
    }

    const handleDeleteNotification = (notificationId: number | string, type: string) => {
        if (userStore.token) {
            deleteNotification.mutate({ 
                notificationId, 
                token: userStore.token,
                type 
            })
        }
    }

    const notificationItems = notifications.data?.pages?.flatMap((page: any) => 
        page.content?.map((notification: any) => notification) || []
    ) || []

    return (
        <div className={styles.notifications_page}>
            <div className={styles.header}>
                <h2 className={styles.section_title}>Уведомления</h2>
                <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={handleMarkAsRead} 
                    disabled={markAsRead.isPending}
                >
                    Отметить все прочитанными
                </Button>
            </div>
            
            {notifications.isLoading ? (
                <div className="loader-container_home">
                    <Spinner />
                </div>
            ) : (
                <div className={styles.notification_list}>
                    {notificationItems.map((notification: any) => (
                        <Card 
                            key={notification.id} 
                            className={styles.notification_item}
                        >
                            <div className={styles.notification_content}>
                                <div className={styles.notification_title}>
                                    {notification.title || 'Уведомление'}
                                </div>
                                <div className={styles.notification_message}>
                                    {notification.message || notification.text || ''}
                                </div>
                                {notification.created_at && (
                                    <div className={styles.notification_date}>
                                        {unixToDate(notification.created_at, 'full')}
                                    </div>
                                )}
                            </div>
                            <IconButton
                                onClick={() => handleDeleteNotification(notification.id, notification.type || '')}
                                className={styles.delete_button}
                            >
                                ×
                            </IconButton>
                        </Card>
                    ))}
                    
                    {notificationItems.length === 0 && (
                        <div className={styles.empty_state}>
                            Нет уведомлений
                        </div>
                    )}
                </div>
            )}

            {notifications.isFetchingNextPage && (
                <div className="loader-container_home">
                    <Spinner />
                </div>
            )}
        </div>
    )
}

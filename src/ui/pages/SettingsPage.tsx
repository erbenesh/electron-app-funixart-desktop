import { useQuery } from '@tanstack/react-query'
import { Card } from 'ui-kit/components/Card/Card'
import { Spinner } from 'ui-kit/components/Spinner/Spinner'
import { profilePreferenceService } from '../api/ProfilePreferenceService'
import { useUserStore } from '../auth/store/auth'
import styles from './SettingsPage.module.css'

export const SettingsPage = () => {
    const userStore = useUserStore()

    const prefs = useQuery({
        queryKey: ['preferences', userStore.token],
        queryFn: () => profilePreferenceService.getMyPreferences(userStore.token!),
        enabled: Boolean(userStore.token)
    })

    return (
        <div className={styles.settings_page}>
            <h2 className={styles.section_title}>Настройки профиля</h2>
            
            {prefs.isLoading ? (
                <div className="loader-container_home">
                    <Spinner />
                </div>
            ) : prefs.data ? (
                <div className={styles.settings_content}>
                    <Card className={styles.preferences_card}>
                        <h3 className={styles.card_title}>Основные настройки</h3>
                        <div className={styles.preferences_info}>
                            <pre className={styles.preferences_json}>{JSON.stringify(prefs.data, null, 2)}</pre>
                        </div>
                    </Card>
                </div>
            ) : (
                <div className={styles.empty_state}>
                    Не удалось загрузить настройки
                </div>
            )}
        </div>
    )
}

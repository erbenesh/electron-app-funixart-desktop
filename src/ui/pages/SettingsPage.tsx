import { useEffect, useState } from 'react';
import { Button } from 'ui-kit/components/Button/Button';
import { Card } from 'ui-kit/components/Card/Card';
import { Input } from 'ui-kit/components/Input/Input';
import { Spinner } from 'ui-kit/components/Spinner/Spinner';
import { TextArea } from 'ui-kit/components/TextArea/TextArea';
import { useGetPreferences, useUpdatePrivacyCounts, useUpdatePrivacyFriendRequests, useUpdatePrivacySocial, useUpdatePrivacyStats, useUpdateSocial, useUpdateStatus, useUpdateTheme } from '../api/hooks';
import { useUserStore } from '../auth/store/auth';
import styles from './SettingsPage.module.css';
import { usePreferencesStore } from '../api/preferences';
import { ALT_URL, BASE_URL } from '../api/endpoints';
import { IoGrid, IoList } from 'react-icons/io5';

export const SettingsPage = () => {
    const userStore = useUserStore();
    const [activeTab, setActiveTab] = useState<'basic' | 'privacy' | 'appearance' | 'network'>('basic');
    const [saveSuccess, setSaveSuccess] = useState(false);

    const prefs = useGetPreferences(userStore.token);
    
    // Form states
    const [formStatus, setFormStatus] = useState("");
    const [formTg, setFormTg] = useState("");
    const [formVk, setFormVk] = useState("");
    const [formIsPrivate, setFormIsPrivate] = useState(false);
    const [formPrivacyStats, setFormPrivacyStats] = useState(0);
    const [formPrivacyCounts, setFormPrivacyCounts] = useState(0);
    const [formPrivacySocial, setFormPrivacySocial] = useState(0);
    const [formPrivacyFriendRequests, setFormPrivacyFriendRequests] = useState(0);
    const [formSelectedTheme, setFormSelectedTheme] = useState(1);

    // Mutations
    const updateStatusMutation = useUpdateStatus(userStore.token);
    const updateSocialMutation = useUpdateSocial(userStore.token);
    const updateThemeMutation = useUpdateTheme(userStore.token);
    const updatePrivacyStatsMutation = useUpdatePrivacyStats(userStore.token);
    const updatePrivacyCountsMutation = useUpdatePrivacyCounts(userStore.token);
    const updatePrivacySocialMutation = useUpdatePrivacySocial(userStore.token);
    const updatePrivacyFriendRequestsMutation = useUpdatePrivacyFriendRequests(userStore.token);

    // Initialize form when data loads
    useEffect(() => {
        if (prefs.data) {
            setFormStatus(prefs.data.status || "");
            setFormTg(prefs.data.tgPage || "");
            setFormVk(prefs.data.vkPage || "");
            setFormIsPrivate(prefs.data.isPrivate || false);
            setFormPrivacyStats(prefs.data.privacy_stats || 0);
            setFormPrivacyCounts(prefs.data.privacy_counts || 0);
            setFormPrivacySocial(prefs.data.privacy_social || 0);
            setFormPrivacyFriendRequests(prefs.data.privacy_friend_requests || 0);
            setFormSelectedTheme(prefs.data.selected_theme_id || 1);
        }
    }, [prefs.data]);
    
    const isLoading = updateStatusMutation.isPending || updateSocialMutation.isPending || updateThemeMutation.isPending || 
                      updatePrivacyStatsMutation.isPending || updatePrivacyCountsMutation.isPending || 
                      updatePrivacySocialMutation.isPending || updatePrivacyFriendRequestsMutation.isPending;

    const handleSaveBasic = async () => {
        setSaveSuccess(false);
        try {
            await updateStatusMutation.mutateAsync({ status: formStatus });
            await updateSocialMutation.mutateAsync({ 
                vk_page: formVk || null,
                tg_page: formTg || null
            });
            setSaveSuccess(true);
            setTimeout(() => setSaveSuccess(false), 2000);
        } catch (error) {
            console.error('Failed to save basic settings:', error);
        }
    };

    const handleSavePrivacy = async () => {
        setSaveSuccess(false);
        try {
            await updatePrivacyStatsMutation.mutateAsync({ privacy: formPrivacyStats });
            await updatePrivacyCountsMutation.mutateAsync({ privacy: formPrivacyCounts });
            await updatePrivacySocialMutation.mutateAsync({ privacy: formPrivacySocial });
            await updatePrivacyFriendRequestsMutation.mutateAsync({ privacy: formPrivacyFriendRequests });
            setSaveSuccess(true);
            setTimeout(() => setSaveSuccess(false), 2000);
        } catch (error) {
            console.error('Failed to save privacy settings:', error);
        }
    };

    const handleSaveAppearance = async () => {
        setSaveSuccess(false);
        try {
            await updateThemeMutation.mutateAsync({ themeId: formSelectedTheme });
            setSaveSuccess(true);
            setTimeout(() => setSaveSuccess(false), 2000);
        } catch (error) {
            console.error('Failed to save appearance settings:', error);
        }
    };

    return (
        <div className={styles.settings_page}>
            <h2 className={styles.section_title}>Настройки профиля</h2>
            
            {prefs.isLoading ? (
                <div className="loader-container_home">
                    <Spinner />
                </div>
            ) : prefs.data ? (
                <div className={styles.settings_content}>
                    <div className={styles.tabs}>
                        <button 
                            className={`${styles.tab} ${activeTab === 'basic' ? styles.tab_active : ''}`}
                            onClick={() => setActiveTab('basic')}
                        >
                            Основные
                        </button>
                        <button 
                            className={`${styles.tab} ${activeTab === 'privacy' ? styles.tab_active : ''}`}
                            onClick={() => setActiveTab('privacy')}
                        >
                            Приватность
                        </button>
                        <button 
                            className={`${styles.tab} ${activeTab === 'appearance' ? styles.tab_active : ''}`}
                            onClick={() => setActiveTab('appearance')}
                        >
                            Внешний вид
                        </button>
                        <button 
                            className={`${styles.tab} ${activeTab === 'network' ? styles.tab_active : ''}`}
                            onClick={() => setActiveTab('network')}
                        >
                            Сеть
                        </button>
                    </div>

                    {activeTab === 'basic' && (
                        <Card className={styles.preferences_card}>
                            <h3 className={styles.card_title}>Основные настройки</h3>
                            <div className={styles.form_group}>
                                <label className={styles.label}>Статус</label>
                                <TextArea 
                                    value={formStatus} 
                                    onChange={(e) => setFormStatus((e.target as HTMLTextAreaElement).value)}
                                    placeholder="Введите статус"
                                    className={styles.input}
                                />
                            </div>
                            <div className={styles.form_group}>
                                <label className={styles.label}>Telegram</label>
                                <Input 
                                    value={formTg} 
                                    onChange={(e) => setFormTg((e.target as HTMLInputElement).value)}
                                    placeholder="username"
                                    className={styles.input}
                                />
                            </div>
                            <div className={styles.form_group}>
                                <label className={styles.label}>VK</label>
                                <Input 
                                    value={formVk} 
                                    onChange={(e) => setFormVk((e.target as HTMLInputElement).value)}
                                    placeholder="vk.com/username"
                                    className={styles.input}
                                />
                            </div>
                            <div className={styles.form_group}>
                                <label className={styles.label}>Приватный профиль</label>
                                <div className={styles.checkbox_group}>
                                    <input 
                                        type="checkbox" 
                                        checked={formIsPrivate}
                                        onChange={(e) => setFormIsPrivate((e.target as HTMLInputElement).checked)}
                                        className={styles.checkbox}
                                    />
                                    <span>Скрыть профиль от других пользователей</span>
                                </div>
                            </div>
                            <Button 
                                className={styles.save_button}
                                onClick={handleSaveBasic}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Сохранение...' : saveSuccess ? 'Сохранено!' : 'Сохранить'}
                            </Button>
                        </Card>
                    )}

                    {activeTab === 'privacy' && (
                        <Card className={styles.preferences_card}>
                            <h3 className={styles.card_title}>Приватность</h3>
                            <div className={styles.form_group}>
                                <label className={styles.label}>Статистика</label>
                                <select 
                                    className={styles.select}
                                    value={formPrivacyStats}
                                    onChange={(e) => setFormPrivacyStats(Number((e.target as HTMLSelectElement).value))}
                                >
                                    <option value="0">Все пользователи</option>
                                    <option value="1">Только друзья</option>
                                    <option value="2">Никто</option>
                                </select>
                            </div>
                            <div className={styles.form_group}>
                                <label className={styles.label}>Счетчики просмотров</label>
                                <select 
                                    className={styles.select}
                                    value={formPrivacyCounts}
                                    onChange={(e) => setFormPrivacyCounts(Number((e.target as HTMLSelectElement).value))}
                                >
                                    <option value="0">Все пользователи</option>
                                    <option value="1">Только друзья</option>
                                    <option value="2">Никто</option>
                                </select>
                            </div>
                            <div className={styles.form_group}>
                                <label className={styles.label}>Социальные страницы</label>
                                <select 
                                    className={styles.select}
                                    value={formPrivacySocial}
                                    onChange={(e) => setFormPrivacySocial(Number((e.target as HTMLSelectElement).value))}
                                >
                                    <option value="0">Все пользователи</option>
                                    <option value="1">Только друзья</option>
                                    <option value="2">Никто</option>
                                </select>
                            </div>
                            <div className={styles.form_group}>
                                <label className={styles.label}>Запросы в друзья</label>
                                <select 
                                    className={styles.select}
                                    value={formPrivacyFriendRequests}
                                    onChange={(e) => setFormPrivacyFriendRequests(Number((e.target as HTMLSelectElement).value))}
                                >
                                    <option value="0">Принимать от всех</option>
                                    <option value="1">Принимать только от друзей друзей</option>
                                    <option value="2">Не принимать</option>
                                </select>
                            </div>
                            <Button 
                                className={styles.save_button}
                                onClick={handleSavePrivacy}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Сохранение...' : saveSuccess ? 'Сохранено!' : 'Сохранить'}
                            </Button>
                        </Card>
                    )}

                    {activeTab === 'appearance' && (
                        <Card className={styles.preferences_card}>
                            <h3 className={styles.card_title}>Внешний вид</h3>
                            <div className={styles.form_group}>
                                <label className={styles.label}>Выберите тему</label>
                                <div className={styles.theme_list}>
                                    {prefs.data.available_themes?.map((theme) => (
                                        <div 
                                            key={theme.id}
                                            className={`${styles.theme_item} ${formSelectedTheme === theme.id ? styles.theme_item_active : ''}`}
                                            onClick={() => setFormSelectedTheme(theme.id)}
                                        >
                                            <input 
                                                type="radio" 
                                                name="theme" 
                                                value={theme.id}
                                                checked={formSelectedTheme === theme.id}
                                                onChange={() => setFormSelectedTheme(theme.id)}
                                                className={styles.radio}
                                            />
                                            <span>{theme.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <LocalAppearanceSettings />
                            <Button 
                                className={styles.save_button}
                                onClick={handleSaveAppearance}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Сохранение...' : saveSuccess ? 'Сохранено!' : 'Сохранить'}
                            </Button>
                        </Card>
                    )}

                    {activeTab === 'network' && (
                        <NetworkSettings />
                    )}
                </div>
            ) : (
                <div className={styles.empty_state}>
                    Не удалось загрузить настройки
                </div>
            )}
        </div>
    );
};

const LocalAppearanceSettings: React.FC = () => {
    const preferences = usePreferencesStore();
    const viewMode = preferences.params.releaseListViewMode || 'list';

    const handleChangeViewMode = (mode: 'grid' | 'list') => {
        preferences.setParams({ releaseListViewMode: mode });
    };

    return (
        <div className={styles.form_group}>
            <label className={styles.label}>Отображение списков</label>
            <p className={styles.help_text}>Выберите как отображать списки релизов в закладках</p>
            <div className={styles.view_mode_options}>
                <button
                    type="button"
                    className={`${styles.view_mode_option} ${viewMode === 'list' ? styles.view_mode_option_active : ''}`}
                    onClick={() => handleChangeViewMode('list')}
                >
                    <IoList size={24} />
                    <span>Список</span>
                    <span className={styles.view_mode_description}>Горизонтальные карточки с описанием</span>
                </button>
                <button
                    type="button"
                    className={`${styles.view_mode_option} ${viewMode === 'grid' ? styles.view_mode_option_active : ''}`}
                    onClick={() => handleChangeViewMode('grid')}
                >
                    <IoGrid size={24} />
                    <span>Галерея</span>
                    <span className={styles.view_mode_description}>Вертикальные карточки сеткой</span>
                </button>
            </div>
        </div>
    );
};

const NetworkSettings: React.FC = () => {
    const preferences = usePreferencesStore();
    const [apiBase, setApiBase] = useState<'primary'|'alt'|'custom'>(preferences.network.apiBase);
    const [customBaseUrl, setCustomBaseUrl] = useState(preferences.network.customBaseUrl);

    const save = () => {
        preferences.setNetwork({ apiBase, customBaseUrl });
    };

    const current = apiBase === 'primary' ? BASE_URL : apiBase === 'alt' ? ALT_URL : customBaseUrl || '—';

    return (
        <Card className={styles.preferences_card}>
            <h3 className={styles.card_title}>Подключение к API</h3>
            <div className={styles.form_group}>
                <label className={styles.label}>Выбор сервера</label>
                <select className={styles.select} value={apiBase} onChange={(e)=>setApiBase((e.target as HTMLSelectElement).value as any)}>
                    <option value="primary">Основной ({BASE_URL})</option>
                    <option value="alt">Альтернативный ({ALT_URL})</option>
                    <option value="custom">Пользовательский</option>
                </select>
            </div>
            {apiBase === 'custom' && (
                <div className={styles.form_group}>
                    <label className={styles.label}>Пользовательский Base URL</label>
                    <div className={styles.inline_row}>
                        <Input value={customBaseUrl} onChange={(e)=>setCustomBaseUrl((e.target as HTMLInputElement).value)} placeholder="https://example.com/" />
                        <Button variant="ghost" onClick={()=>setCustomBaseUrl('')}>Сбросить</Button>
                    </div>
                </div>
            )}
            <div className={styles.form_group}>
                <label className={styles.label}>Текущий сервер</label>
                <div className={styles.input} style={{padding:'.75rem'}}>{current}</div>
            </div>
            <Button className={styles.save_button} onClick={save}>Сохранить</Button>
        </Card>
    );
};

import { useEffect, useState } from 'react';
import { FaInstagram, FaTelegramPlane, FaTiktok, FaVk } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { MdAddLink } from "react-icons/md";
import { SiDiscord } from "react-icons/si";
import { Link, useNavigate, useParams } from 'react-router-dom';
import '../styles/Profile.css';

import { useGetProfile, useGetVotedReleases } from "#/api/hooks";
import { profilePreferenceService } from "#/api/ProfilePreferenceService";
import { sinceUnixDate, unixToDate } from "#/api/utils";
import { useUserStore } from "#/auth/store/auth";
import type { Profile as ProfileType } from "#/types/entities";
import { Avatar } from 'ui-kit/components/Avatar/Avatar';
import { Button } from 'ui-kit/components/Button/Button';
import { Input } from 'ui-kit/components/Input/Input';
import { Modal } from 'ui-kit/components/Modal/Modal';
import { Spinner } from 'ui-kit/components/Spinner/Spinner';
import { TextArea } from 'ui-kit/components/TextArea/TextArea';

export const Profile = () => {

    const authUser = useUserStore();
    const params = useParams();
    const navigate = useNavigate();
    const [ user, setUser ] = useState<ProfileType | null>(null);
    const [ currentVotePage, setCurrentVotePage ] = useState(0);

    const [ totalCount, setTotalCount ] = useState(0);
    const [ chartRefEl, setChartRefEl ] = useState<HTMLCanvasElement | null>(null);

    // Редактирование профиля
    const [ isEditOpen, setIsEditOpen ] = useState(false);
    const [ formStatus, setFormStatus ] = useState("");
    const [ formVk, setFormVk ] = useState("");
    const [ formTg, setFormTg ] = useState("");
    const [ formInst, setFormInst ] = useState("");
    const [ formTt, setFormTt ] = useState("");
    const [ formDiscord, setFormDiscord ] = useState("");
    const [ isSaving, setIsSaving ] = useState(false);
    const [ saveError, setSaveError ] = useState<string | null>(null);
    const [ saveOk, setSaveOk ] = useState(false);

    const requestedId = params.id ?? authUser.user?.id;
    const getProfileData = useGetProfile({ id: requestedId as any, token: authUser.token });
    
    // Загружаем оцененные релизы через API
    const votedReleasesData = useGetVotedReleases({
        profileId: requestedId as any,
        token: authUser.token ?? null,
        page: currentVotePage
    });

    useEffect(() => {
        if (getProfileData?.data) {
            console.log(getProfileData.data)
            const fetchedProfile = getProfileData.data?.profile || null;
            setUser(fetchedProfile);
            const profileData = getProfileData.data?.profile;
            if (profileData) {
                setTotalCount(
                    (profileData.watching_count || 0) + 
                    (profileData.plan_count || 0) + 
                    (profileData.completed_count || 0) + 
                    (profileData.hold_on_count || 0) + 
                    (profileData.dropped_count || 0)
                );
                // Инициализируем форму
                setFormStatus(profileData.status || "");
                setFormVk(profileData.vk_page || "");
                setFormTg(profileData.tg_page || "");
                setFormInst(profileData.inst_page || "");
                setFormTt(profileData.tt_page || "");
                setFormDiscord(profileData.discord_page || "");
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getProfileData?.data, requestedId]);

    // Сброс состояния при смене id
    useEffect(() => {
        setUser(null);
        setCurrentVotePage(0);
    }, [requestedId]);

    // Если открываем /profile без id, редиректим на /profile/:id (мой профиль)
    useEffect(() => {
        if (!params.id && authUser.user?.id) {
            navigate(`/profile/${authUser.user.id}`, { replace: true });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.id, authUser.user?.id]);

    // Инициализация doughnut-чарта через chart.js
    useEffect(() => {
        if (!user || !chartRefEl) return;
        let chart: any;
        (async () => {
            // @ts-ignore - динамический импорт, типы не критичны
            const mod: any = await import('chart.js/auto');
            const ChartCtor = mod?.default || mod?.Chart || mod;

            const watching = user.watching_count || 0;
            const plan = user.plan_count || 0;
            const completed = user.completed_count || 0;
            const hold = user.hold_on_count || 0;
            const dropped = user.dropped_count || 0;
            const data = [watching, plan, completed, hold, dropped];
            const total = data.reduce((a, b) => a + b, 0);

            // Плагин: центрированный текст "Всего: N"
            const centerTextPlugin = {
                id: 'centerText',
                afterDraw(chartInstance: any) {
                    const { ctx } = chartInstance;
                    const { width, height } = chartInstance;
                    ctx.save();
                    ctx.font = '600 14px system-ui, -apple-system, Segoe UI, Roboto';
                    ctx.fillStyle = 'rgba(255,255,255,0.85)';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText('Всего', width / 2, height / 2 - 10);
                    ctx.font = '700 18px system-ui, -apple-system, Segoe UI, Roboto';
                    ctx.fillText(String(total), width / 2, height / 2 + 12);
                    ctx.restore();
                },
            };

            chart = new ChartCtor(chartRefEl, {
                type: 'doughnut',
                data: {
                    labels: ["Смотрю", "В планах", "Просмотрено", "Отложено", "Брошено"],
                    datasets: [{
                        data,
                        backgroundColor: [
                            'rgba(26, 212, 85, 0.9)',
                            'rgba(140, 119, 197, 0.9)',
                            'rgba(91, 93, 207, 0.9)',
                            'rgba(233, 196, 47, 0.9)',
                            'rgba(231, 115, 80, 0.9)'
                        ],
                        hoverBackgroundColor: [
                            'rgba(26, 212, 85, 1)',
                            'rgba(140, 119, 197, 1)',
                            'rgba(91, 93, 207, 1)',
                            'rgba(233, 196, 47, 1)',
                            'rgba(231, 115, 80, 1)'
                        ],
                        borderWidth: 0,
                        borderRadius: 6,
                        spacing: 2,
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false },
                        tooltip: {
                            backgroundColor: 'rgba(30,30,30,0.95)',
                            titleColor: '#fff',
                            bodyColor: 'rgba(255,255,255,0.9)',
                            callbacks: {
                                label: (ctx: any) => {
                                    const value = ctx.raw as number;
                                    const percent = total > 0 ? Math.round(value / total * 100) : 0;
                                    return `${value} (${percent}%)`;
                                }
                            }
                        }
                    },
                    cutout: '62%'
                },
                plugins: [centerTextPlugin]
            });
        })();

        return () => { if (chart) chart.destroy(); };
    }, [user, chartRefEl]);

    if (!user) {
        return (
            <div className="loader-container">
                <Spinner />
            </div>
        );
    }

    // Объединяем все теги/категории для отображения
    const allTags = [
        ...(user.preferred_genres || []),
        ...(user.preferred_themes || []),
        ...(user.preferred_audiences || [])
    ];

    // Определяем есть ли социальные сети
    const hasSocialLinks = Boolean(
        user.vk_page || user.tg_page || user.inst_page || user.tt_page || user.discord_page
    );

    const formatTime = (time: number) => {
        if (!time) return '';
        const minutes = Math.floor(time / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        
        if (days > 0) return `${days} дн.`;
        if (hours > 0) return `${hours} ч.`;
        return `${minutes} мин.`;
    };

    function normalizeSocialUrl(value: string, type: 'vk' | 'tg' | 'inst' | 'tt' | 'discord') {
        if (!value) return '';
        const trim = value.trim();
        const ensureHttp = (url: string) => (/^https?:\/\//i.test(url) ? url : `https://${url}`);
        switch (type) {
            case 'vk':
                return ensureHttp(trim.includes('vk.com') ? trim : `vk.com/${trim.replace(/^@/, '')}`);
            case 'tg':
                if (trim.startsWith('http')) return trim;
                if (trim.startsWith('@')) return `https://t.me/${trim.slice(1)}`;
                return `https://t.me/${trim}`;
            case 'inst':
                return ensureHttp(trim.includes('instagram.com') ? trim : `instagram.com/${trim.replace(/^@/, '')}`);
            case 'tt':
                return ensureHttp(trim.includes('tiktok.com') ? trim : `tiktok.com/@${trim.replace(/^@/, '')}`);
            case 'discord':
                // может быть инвайт или юзернейм
                if (trim.startsWith('http')) return trim;
                return `https://discord.com/users/${trim}`;
        }
    }


    return (
        <div className="profile_page_wrap">
            <div className="profile_page">
                {/* Основная информация профиля */}
                <div className="profile_header_new">
                    {/* Аватар */}
                    <div className="profile_avatar_container section_card">
                        <Avatar 
                            className="profile_avatar" 
                            src={user.avatar} 
                            alt="avatar"
                            style={{ width: '120px', height: '120px', borderRadius: '50%' }}
                        />
                    </div>

                    {/* Имя и бейджи */}
                    <div className="profile_name_section">
                        <div className="profile_name_row">
                            <h1 className="profile_name">{user.login}</h1>
                            <div className="profile_badges">
                                {user.is_verified && (
                                    <span className="badge_verified" title="Верифицирован">
                                        <FaCheck />
                                    </span>
                                )}
                                {user.badge && (
                                    <img 
                                        src={user.badge.image_url} 
                                        alt={user.badge.name}
                                        className="badge_custom"
                                        title={user.badge.name}
                                    />
                                )}
                                {user.rating_score > 0 && (
                                    <span className="rating_badge" title={`Рейтинг: ${user.rating_score}`}>
                                        {user.rating_score}
                                    </span>
                                )}
                                {/* Флаг страны - можно добавить позже */}
                            </div>
                        </div>

                        {/* Статус/био */}
                        {user.status && (
                            <div className="profile_status">
                                <p className="status_text">{user.status}</p>
                            </div>
                        )}

                        {/* Кнопка редактирования своего профиля */}
                        {authUser.user?.id === user.id && (
                            <div style={{display:'flex',gap:'.5rem',flexWrap:'wrap',justifyContent:'center'}}>
                                <Button className="profile_edit_button" type="button" variant="ghost" onClick={() => setIsEditOpen(true)}>
                                    Редактировать профиль
                                </Button>
                                <Button className="profile_edit_button" type="button" variant="ghost" onClick={() => { authUser.logout(); navigate('/auth'); }}>
                                    Выйти
                                </Button>
                            </div>
                        )}

                        {/* Статус онлайн */}
                        <div className="profile_online_status">
                            <span className={`online_indicator ${user.is_online ? 'online' : 'offline'}`}>
                                {user.is_online ? '●' : ''}
                            </span>
                            <span className="online_text">
                                {user.is_online 
                                    ? 'онлайн' 
                                    : `был(а) в сети ${user.last_activity_time ? sinceUnixDate(user.last_activity_time) : 'давно'}`}
                            </span>
                        </div>

                        {/* Теги/категории */}
                        {allTags.length > 0 && (
                            <div className="profile_tags">
                                {allTags.slice(0, 4).map((tag, index) => (
                                    <span key={`${tag.id}-${index}`} className="profile_tag">
                                        <span className="tag_dot" style={{ 
                                            backgroundColor: `hsl(${(index * 60) % 360}, 70%, 60%)` 
                                        }}></span>
                                        {tag.name}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Статистика активности */}
                        <div className="profile_stats_grid">
                            <div className="stat_item">
                                <span className="stat_value">{user.friend_count || 0}</span>
                                <span className="stat_label">друзей</span>
                            </div>
                            <div className="stat_item">
                                <span className="stat_value">{user.collection_count || 0}</span>
                                <span className="stat_label">коллекций</span>
                            </div>
                            <div className="stat_item">
                                <span className="stat_value">{user.comment_count || 0}</span>
                                <span className="stat_label">комментов</span>
                            </div>
                            <div className="stat_item">
                                <span className="stat_value">{user.video_count || 0}</span>
                                <span className="stat_label">видео</span>
                            </div>
                        </div>

                        {/* Социальные сети */}
                        {(hasSocialLinks || authUser.user?.id === user.id) && (
                            <div className="profile_social_links">
                                {user.vk_page && (
                                    <a 
                                        href={normalizeSocialUrl(user.vk_page, 'vk')} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="social_link social_vk"
                                        title="ВКонтакте"
                                    >
                                        <FaVk />
                                    </a>
                                )}
                                {user.tg_page && (
                                    <a 
                                        href={normalizeSocialUrl(user.tg_page, 'tg')} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="social_link social_telegram"
                                        title="Telegram"
                                    >
                                        <FaTelegramPlane />
                                    </a>
                                )}
                                {user.inst_page && (
                                    <a 
                                        href={normalizeSocialUrl(user.inst_page, 'inst')} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="social_link social_instagram"
                                        title="Instagram"
                                    >
                                        <FaInstagram />
                                    </a>
                                )}
                                {user.tt_page && (
                                    <a 
                                        href={normalizeSocialUrl(user.tt_page, 'tt')} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="social_link social_tiktok"
                                        title="TikTok"
                                    >
                                        <FaTiktok />
                                    </a>
                                )}
                                {user.discord_page && (
                                    <a 
                                        href={normalizeSocialUrl(user.discord_page, 'discord')} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="social_link social_discord"
                                        title="Discord"
                                    >
                                        <SiDiscord />
                                    </a>
                                )}
                                {authUser.user?.id === user.id && (
                                    <button 
                                        type="button" 
                                        className="social_link social_add" 
                                        title="Добавить соцсеть"
                                        onClick={() => setIsEditOpen(true)}
                                    >
                                        <MdAddLink className="add_link_ico" />
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                <div className="profile_analytics">
                    <div className="analytics_wrap section_card">
                        <h2 className="analytics_title">Статистика просмотра</h2>

                        <div className="analytics">
                            <div className="analytics_stats">
                                <ul className="total_stats_lists">
                                    <li className="total_state_w">
                                        <span className="total_state_label">Смотрю</span>
                                        <span className="total_state_value">{user.watching_count || 0}</span>
                                        {totalCount > 0 && (
                                            <span className="total_state_percent">
                                                ({Math.round((user.watching_count || 0) / totalCount * 100)}%)
                                            </span>
                                        )}
                                    </li>
                                    <li className="total_state_p">
                                        <span className="total_state_label">В планах</span>
                                        <span className="total_state_value">{user.plan_count || 0}</span>
                                        {totalCount > 0 && (
                                            <span className="total_state_percent">
                                                ({Math.round((user.plan_count || 0) / totalCount * 100)}%)
                                            </span>
                                        )}
                                    </li>
                                    <li className="total_state_v">
                                        <span className="total_state_label">Просмотрено</span>
                                        <span className="total_state_value">{user.completed_count || 0}</span>
                                        {totalCount > 0 && (
                                            <span className="total_state_percent">
                                                ({Math.round((user.completed_count || 0) / totalCount * 100)}%)
                                            </span>
                                        )}
                                    </li>
                                    <li className="total_state_h">
                                        <span className="total_state_label">Отложено</span>
                                        <span className="total_state_value">{user.hold_on_count || 0}</span>
                                        {totalCount > 0 && (
                                            <span className="total_state_percent">
                                                ({Math.round((user.hold_on_count || 0) / totalCount * 100)}%)
                                            </span>
                                        )}
                                    </li>
                                    <li className="total_state_d">
                                        <span className="total_state_label">Брошено</span>
                                        <span className="total_state_value">{user.dropped_count || 0}</span>
                                        {totalCount > 0 && (
                                            <span className="total_state_percent">
                                                ({Math.round((user.dropped_count || 0) / totalCount * 100)}%)
                                            </span>
                                        )}
                                    </li>
                                </ul>
                                <div className="total_stats_viewed">
                                    <div className="stats_viewed_item">
                                        <span className="state_viewed_label">Просмотрено серий:</span>
                                        <span className="total_state_value">{user.watched_episode_count || 0}</span>
                                    </div>
                                    <div className="stats_viewed_item">
                                        <span className="state_viewed_label">Время просмотра:</span>
                                        <span className="total_state_value">{formatTime(user.watched_time || 0)}</span>
                                    </div>
                                    {user.vote > 0 && (
                                        <div className="stats_viewed_item">
                                            <span className="state_viewed_label">Оценено релизов:</span>
                                            <span className="total_state_value">{user.vote}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            {totalCount > 0 && (
                                <div className="analytics_pie_chart_wrap">
                                    <canvas 
                                        className="analytics_pie_chart"
                                        ref={(el) => setChartRefEl(el)}
                                    />
                                    <div className="pie_chart_total">Всего: {totalCount}</div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Модалка редактирования профиля */}
                {isEditOpen && (
                    <Modal 
                        open={isEditOpen} 
                        onClose={() => {
                            if (!isSaving) setIsEditOpen(false);
                        }}
                        title={
                            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:'.75rem'}}>
                                <span>Редактирование профиля</span>
                                {saveOk && <span style={{color:'#26d455',fontSize:12}}>Сохранено</span>}
                            </div>
                        }
                        footer={
                            <div style={{ display:'flex',justifyContent:'flex-end',gap:'.5rem',width:'100%' }}>
                                <Button variant="ghost" onClick={() => !isSaving && setIsEditOpen(false)}>Отмена</Button>
                                <Button 
                                    disabled={isSaving || (!authUser.token)}
                                    onClick={async () => {
                                        setSaveError(null);
                                        setSaveOk(false);
                                        setIsSaving(true);
                                        try {
                                            if (authUser.token) {
                                                await profilePreferenceService.editStatus({ status: formStatus }, authUser.token);
                                                await profilePreferenceService.editSocial({
                                                    vk_page: formVk || null,
                                                    tg_page: formTg || null,
                                                    inst_page: formInst || null,
                                                    tt_page: formTt || null,
                                                    discord_page: formDiscord || null,
                                                } as any, authUser.token);
                                                setUser((prev) => prev ? ({
                                                    ...prev,
                                                    status: formStatus,
                                                    vk_page: formVk || undefined,
                                                    tg_page: formTg || undefined,
                                                    inst_page: formInst || undefined,
                                                    tt_page: formTt || undefined,
                                                    discord_page: formDiscord || undefined,
                                                }) : prev);
                                                setSaveOk(true);
                                                setTimeout(() => setIsEditOpen(false), 600);
                                            }
                                        } catch (e: any) {
                                            console.error(e);
                                            setSaveError('Не удалось сохранить изменения');
                                        } finally {
                                            setIsSaving(false);
                                        }
                                    }}
                                >{isSaving ? 'Сохранение…' : 'Сохранить'}</Button>
                            </div>
                        }
                    >
                        <form 
                            onSubmit={(e) => { e.preventDefault(); }}
                            style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '32rem' }}
                        >
                            <TextArea 
                                placeholder="Статус"
                                value={formStatus}
                                onChange={(e) => setFormStatus((e.target as HTMLTextAreaElement).value)}
                            />
                            <div style={{display:'grid',gridTemplateColumns:'1fr auto',gap:'.5rem',alignItems:'center'}}>
                                <Input placeholder="VK" value={formVk} onChange={(e) => setFormVk((e.target as HTMLInputElement).value)} />
                                {formVk && <a href={normalizeSocialUrl(formVk,'vk')} target="_blank" rel="noopener noreferrer" style={{fontSize:12}}>Открыть</a>}
                            </div>
                            <div style={{display:'grid',gridTemplateColumns:'1fr auto',gap:'.5rem',alignItems:'center'}}>
                                <Input placeholder="Telegram" value={formTg} onChange={(e) => setFormTg((e.target as HTMLInputElement).value)} />
                                {formTg && <a href={normalizeSocialUrl(formTg,'tg')} target="_blank" rel="noopener noreferrer" style={{fontSize:12}}>Открыть</a>}
                            </div>
                            <div style={{display:'grid',gridTemplateColumns:'1fr auto',gap:'.5rem',alignItems:'center'}}>
                                <Input placeholder="Instagram" value={formInst} onChange={(e) => setFormInst((e.target as HTMLInputElement).value)} />
                                {formInst && <a href={normalizeSocialUrl(formInst,'inst')} target="_blank" rel="noopener noreferrer" style={{fontSize:12}}>Открыть</a>}
                            </div>
                            <div style={{display:'grid',gridTemplateColumns:'1fr auto',gap:'.5rem',alignItems:'center'}}>
                                <Input placeholder="TikTok" value={formTt} onChange={(e) => setFormTt((e.target as HTMLInputElement).value)} />
                                {formTt && <a href={normalizeSocialUrl(formTt,'tt')} target="_blank" rel="noopener noreferrer" style={{fontSize:12}}>Открыть</a>}
                            </div>
                            <div style={{display:'grid',gridTemplateColumns:'1fr auto',gap:'.5rem',alignItems:'center'}}>
                                <Input placeholder="Discord" value={formDiscord} onChange={(e) => setFormDiscord((e.target as HTMLInputElement).value)} />
                                {formDiscord && <a href={normalizeSocialUrl(formDiscord,'discord')} target="_blank" rel="noopener noreferrer" style={{fontSize:12}}>Открыть</a>}
                            </div>
                            {saveError && <div style={{color:'#ff6961',fontSize:12}}>{saveError}</div>}
                        </form>
                    </Modal>
                )}

                <div className="profile_releases_votes">
                    <div className="votes_wrap section_card">
                        <div className="votes_wrap_top">
                            <h2 className="analytics_title">Оценки релизов</h2>
                            {votedReleasesData.data?.totalPageCount && votedReleasesData.data.totalPageCount > 1 && (
                                <div className="votes_pagination">
                                    <Button 
                                        className="profile_edit_button" 
                                        type="button" 
                                        variant="ghost"
                                        onClick={() => setCurrentVotePage(prev => Math.max(0, prev - 1))}
                                        disabled={currentVotePage === 0}
                                    >
                                        Назад
                                    </Button>
                                    <span className="votes_page_info">
                                        {votedReleasesData.data.currentPage !== undefined 
                                            ? `${(votedReleasesData.data.currentPage || 0) + 1} / ${votedReleasesData.data.totalPageCount}` 
                                            : ''}
                                    </span>
                                    <Button 
                                        className="profile_edit_button" 
                                        type="button" 
                                        variant="ghost"
                                        onClick={() => setCurrentVotePage(prev => prev + 1)}
                                        disabled={
                                            !votedReleasesData.data?.totalPageCount || 
                                            currentVotePage >= votedReleasesData.data.totalPageCount - 1
                                        }
                                    >
                                        Вперёд
                                    </Button>
                                </div>
                            )}
                        </div>

                        {votedReleasesData.isLoading ? (
                            <div className="votes_loading">
                                <Spinner />
                            </div>
                        ) : (() => {
                            const list = (votedReleasesData.data?.content ?? (votedReleasesData.data as any)?.data?.content ?? user.votes) as any[] | undefined;
                            return Array.isArray(list) && list.length > 0;
                        })() ? (
                            <div className="voted_releases_container">
                                <ul className="voted_releases_list">
                                    {((votedReleasesData.data?.content ?? (votedReleasesData.data as any)?.data?.content ?? user.votes) as any[]).map((voted_release: any) => (
                                        <li className="voted_release" key={voted_release.id}>
                                            <Link 
                                                to={`/release/${voted_release.id}`}
                                                className="voted_release_link"
                                            >
                                                <div className="voted_release_image_wrap">
                                                    <img 
                                                        className="voted_release_image" 
                                                        src={voted_release.image} 
                                                        alt={`${voted_release.title_ru || voted_release.title_original || 'Release'} image`}
                                                        onError={(e) => {
                                                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/80x120';
                                                        }}
                                                    />
                                                </div>

                                                <div className="voted_release_info">
                                                    <p className="voted_release_title">
                                                        {voted_release.title_ru || voted_release.title_original || 'Название релиза'}
                                                    </p>
                                                    <p className="voted_release_vote_rate">
                                                        <span className="vote_stars">
                                                            {'★'.repeat(voted_release.my_vote || voted_release.your_vote || 0)}
                                                            {'☆'.repeat(5 - (voted_release.my_vote || voted_release.your_vote || 0))}
                                                        </span>
                                                        {voted_release.voted_at && (
                                                            <>
                                                                {' • '}
                                                                <span className="vote_date">
                                                                    {unixToDate(voted_release.voted_at, "dayMonthYear")}
                                                                </span>
                                                            </>
                                                        )}
                                                    </p>
                                                    {voted_release.grade && (
                                                        <p className="voted_release_grade">
                                                            Рейтинг: {voted_release.grade.toFixed(1)}
                                                        </p>
                                                    )}
                                                </div>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : (
                            <div className="votes_empty">
                                <p>Нет оцененных релизов</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* История просмотров */}
                {user.history && user.history.length > 0 && (
                    <div className="profile_history">
                    <div className="history_wrap section_card">
                            <div className="history_wrap_top">
                                <h2 className="analytics_title">История просмотров</h2>
                                <Link to="/bookmarks/watching">
                                    <Button className="profile_edit_button" type="button" variant="ghost">
                                        Показать все
                                    </Button>
                                </Link>
                            </div>
                            <div className="history_releases_list">
                                {user.history.slice(0, 5).map(release => (
                                    <Link 
                                        key={release.id}
                                        to={`/release/${release.id}`}
                                        className="history_release_item"
                                    >
                                        <div className="history_release_image_wrap">
                                            <img 
                                                src={release.image} 
                                                alt={release.title_ru || release.title_original}
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/60x90';
                                                }}
                                            />
                                        </div>
                                        <div className="history_release_info">
                                            <p className="history_release_title">
                                                {release.title_ru || release.title_original}
                                            </p>
                                            {release.last_view_episode_name && (
                                                <p className="history_release_episode">
                                                    Последний эпизод: {release.last_view_episode_name}
                                                </p>
                                            )}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Превью друзей */}
                {user.friends_preview && user.friends_preview.length > 0 && (
                    <div className="profile_friends_preview">
                    <div className="friends_wrap section_card">
                            <div className="friends_wrap_top">
                                <h2 className="analytics_title">Друзья</h2>
                                <Link to="/friends">
                                    <Button className="profile_edit_button" type="button" variant="ghost">
                                        Показать всех
                                    </Button>
                                </Link>
                            </div>
                            <div className="friends_preview_list">
                                {user.friends_preview.slice(0, 6).map(friend => (
                                    <Link 
                                        key={friend.id}
                                        to={`/profile/${friend.id}`}
                                        className="friend_preview_item"
                                    >
                                        <Avatar 
                                            src={friend.avatar} 
                                            alt={friend.login}
                                            size="sm"
                                        />
                                        <span className="friend_login">{friend.login}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Превью коллекций */}
                {user.collections_preview && user.collections_preview.length > 0 && (
                    <div className="profile_collections_preview">
                    <div className="collections_wrap section_card">
                            <div className="collections_wrap_top">
                                <h2 className="analytics_title">Коллекции</h2>
                                <Link to="/collections">
                                    <Button className="profile_edit_button" type="button" variant="ghost">
                                        Показать все
                                    </Button>
                                </Link>
                            </div>
                            <div className="collections_preview_list">
                                {user.collections_preview.slice(0, 4).map(collection => (
                                    <Link 
                                        key={collection.id}
                                        to={`/collection/${collection.id}`}
                                        className="collection_preview_item"
                                    >
                                        <div className="collection_preview_image">
                                            <img 
                                                src={collection.image} 
                                                alt={collection.title}
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/120x160';
                                                }}
                                            />
                                        </div>
                                        <p className="collection_preview_title">{collection.title}</p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
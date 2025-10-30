import { skipToken, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from 'ui-kit/components/Button/Button';
import { Input } from 'ui-kit/components/Input/Input';
import { Spinner } from 'ui-kit/components/Spinner/Spinner';
import { profileService } from '../../api/ProfileService';
import { setJWT } from '../../api/utils';
import { buildGoogleOAuthUrl, buildVkOAuthUrl } from '../../config/oauth';
import { useUserStore } from '../store/auth';
import styles from '../styles/AuthPage.module.css';

export const AuthPage = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [remember, setRemember] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [hint, setHint] = useState<string | null>(null);
    // Restore flow
    const [restoreHash, setRestoreHash] = useState<string | null>(null);
    const [restoreCode, setRestoreCode] = useState("");
    const [newPassword, setNewPassword] = useState("");
    // Sign-up verify flow
    const [signUpHash, setSignUpHash] = useState<string | null>(null);
    const [verifyCode, setVerifyCode] = useState("");
    const userStore = useUserStore();
    const location = useLocation();
    const navigate = useNavigate();

    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchLoginData = useQuery({
        queryKey: ['auth', login, password, isSubmitting],
        queryFn: isSubmitting ? () => profileService.postSubmitLogin(login, password) : skipToken,
        enabled: isSubmitting,
    });

    // Handle successful login
    useEffect(() => {
        if (isSubmitting && fetchLoginData.status === "success") {
            const data = fetchLoginData.data;

            if (data?.profile && data?.profileToken?.token) {
                userStore.login(data.profile, data.profileToken.token);
                if (remember) {
                    setJWT(data.profile.id, data.profileToken.token);
                }
                setError(null);
            } else {
                setError("Неверный логин или пароль");
            }
            setIsSubmitting(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSubmitting, fetchLoginData.status, fetchLoginData.data, remember]);

    // Handle error
    useEffect(() => {
        if (isSubmitting && fetchLoginData.status === "error") {
            setError("Произошла ошибка при входе. Попробуйте еще раз.");
            setIsSubmitting(false);
        }
    }, [isSubmitting, fetchLoginData.status, fetchLoginData.error]);

    const mode: 'sign-in' | 'sign-up' | 'restore' =
        location.pathname.includes('sign-up') ? 'sign-up' : location.pathname.includes('restore') ? 'restore' : 'sign-in';

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError(null);
        setHint(null);

        // Inline validation
        if (!login.trim()) {
            setError('Укажите логин');
            return;
        }
        if (mode !== 'restore' && password.length < 8) {
            setError('Пароль должен быть не менее 8 символов');
            return;
        }
        if (mode !== 'sign-in' && email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError('Некорректный формат email');
            return;
        }

        const doSubmit = async () => {
            try {
                if (mode === 'sign-in') {
                    setIsSubmitting(true);
                    return;
                }
                if (mode === 'sign-up') {
                    if (!signUpHash) {
                        const data = await profileService.signUp({ login, email, password });
                        if (data?.hash) {
                            setSignUpHash(data.hash);
                            setHint('Мы отправили код подтверждения на почту. Введите код ниже.');
                        }
                    } else {
                        const data = await profileService.verify({ login, email, password, hash: signUpHash, code: verifyCode });
                        if (data?.profile && data?.profileToken?.token) {
                            userStore.login(data.profile, data.profileToken.token);
                        }
                    }
                    return;
                }
                if (mode === 'restore') {
                    if (!restoreHash) {
                        const data = await profileService.restore({ data: login });
                        if (data?.hash) {
                            setRestoreHash(data.hash);
                            setHint('Код отправлен. Введите код и новый пароль.');
                        }
                    } else {
                        if (newPassword.length < 8) {
                            setError('Новый пароль должен быть не менее 8 символов');
                            return;
                        }
                        const data = await profileService.restoreVerify({
                            data: login,
                            password: newPassword,
                            hash: restoreHash,
                            code: restoreCode,
                        });
                        if (data?.profile && data?.profileToken?.token) {
                            userStore.login(data.profile, data.profileToken.token);
                        }
                    }
                }
            } catch (e) {
                setError('Произошла ошибка. Попробуйте ещё раз.');
            }
        };
        doSubmit();
    }

    const isLoading = isSubmitting && fetchLoginData.status === "pending";

    function goToSignUp(e: React.MouseEvent) {
        e.preventDefault();
        navigate('/auth/sign-up');
    }
    function goToRestore(e: React.MouseEvent) {
        e.preventDefault();
        navigate('/auth/restore');
    }
    function goToSignIn(e: React.MouseEvent) {
        e.preventDefault();
        navigate('/auth');
    }

    // OAuth quick handler: expects provider token in query params after external flow
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const googleIdToken = params.get('googleIdToken');
        const vkAccessToken = params.get('vkAccessToken');
        const doOAuth = async () => {
            try {
                if (googleIdToken) {
                    const data = await profileService.signInWithGoogle({ googleIdToken });
                    if (data?.profile && data?.profileToken?.token) {
                        userStore.login(data.profile, data.profileToken.token);
                    }
                } else if (vkAccessToken) {
                    const data = await profileService.signInWithVk({ vkAccessToken });
                    if (data?.profile && data?.profileToken?.token) {
                        userStore.login(data.profile, data.profileToken.token);
                    }
                }
            } catch (e) {
                setError('Не удалось выполнить вход через OAuth');
            }
        };
        if (googleIdToken || vkAccessToken) doOAuth();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <section className={styles.auth_page_wrap}>
            <div className={styles.auth_page}>
                <div className={styles.brand_side}>
                    <div className={styles.brand_card}>
                        <img className={styles.brand_logo_img} src={"/src/ui/assets/icons/logo.svg"} alt="Anixart" />
                        <div className={styles.brand_text}>Anixart</div>
                        <p className={styles.brand_caption}>Смотри аниме. Общайся. Оставайся собой.</p>
                    </div>
                </div>
                <div className={styles.auth_content}>
                    <h1 className={styles.auth_title}>
                        {mode === 'sign-in' && 'Вход в Anixart'}
                        {mode === 'sign-up' && 'Регистрация'}
                        {mode === 'restore' && 'Восстановление доступа'}
                    </h1>
                    <p className={styles.auth_subtitle}>
                        {mode === 'sign-in' && 'Добро пожаловать обратно'}
                        {mode === 'sign-up' && 'Создайте новый аккаунт'}
                        {mode === 'restore' && 'Введите данные для восстановления'}
                    </p>

                    <form className={styles.auth_form} onSubmit={handleSubmit}>
                        {error && (
                            <div className={styles.error_message}>
                                {error}
                            </div>
                        )}
                        {hint && (
                            <div className={styles.hint_message}>{hint}</div>
                        )}

                        <div className={styles.form_group}>
                            <label htmlFor="login" className={styles.label}>
                                Логин или email
                            </label>
                            <Input
                                type="text"
                                id="login"
                                placeholder="Ваш логин или email"
                                value={login}
                                onChange={(e) => setLogin(e.target.value)}
                                required
                                disabled={isLoading}
                                autoComplete="username"
                            />
                        </div>

                        {mode !== 'restore' && (
                            <div className={styles.form_group}>
                                <label htmlFor="password" className={styles.label}>
                                    Пароль
                                </label>
                                <div className={styles.password_field}>
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        placeholder="Введите пароль"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        disabled={isLoading}
                                        autoComplete={mode === 'sign-in' ? "current-password" : "new-password"}
                                    />
                                    <button
                                        type="button"
                                        className={styles.password_toggle}
                                        aria-label={showPassword ? "Скрыть пароль" : "Показать пароль"}
                                        onClick={() => setShowPassword((v) => !v)}
                                        disabled={isLoading}
                                    >
                                        {showPassword ? "Скрыть" : "Показать"}
                                    </button>
                                </div>
                                <div className={styles.field_hint}>Минимум 8 символов</div>
                            </div>
                        )}

                        {mode === 'sign-up' && (
                            <div className={styles.form_group}>
                                <label htmlFor="email" className={styles.label}>Email</label>
                                <Input
                                    type="email"
                                    id="email"
                                    placeholder="Введите email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={isLoading}
                                    autoComplete="email"
                                />
                            </div>
                        )}

                        {mode === 'restore' && restoreHash && (
                            <>
                                <div className={styles.form_group}>
                                    <label htmlFor="restore_code" className={styles.label}>Код из письма</label>
                                    <Input id="restore_code" value={restoreCode} onChange={(e)=>setRestoreCode(e.target.value)} placeholder="Введите код" />
                                </div>
                                <div className={styles.form_group}>
                                    <label htmlFor="new_password" className={styles.label}>Новый пароль</label>
                                    <div className={styles.password_field}>
                                        <Input id="new_password" type={showPassword ? 'text':'password'} value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} placeholder="Введите новый пароль" />
                                    </div>
                                    <div className={styles.field_hint}>Минимум 8 символов</div>
                                </div>
                            </>
                        )}

                        {mode === 'sign-up' && signUpHash && (
                            <>
                                <div className={styles.form_group}>
                                    <label htmlFor="verify_code" className={styles.label}>Код подтверждения</label>
                                    <Input id="verify_code" value={verifyCode} onChange={(e)=>setVerifyCode(e.target.value)} placeholder="Введите код" />
                                    <div className={styles.field_inline_row}>
                                        <button
                                            type="button"
                                            className={styles.link_like}
                                            onClick={async ()=>{
                                                try {
                                                    await profileService.resend({ login, email, password, hash: signUpHash! });
                                                    setHint('Код повторно отправлен. Проверьте почту.');
                                                } catch {
                                                    setError('Не удалось отправить код');
                                                }
                                            }}
                                        >Отправить код ещё раз</button>
                                    </div>
                                </div>
                            </>
                        )}

                        <div className={styles.options}>
                            <label className={styles.checkbox_label}>
                                <input
                                    type="checkbox"
                                    checked={remember}
                                    onChange={(e) => setRemember(e.target.checked)}
                                    disabled={isLoading}
                                    className={styles.checkbox}
                                />
                                <span>Запомнить меня</span>
                            </label>
                            {mode === 'sign-in' ? (
                                <a className={styles.helper_link} href="#" onClick={goToRestore}>
                                    Забыли пароль?
                                </a>
                            ) : (
                                <a className={styles.helper_link} href="#" onClick={goToSignIn}>
                                    Войти
                                </a>
                            )}
                        </div>

                        <Button
                            type="submit"
                            variant="primary"
                            disabled={
                                isLoading || !login ||
                                (mode === 'sign-in' && !password) ||
                                (mode === 'sign-up' && (!email || (!signUpHash ? !password : !verifyCode))) ||
                                (mode === 'restore' && (restoreHash ? (!restoreCode || !newPassword) : false))
                            }
                            className={styles.submit_button}
                        >
                            {isLoading ? (
                                <>
                                    <Spinner />
                                    {mode === 'sign-in' ? 'Вход...' : mode === 'sign-up' ? 'Создание...' : 'Отправка...'}
                                </>
                            ) : (
                                mode === 'sign-in' ? 'Войти' : mode === 'sign-up' ? (signUpHash ? 'Подтвердить' : 'Зарегистрироваться') : (restoreHash ? 'Сменить пароль' : 'Отправить код')
                            )}
                        </Button>

                        {mode === 'sign-in' && (
                            <>
                                <div className={styles.oauth_wrap}>
                                    <div className={styles.oauth_divider}><span>или</span></div>
                                    <div className={styles.oauth_buttons}>
                                        <button type="button" className={`${styles.oauth_btn} ${styles.google}`} onClick={() => window.location.assign(buildGoogleOAuthUrl())}>Google</button>
                                        <button type="button" className={`${styles.oauth_btn} ${styles.vk}`} onClick={() => window.location.assign(buildVkOAuthUrl())}>VK</button>
                                    </div>
                                </div>
                                <div className={styles.footer_hint}>
                                    Нет аккаунта? <a href="#" onClick={goToSignUp}>Зарегистрироваться</a>
                                </div>
                            </>
                        )}
                    </form>
                </div>
            </div>
        </section>
    );
};
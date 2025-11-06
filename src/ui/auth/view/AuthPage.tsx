import { skipToken, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from 'ui-kit/components/Button/Button';
import { Input } from 'ui-kit/components/Input/Input';
import { Spinner } from 'ui-kit/components/Spinner/Spinner';
import { authService } from '../../api/AuthService';
import { setJWT } from '../../api/utils';
import { buildGoogleOAuthUrl, buildVkOAuthUrl } from '../../config/oauth';
import { useUserStore } from '../store/auth';
import styles from '../styles/AuthPage.module.css';
import { ResponseCode } from '../../api/types/responses';

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
    // OAuth flow
    const [oauthToken, setOauthToken] = useState<string | null>(null);
    const [oauthProvider, setOauthProvider] = useState<'google' | 'vk' | null>(null);
    const [oauthMode, setOauthMode] = useState<'sign-in' | 'sign-up' | null>(null);
    const userStore = useUserStore();
    const location = useLocation();
    const navigate = useNavigate();

    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchLoginData = useQuery({
        queryKey: ['auth', login, password, isSubmitting],
        queryFn: isSubmitting ? () => authService.signIn({ login, password }) : skipToken,
        enabled: isSubmitting,
    });

    // Handle successful login
    useEffect(() => {
        if (isSubmitting && fetchLoginData.status === "success") {
            const data = fetchLoginData.data;

            if (data?.code === ResponseCode.SUCCESSFUL && data?.profile && data?.profileToken?.token) {
                userStore.login(data.profile, data.profileToken.token);
                if (remember) {
                    setJWT(data.profile.id, data.profileToken.token);
                }
                setError(null);
            } else {
                // Handle error codes from API
                switch (data?.code) {
                    case ResponseCode.INVALID_LOGIN:
                        setError("Неверный логин");
                        break;
                    case ResponseCode.INVALID_PASSWORD:
                        setError("Неверный пароль");
                        break;
                    case ResponseCode.BANNED:
                        setError("Ваш аккаунт временно заблокирован");
                        break;
                    case ResponseCode.PERM_BANNED:
                        setError("Ваш аккаунт заблокирован");
                        break;
                    default:
                        setError("Неверный логин или пароль");
                }
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
        if (mode === 'sign-up' && !email.trim()) {
            setError('Укажите email');
            return;
        }
        if (mode === 'sign-up' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError('Некорректный формат email');
            return;
        }
        // Skip password validation for OAuth registration
        if (mode !== 'restore' && !oauthToken && password.length < 8) {
            setError('Пароль должен быть не менее 8 символов');
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
                        // Check if this is OAuth registration
                        if (oauthToken && oauthProvider) {
                            // OAuth registration - use token instead of password
                            let data;
                            if (oauthProvider === 'google') {
                                data = await authService.signUpWithGoogle({ login, email, googleIdToken: oauthToken });
                            } else {
                                data = await authService.signUpWithVk({ login, email, vkAccessToken: oauthToken });
                            }
                            
                            if (data?.code === ResponseCode.SUCCESSFUL && data?.hash) {
                                setSignUpHash(data.hash);
                                setHint(`Мы отправили код подтверждения на ${email}. Введите код ниже.`);
                            } else {
                                // Handle sign-up errors
                                switch (data?.code) {
                                    case ResponseCode.INVALID_LOGIN:
                                        setError("Неверный формат логина");
                                        break;
                                    case ResponseCode.INVALID_EMAIL:
                                        setError("Неверный формат email");
                                        break;
                                    case ResponseCode.LOGIN_ALREADY_TAKEN:
                                        setError("Этот логин уже занят");
                                        break;
                                    case ResponseCode.EMAIL_ALREADY_TAKEN:
                                        setError("Этот email уже используется");
                                        break;
                                    default:
                                        setError(`Не удалось зарегистрироваться через ${oauthProvider === 'google' ? 'Google' : 'VK'}`);
                                }
                            }
                        } else {
                            // Regular registration with password
                            const data = await authService.signUp({ login, email, password });
                            if (data?.code === ResponseCode.SUCCESSFUL && data?.hash) {
                                setSignUpHash(data.hash);
                                setHint('Мы отправили код подтверждения на почту. Введите код ниже.');
                            } else {
                                // Handle sign-up errors
                                switch (data?.code) {
                                    case ResponseCode.INVALID_LOGIN:
                                        setError("Неверный формат логина");
                                        break;
                                    case ResponseCode.INVALID_EMAIL:
                                        setError("Неверный формат email");
                                        break;
                                    case ResponseCode.INVALID_PASSWORD:
                                        setError("Слишком простой пароль");
                                        break;
                                    case ResponseCode.LOGIN_ALREADY_TAKEN:
                                        setError("Этот логин уже занят");
                                        break;
                                    case ResponseCode.EMAIL_ALREADY_TAKEN:
                                        setError("Этот email уже используется");
                                        break;
                                    case ResponseCode.EMAIL_SERVICE_DISALLOWED:
                                        setError("Этот email-сервис не поддерживается");
                                        break;
                                    case ResponseCode.TOO_MANY_REGISTRATIONS:
                                        setError("Слишком много попыток регистрации. Попробуйте позже");
                                        break;
                                    default:
                                        setError("Не удалось зарегистрироваться. Попробуйте еще раз");
                                }
                            }
                        }
                    } else {
                        // Verification step - same for both OAuth and regular
                        const data = await authService.verify({ 
                            login, 
                            email, 
                            password: oauthToken || password, // Use OAuth token if available
                            hash: signUpHash, 
                            code: verifyCode,
                            ...(oauthProvider === 'google' && oauthToken ? { googleIdToken: oauthToken } : {}),
                            ...(oauthProvider === 'vk' && oauthToken ? { vkAccessToken: oauthToken } : {})
                        });
                        if (data?.code === ResponseCode.SUCCESSFUL && data?.profile && data?.profileToken?.token) {
                            userStore.login(data.profile, data.profileToken.token);
                            if (remember) {
                                setJWT(data.profile.id, data.profileToken.token);
                            }
                            // Clear OAuth state
                            setOauthToken(null);
                            setOauthProvider(null);
                            setOauthMode(null);
                        } else {
                            setError("Неверный код подтверждения");
                        }
                    }
                    return;
                }
                if (mode === 'restore') {
                    if (!restoreHash) {
                        const data = await authService.restore({ data: login });
                        if (data?.code === ResponseCode.SUCCESSFUL && data?.hash) {
                            setRestoreHash(data.hash);
                            setHint('Код отправлен. Введите код и новый пароль.');
                        } else {
                            setError('Не удалось отправить код восстановления. Проверьте логин или email');
                        }
                    } else {
                        if (newPassword.length < 8) {
                            setError('Новый пароль должен быть не менее 8 символов');
                            return;
                        }
                        const data = await authService.restoreVerify({
                            data: login,
                            password: newPassword,
                            hash: restoreHash,
                            code: restoreCode,
                        });
                        if (data?.code === ResponseCode.SUCCESSFUL && data?.profile && data?.profileToken?.token) {
                            userStore.login(data.profile, data.profileToken.token);
                            if (remember) {
                                setJWT(data.profile.id, data.profileToken.token);
                            }
                        } else {
                            setError('Неверный код или пароль не прошел проверку');
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

    // OAuth handler: processes tokens from fragment (#) after OAuth redirect
    useEffect(() => {
        // OAuth providers return tokens in fragment (#), not query (?)
        const hash = location.hash.substring(1); // Remove '#'
        const hashParams = new URLSearchParams(hash);
        
        // Also check query params as fallback
        const queryParams = new URLSearchParams(location.search);
        
        // Google OAuth returns id_token
        const googleIdToken = hashParams.get('id_token') || queryParams.get('googleIdToken');
        
        // VK OAuth returns access_token
        const vkAccessToken = hashParams.get('access_token') || queryParams.get('vkAccessToken');
        
        // Check for OAuth state to determine mode (sign-in or sign-up)
        const oauthState = hashParams.get('state') || queryParams.get('state') || 'sign-in';
        const isSignUp = oauthState.includes('sign-up');
        
        // Check for OAuth errors
        const oauthError = hashParams.get('error') || queryParams.get('error');
        const oauthErrorDescription = hashParams.get('error_description') || queryParams.get('error_description');
        
        if (oauthError) {
            setError(`Ошибка OAuth: ${oauthErrorDescription || oauthError}`);
            // Clear hash to prevent error from persisting
            window.history.replaceState(null, '', location.pathname + location.search);
            return;
        }
        
        const doOAuth = async () => {
            try {
                if (googleIdToken) {
                    if (isSignUp) {
                        // Sign up flow - save token and show form to enter login
                        setOauthToken(googleIdToken);
                        setOauthProvider('google');
                        setOauthMode('sign-up');
                        navigate('/auth/sign-up');
                        setHint('Введите логин для завершения регистрации через Google');
                        // Clear hash
                        window.history.replaceState(null, '', location.pathname + location.search);
                    } else {
                        // Sign in flow - direct login
                        const data = await authService.signInWithGoogle({ googleIdToken });
                        if (data?.code === ResponseCode.SUCCESSFUL && data?.profile && data?.profileToken?.token) {
                            userStore.login(data.profile, data.profileToken.token);
                            if (remember) {
                                setJWT(data.profile.id, data.profileToken.token);
                            }
                            // Clear hash and navigate
                            window.history.replaceState(null, '', '/');
                            navigate('/');
                        } else {
                            handleOAuthError(data?.code, 'Google');
                        }
                    }
                } else if (vkAccessToken) {
                    if (isSignUp) {
                        // Sign up flow - save token and show form to enter login
                        setOauthToken(vkAccessToken);
                        setOauthProvider('vk');
                        setOauthMode('sign-up');
                        navigate('/auth/sign-up');
                        setHint('Введите логин для завершения регистрации через VK');
                        // Clear hash
                        window.history.replaceState(null, '', location.pathname + location.search);
                    } else {
                        // Sign in flow - direct login
                        const data = await authService.signInWithVk({ vkAccessToken });
                        if (data?.code === ResponseCode.SUCCESSFUL && data?.profile && data?.profileToken?.token) {
                            userStore.login(data.profile, data.profileToken.token);
                            if (remember) {
                                setJWT(data.profile.id, data.profileToken.token);
                            }
                            // Clear hash and navigate
                            window.history.replaceState(null, '', '/');
                            navigate('/');
                        } else {
                            handleOAuthError(data?.code, 'VK');
                        }
                    }
                }
            } catch (e) {
                const errorMessage = e instanceof Error ? e.message : 'Неизвестная ошибка';
                setError(`Не удалось выполнить вход через OAuth: ${errorMessage}`);
            }
        };
        
        if (googleIdToken || vkAccessToken) {
            doOAuth();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.hash, location.search]);
    
    // Helper function to handle OAuth errors
    function handleOAuthError(code: number | undefined, provider: string) {
        switch (code) {
            case ResponseCode.INVALID_LOGIN:
                setError(`${provider}: Неверный формат логина`);
                break;
            case ResponseCode.INVALID_EMAIL:
                setError(`${provider}: Неверный формат email`);
                break;
            case ResponseCode.LOGIN_ALREADY_TAKEN:
                setError(`${provider}: Этот логин уже занят`);
                break;
            case ResponseCode.EMAIL_ALREADY_TAKEN:
                setError(`${provider}: Этот email уже используется`);
                break;
            default:
                setError(`Не удалось выполнить вход через ${provider}`);
        }
        // Clear hash
        window.history.replaceState(null, '', location.pathname);
    }

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
                        {mode === 'sign-up' && (oauthProvider ? `Регистрация через ${oauthProvider === 'google' ? 'Google' : 'VK'}` : 'Регистрация')}
                        {mode === 'restore' && 'Восстановление доступа'}
                    </h1>
                    <p className={styles.auth_subtitle}>
                        {mode === 'sign-in' && 'Добро пожаловать обратно'}
                        {mode === 'sign-up' && (oauthProvider ? 'Завершите регистрацию, указав логин' : 'Создайте новый аккаунт')}
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
                                {mode === 'sign-up' ? 'Логин' : 'Логин или email'}
                            </label>
                            <Input
                                type="text"
                                id="login"
                                placeholder={mode === 'sign-up' ? 'Введите логин' : 'Ваш логин или email'}
                                value={login}
                                onChange={(e) => setLogin(e.target.value)}
                                required
                                disabled={isLoading}
                                autoComplete="username"
                            />
                        </div>

                        {mode === 'sign-up' && (
                            <div className={styles.form_group}>
                                <label htmlFor="email" className={styles.label}>Email *</label>
                                <Input
                                    type="email"
                                    id="email"
                                    placeholder="Введите email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    disabled={isLoading}
                                    autoComplete="email"
                                />
                            </div>
                        )}

                        {mode !== 'restore' && !oauthToken && (
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
                                                    const data = await authService.resend({ login, email, password, hash: signUpHash! });
                                                    if (data?.code === ResponseCode.SUCCESSFUL) {
                                                        setHint('Код повторно отправлен. Проверьте почту.');
                                                    } else if (data?.code === ResponseCode.CODE_ALREADY_SEND) {
                                                        setError('Код уже был отправлен. Подождите немного');
                                                    } else {
                                                        setError('Не удалось отправить код');
                                                    }
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
                                (mode === 'sign-up' && (!email || (!signUpHash ? (!oauthToken && !password) : !verifyCode))) ||
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

                        {(mode === 'sign-in' || mode === 'sign-up') && !signUpHash && (
                            <>
                                <div className={styles.oauth_wrap}>
                                    <div className={styles.oauth_divider}><span>или</span></div>
                                    <div className={styles.oauth_buttons}>
                                        <button 
                                            type="button" 
                                            className={`${styles.oauth_btn} ${styles.google}`} 
                                            onClick={() => window.location.assign(buildGoogleOAuthUrl(mode))}
                                        >
                                            {mode === 'sign-in' ? 'Войти' : 'Зарегистрироваться'} через Google
                                        </button>
                                        <button 
                                            type="button" 
                                            className={`${styles.oauth_btn} ${styles.vk}`} 
                                            onClick={() => window.location.assign(buildVkOAuthUrl(mode))}
                                        >
                                            {mode === 'sign-in' ? 'Войти' : 'Зарегистрироваться'} через VK
                                        </button>
                                    </div>
                                </div>
                                {mode === 'sign-in' && (
                                    <div className={styles.footer_hint}>
                                        Нет аккаунта? <a href="#" onClick={goToSignUp}>Зарегистрироваться</a>
                                    </div>
                                )}
                            </>
                        )}
                    </form>
                </div>
            </div>
        </section>
    );
};
import { skipToken, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Button } from 'ui-kit/components/Button/Button';
import { Input } from 'ui-kit/components/Input/Input';
import { Spinner } from 'ui-kit/components/Spinner/Spinner';
import { profileService } from '../../api/ProfileService';
import { setJWT } from '../../api/utils';
import { useUserStore } from '../store/auth';
import styles from '../styles/AuthPage.module.css';

export const AuthPage = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const userStore = useUserStore();

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

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError(null);
        setIsSubmitting(true);
    }

    const isLoading = isSubmitting && fetchLoginData.status === "pending";

    return (
        <section className={styles.auth_page_wrap}>
            <div className={styles.auth_page}>
                <div className={styles.auth_content}>
                    <h1 className={styles.auth_title}>Вход в Anixart</h1>
                    <p className={styles.auth_subtitle}>Добро пожаловать обратно</p>

                    <form className={styles.auth_form} onSubmit={handleSubmit}>
                        {error && (
                            <div className={styles.error_message}>
                                {error}
                            </div>
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

                        <div className={styles.form_group}>
                            <label htmlFor="password" className={styles.label}>
                                Пароль
                            </label>
                            <Input
                                type="password"
                                id="password"
                                placeholder="Введите пароль"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                disabled={isLoading}
                                autoComplete="current-password"
                            />
                        </div>

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
                        </div>

                        <Button
                            type="submit"
                            variant="primary"
                            disabled={isLoading || !login || !password}
                            className={styles.submit_button}
                        >
                            {isLoading ? (
                                <>
                                    <Spinner />
                                    Вход...
                                </>
                            ) : (
                                "Войти"
                            )}
                        </Button>
                    </form>
                </div>
            </div>
        </section>
    );
};
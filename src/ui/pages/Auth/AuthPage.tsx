import { useState } from 'react';
import styles from './AuthPage.module.css';
import { useUserStore } from '../../services/api/auth';
import { setJWT } from '../../services/api/utils';
import { skipToken, useQuery } from '@tanstack/react-query';
import { profileService } from '../../services/ProfileService';

export const AuthPage = () => {

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(true);
    const userStore = useUserStore();

    const [ isSubmiting, setIsSubmiting ] = useState(false);

    const fetchLoginData = useQuery({
        queryKey: ['auth', login, password, isSubmiting],
        queryFn: isSubmiting ? () => profileService.postSubmitLogin(login, password) : skipToken
    });

    function submit(event: { preventDefault: () => void; }) {
        event.preventDefault();

        setIsSubmiting(true);

    }

    if(isSubmiting && fetchLoginData.status === "success") {
        const data = fetchLoginData.data?.data;

        console.log(data);

        if (data.profileToken) {
            userStore.login(data.profile, data.profileToken.token);
            if (remember) {
                setJWT(data.profile.id, data.profileToken.token);
            }
            setIsSubmiting(false);
        } else {
            alert("Неверные данные.");
            setIsSubmiting(false);
        }
    }

    if (isSubmiting && fetchLoginData.status === "pending") {
        return (
            <div className="loader-container">	
                <i className="loader-circle"></i>
            </div>
        )
    }

    if (fetchLoginData.status === "error") {
        return ('An error has occurred: ' + fetchLoginData.error.message);
    }

    return (
        <section className={styles.auth_page_wrap}>
            <div className={styles.auth_page}>
                <h1 className={styles.auth_page_title}>Вход в аккаунт Anixart</h1>

                <form className={styles.auth_form} method="POST" onSubmit={submit}>

                    <div className={styles.auth_form_input_col}>
                        <label htmlFor="email">Логин или эл. почта</label>
                        <input type="text" name="email" id="email" className={styles.auth_input} placeholder="name@company.com" value={login} onChange={(e) => setLogin(e.target.value)} required={true}/>

                    </div>

                    <div className={styles.auth_form_input_col}>
                        <label htmlFor="password">Пароль</label>
                        <input type="password" name="password" id="password" placeholder="••••••••" className={styles.auth_input} required={true} value={password} onChange={(e) => setPassword(e.target.value)}/>

                    </div>

                    <div className={styles.remember_button_wrap}>
                        <div className={styles.auth_form_input_line}>
                            <input id="remember" aria-describedby="remember" type="checkbox" className={styles.remember_button} required={true} checked={remember} onChange={(e) => setRemember(e.target.checked)}/>
                            <label htmlFor="remember" className={styles.remember_button} style={{userSelect: "none"}}>Запомнить вход</label>

                        </div>
                    </div>

                    <button type="submit" className={styles.submit_button}>Войти</button>

                </form>
            </div>
        </section>
    )
}
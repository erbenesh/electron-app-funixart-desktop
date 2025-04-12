import { useEffect, useState } from 'react';
import styles from './AuthPage.module.css';
import { useLogin } from '../../auth/hooks/useAuth';
import { useAuthStore } from '../../auth/store/authStore';

export const AuthPage = () => {

    const [loginInp, setLoginInp] = useState("");
    const [password, setPassword] = useState("");
    // const [remember, setRemember] = useState(true);

    const { mutate: login, isPending } = useLogin();
    //  const { checkAuth } = useAuthStore();

    function submit(event: { preventDefault: () => void; }) {
        event.preventDefault();

        const body = {
            params : {
                login: loginInp, 
                password: password
            }           
        }

        login(body);

    }

    if (isPending) {
        return (
            <div className="loader-container">	
                <i className="loader-circle"></i>
            </div>
        )
    }

    // useEffect(() => {
    //     checkAuth();
    // }, [])

    // if (isError) {
    //     return ('An error has occurred: ' + .error.message);
    // }

    return (
        <section className={styles.auth_page_wrap}>
            <div className={styles.auth_page}>
                <h1 className={styles.auth_page_title}>Вход в аккаунт Anixart</h1>

                <form className={styles.auth_form} method="POST" onSubmit={submit}>

                    <div className={styles.auth_form_input_col}>
                        <label htmlFor="email">Логин или эл. почта</label>
                        <input type="text" name="email" id="email" className={styles.auth_input} placeholder="name@company.com" value={loginInp} onChange={(e) => setLoginInp(e.target.value)} required={true}/>

                    </div>

                    <div className={styles.auth_form_input_col}>
                        <label htmlFor="password">Пароль</label>
                        <input type="password" name="password" id="password" placeholder="••••••••" className={styles.auth_input} required={true} value={password} onChange={(e) => setPassword(e.target.value)}/>

                    </div>

                    {/* <div className={styles.remember_button_wrap}>
                        <div className={styles.auth_form_input_line}>
                            <input id="remember" aria-describedby="remember" type="checkbox" className={styles.remember_button} required={true} checked={remember} onChange={(e) => setRemember(e.target.checked)}/>
                            <label htmlFor="remember" className={styles.remember_button} style={{userSelect: "none"}}>Запомнить вход</label>

                        </div>
                    </div> */}

                    <button type="submit" className={styles.submit_button}>Войти</button>

                </form>
            </div>
        </section>
    )
}
import { AuthPage } from "../../sections/Auth/AuthPage";

export const metadata = {
    title: 'Авторизация | Anixart Desktop',
    description: '...',
}

export default function Page() {

    return (
        <>
            <title>{metadata.title}</title>
            
            <AuthPage/>
        </>
    )
}
import { Feed } from "../../sections/Feed/Feed";

export const metadata = {
    title: 'Лента | Anixart Desktop',
    description: '...',
}

export default function Page() {

    return (
        <>
            <title>{metadata.title}</title>
            
            <Feed />
        </>
    )
}
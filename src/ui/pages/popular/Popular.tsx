import { Popular } from "../../sections/Popular/Popular";

export const metadata = {
    title: 'Популярное | Anixart Desktop',
    description: '...',
}

export default function Page() {

    return (
        <>
            <title>{metadata.title}</title>
            
            <Popular />
        </>
    )
}
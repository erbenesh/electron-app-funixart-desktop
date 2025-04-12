import { Discussing } from "../../sections/Discussing/Discussing"

export const metadata = {
    title: 'Обсуждаемое | Anixart Desktop',
    description: '...',
}

export default function Page() {

    return (
        <>
            <title>{metadata.title}</title>
            
            <Discussing />
        </>
    )
}
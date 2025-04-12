import { Watching } from "../../sections/Watching/Watching"

export const metadata = {
    title: 'Смотрят сейчас | Anixart Desktop',
    description: '...',
}

export default function Page() {

    return (
        <>
            <title>{metadata.title}</title>
            
            <Watching />
        </>
    )
}
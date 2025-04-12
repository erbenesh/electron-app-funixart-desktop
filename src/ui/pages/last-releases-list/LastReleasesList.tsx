import { LastReleasesList } from "../../sections/lists/LastReleasesList/LastReleasesList"

export const metadata = {
    title: 'Последние релизы -  | Anixart Desktop',
    description: '...',
}

export default function Page() {

    return (
        <>
            <title>{metadata.title}</title>
            
            <LastReleasesList />
        </>
    )
}
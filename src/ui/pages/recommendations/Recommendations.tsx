import { Recommendations } from "../../sections/Recommendations/Recommendations"

export const metadata = {
    title: 'Рекомендации | Anixart Desktop',
    description: '...',
}

export default function Page() {

    return (
        <>
            <title>{metadata.title}</title>
            
            <Recommendations />
        </>
    )
}
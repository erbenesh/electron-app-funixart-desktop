import { Release } from "../../sections/Release/Release"

export const metadata = {
    title: 'Релиз | Anixart Desktop',
    description: '...',
}

export default function Page() {

    return (
        <>
            <title>{metadata.title}</title>
            
            <Release />
        </>
    )
}
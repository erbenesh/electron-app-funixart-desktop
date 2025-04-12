import { Schedule } from "../../sections/Schedule/Schedule"

export const metadata = {
    title: 'Расписание | Anixart Desktop',
    description: '...',
}

export default function Page() {

    return (
        <>
            <title>{metadata.title}</title>
            
            <Schedule />
        </>
    )
}
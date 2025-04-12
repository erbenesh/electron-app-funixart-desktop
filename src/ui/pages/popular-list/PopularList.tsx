import { PopularList } from "../../sections/lists/PopularList/PopularList"

export const metadata = {
    title: 'Популярное - | Anixart Desktop',
    description: '...',
}

export default function Page() {

    return (
        <>
            <title>{metadata.title}</title>
            
            <PopularList />
        </>
    )
}
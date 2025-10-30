import { WatchingList } from '#/components/WatchingList/WatchingList'
import '../styles/Watching.css'

export const Watching = () => {

    return (
        <div className="watching_page_wrap">

            <div className="watching_page">   
                <WatchingList />
            </div>
        </div>
    )
}
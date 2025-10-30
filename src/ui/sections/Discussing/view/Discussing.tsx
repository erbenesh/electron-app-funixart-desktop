import { DiscussingList } from '#/components/DiscussingList/DiscussingList'
import '../styles/Discussing.css'


export const Discussing = () => {

    return (
            <div className="discussing_page_wrap">

            <div className="discussing_page">   
                <DiscussingList />
            </div>
        </div>
    )
}
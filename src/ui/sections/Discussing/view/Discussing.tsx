import { DiscussingList } from '#/components/DiscussingList/DiscussingList'
import { FakeHeader } from '#/components/FakeHeader/FakeHeader'
import '../styles/Discussing.css'


export const Discussing = () => {

    return (
            <div className="discussing_page_wrap">

            <div className="discussing_page">   

                <FakeHeader />
                <FakeHeader />

                <DiscussingList />

            </div>
        </div>
    )
}
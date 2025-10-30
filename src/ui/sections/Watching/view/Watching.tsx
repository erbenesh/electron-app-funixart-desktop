import { WatchingList } from '#/components/WatchingList/WatchingList'
import { Page } from 'ui-kit/components/Page/Page'
import { Container } from 'ui-kit/components/Container/Container'

export const Watching = () => {
    return (
        <Page topOffset="md">
            <Container>
                <WatchingList />
            </Container>
        </Page>
    )
}
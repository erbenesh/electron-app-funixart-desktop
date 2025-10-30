import { DiscussingList } from '#/components/DiscussingList/DiscussingList'
import { Page } from 'ui-kit/components/Page/Page'
import { Container } from 'ui-kit/components/Container/Container'

export const Discussing = () => {
    return (
        <Page topOffset="md">
            <Container>
                <DiscussingList />
            </Container>
        </Page>
    )
}
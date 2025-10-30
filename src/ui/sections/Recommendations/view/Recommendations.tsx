import { RecommendationsList } from '#/components/RecommendationsList/RecommendationsList';
import { Page } from 'ui-kit/components/Page/Page'
import { Container } from 'ui-kit/components/Container/Container'

export const Recommendations = () => {
    return (
        <Page topOffset="md">
            <Container>
                <RecommendationsList />
            </Container>
        </Page>
    )
}
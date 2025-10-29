import { FakeHeader } from '#/components/FakeHeader/FakeHeader';
import { ReleaseCard } from '#/components/ReleaseCard/ReleaseCard';
import { useScrollPosition } from '#/hooks/useScrollPosition';
import { useEffect } from 'react';
import '../styles/Collection.css';

import { useGetCurrentCollection, useGetCurrentCollectionReleasesInfinite, useToggleCollectionFavorite } from '#/api/hooks';
import { unixToDate } from '#/api/utils';
import { useUserStore } from '#/auth/store/auth';
import { useParams } from 'react-router-dom';


export const CollectionPage = () => {

    const token = useUserStore((state) => state.token);

    const { collectionId } = useParams();

    

    const currentCollection = useGetCurrentCollection({ token, id: collectionId });

    const collection = currentCollection.data?.collection;

    const currentCollectionReleases = useGetCurrentCollectionReleasesInfinite({ token, id: collectionId });

    const { add: fetchAddToFavorite, remove: fetchDeleteFromFavorite } = useToggleCollectionFavorite({ id: collectionId, token });

    function addToFavorite() {
        if (token) {

            if (collection.is_favorite) {
                fetchDeleteFromFavorite.mutate();
            } else {
                fetchAddToFavorite.mutate();
            }
        }
    }

    const scrollPosition = useScrollPosition();
    useEffect(() => {
        
        if ( currentCollectionReleases.isSuccess && scrollPosition > 90) {
            currentCollectionReleases.fetchNextPage();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [scrollPosition])

    if (currentCollectionReleases.status === "error") {
        return ('An error has occurred: ' + currentCollectionReleases.error.message);
    }

    return (

        currentCollection.isPending ? 
        <div className="loader-container">	
            <i className="loader-circle" />
        </div>
        :
        <div className="сollection_page_wrap">

            <div className="сollection_page">

                <FakeHeader />

                {collection && (
                <div className="collection_hero">
                    <div className="collection_hero_bg" style={{ backgroundImage: `url(${collection.image})` }} />
                    <div className="collection_hero_content">
                        <div className="collection_poster_border">
                            <img src={collection.image} className="collection_poster" alt="" />
                        </div>
                        <div className="collection_body">
                            <h1 className="collection_title">{collection.title}</h1>
                            <p className="collection_meta">{unixToDate(collection.creation_date, "full")}</p>
                            <button
                                onClick={() => addToFavorite()}
                                type='button'
                                className={`favorite_btn ${collection.is_favorite ? 'favorite_btn--active' : ''}`}
                            >
                                {collection.is_favorite ? 'В закладках' : 'Добавить в закладки'}
                            </button>
                            {collection.description && (
                                <p className="collection_desc" style={{whiteSpace:"pre-wrap"}}>{collection.description}</p>
                            )}
                        </div>
                    </div>
                </div>
                )}

                <div className="collection_releases_wrap">
                    <h2 className="section_title">Релизы в коллекции</h2>
                    <div className="collection_releases">
                        {currentCollectionReleases.data?.pages.map(release => release.id &&
                            <ReleaseCard 
                                key={`coll_${collection?.id}_release_${release.id}_pos_${release["@id"]}`}
                                release={release}
                            />
                        )}
                    </div>
                    {currentCollectionReleases.isPending && 
                    (<div className="loader-container">	
                        <i className="loader-circle" />
                    </div>)}
                </div>

            </div>
            
        </div>
    )
}
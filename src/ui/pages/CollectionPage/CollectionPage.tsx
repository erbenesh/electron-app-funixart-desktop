import styles from './CollectionPage.module.css'
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { anixartService } from '../../services/AnixartService';
import { useUserStore } from '../../services/auth';
import { ReleaseCard } from '../../components/ReleaseCard/ReleaseCard';
import { unixToDate } from '../../services/utils';
import { useParams } from 'react-router-dom';
import { useScrollPosition } from '../../hooks/useScrollPosition';

export const CollectionPage = () => {

    const token = useUserStore((state) => state.token);

    const { collectionId } = useParams();

    const [ pageCollectionReleases, setPageCollectionReleases] = useState(0);

    const [ currentChoosenCollection, setCurrentChoosenCollection ] = useState(null);

    const [ currentCollectionReleases, setCurrentCollectionReleases ] = useState(null);

    const fetchCurrentCollection = useQuery({
        queryKey: ['get current collection', token, collectionId],
        queryFn: () => anixartService.getCurrentCollection(token, collectionId)
    });

    const fetchCurrentCollectionReleases = useQuery({
        queryKey: ['get current collection releases', token, collectionId, pageCollectionReleases],
        queryFn: () => anixartService.getCurrentCollectionReleases(token, collectionId, pageCollectionReleases)
    });

    useEffect(() => {

        function loadCurrentCollection () {
            const collectionData = fetchCurrentCollection.data?.data.collection;
            setCurrentChoosenCollection(collectionData);
            console.log("COLLECTION DATA", collectionData);
        }

        if( !currentChoosenCollection && fetchCurrentCollection.isSuccess){
            loadCurrentCollection();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentChoosenCollection, fetchCurrentCollection.status]);

    useEffect(() => {

        function loadCurrentCollection () {

            const collectionData = fetchCurrentCollectionReleases.data?.data.content;
            console.log("DATA", collectionData);
            setCurrentCollectionReleases(collectionData);
        }

        function loadNextCurrentCollection () {

            const collectionData = fetchCurrentCollectionReleases.data?.data.content;
            if(collectionData.length > 0){
                const newData = [...currentCollectionReleases, ...collectionData]
                console.log("NEXT DATA", collectionData);

                setCurrentCollectionReleases(newData);
                console.log("CHECK")
            }
        }

        if ( fetchCurrentCollectionReleases.isSuccess && pageCollectionReleases === 0) {
            loadCurrentCollection();
            console.log("STOP FETCH COL RELEASES")
        }

        if ( fetchCurrentCollectionReleases.isSuccess && pageCollectionReleases > 0 ) {
            loadNextCurrentCollection();
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageCollectionReleases, currentChoosenCollection, fetchCurrentCollectionReleases.status]);


    const scrollPosition = useScrollPosition();
    useEffect(() => {
        
        if ( fetchCurrentCollectionReleases.isSuccess && fetchCurrentCollectionReleases.data?.data.content.length > 0 && scrollPosition > 98) {
            if(pageCollectionReleases === 0) {
                setPageCollectionReleases(1);
            } else {
                setPageCollectionReleases(pageCollectionReleases + 1);
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [scrollPosition])

    if (fetchCurrentCollectionReleases.status === "error") {
        return ('An error has occurred: ' + fetchCurrentCollectionReleases.error.message);
    }

    return (

        !currentChoosenCollection ? 
        <div className="loader-container">	
            <i className="loader-circle" />
        </div>
        :
        <div className={styles.сollection_page_wrap}>

            <div className={styles.сollection_page}>

                <div className={styles.collection_full_wrap}>
                    {currentChoosenCollection && 
                    <div id="collection_full" className={styles.collection_full} >
                        <div className={styles.collection_poster_border}>
                            <img src={currentChoosenCollection?.image} className={styles.collection_poster} alt="" />
                        </div>

                        <div className={styles.collection_body}>

                            <h2>{currentChoosenCollection?.title}</h2>
                            <p>{unixToDate(currentChoosenCollection?.creation_date, "full")}</p>
                            <button>Добавить в закладки</button>
                            <p style={{whiteSpace:"pre-wrap"}}>{currentChoosenCollection?.description}</p>

                        </div>

                        <div className={styles.collection_releases}>
                            {currentCollectionReleases?.map(release => release.id &&
                                <ReleaseCard 
                                    key={`coll_${currentChoosenCollection.id}_release_${release.id}_pos_${release["@id"]}`} 
                                    release={release}
                                />
                            )}
                        </div>
                    </div>
                    }
                </div>
                {fetchCurrentCollectionReleases.isPending && 
                (<div className="loader-container">	
                    <i className="loader-circle" />
                </div>)}

            </div>
            
        </div>
    )
}
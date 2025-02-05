
import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { useUserStore } from '../../services/api/auth';
import styles from './Collections.module.css'
import { BookmarksNavigationButtons } from '../../components/BookmarksNavigationButtons/BookmarksNavigationButtons';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import { Link } from 'react-router-dom';
import { collectionService } from '../../services/CollectionService';

export const Collections = () => {

    const token = useUserStore((state) => state.token);

    const [ currentSection, setCurrentSection ] = useState("collections");

    const [ pageCollections, setPageCollections] = useState(0);

    const [ collections, setCollections ] = useState(null);

    const onChangeSection = (sectionTitle: string) => {
        if(sectionTitle !== currentSection) {
            setPageCollections(0);
            setCurrentSection(sectionTitle);
        }
    }

    const fetchCollections = useQuery({
        queryKey: ['get Collections', token, pageCollections],
        queryFn: () => collectionService.getCollections(pageCollections, token)
    });

    useEffect(() => {
        console.log(fetchCollections.isSuccess, pageCollections);
        async function _loadInitialCollection() {
            const collectionData = fetchCollections.data?.data.content;
            console.log(collectionData);
            setCollections(collectionData);
        }

        if(fetchCollections.isSuccess && pageCollections === 0){
            _loadInitialCollection();
        }

        async function _loadInitialNextCollection() {
            const collectionData = fetchCollections.data?.data.content;
            const newCol = [...collections, ...collectionData]
            console.log(scrollPosition, "newCOL");
            setCollections(newCol);
        }

        if(fetchCollections.isSuccess && pageCollections > 0) {
            _loadInitialNextCollection();
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageCollections, fetchCollections.status]);

    const scrollPosition = useScrollPosition();
    useEffect(() => {
        
        if (fetchCollections.isSuccess && fetchCollections.data?.data.content.length > 0 && scrollPosition >= 90) {
            if(pageCollections === 0) {
                setPageCollections(1);
            } else {
                setPageCollections(pageCollections + 1);
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [scrollPosition])

    return (
        <div>
        { !collections?
            (
            <div className="loader-container_home">	
                <i className="loader-circle"></i>
            </div>
            ) : (
                <div className={styles.сollections_page_wrap}>

                    <BookmarksNavigationButtons currentSection={currentSection} setCurrentSection={onChangeSection}/>

                    { 
                        currentSection === "collections" ?
                            <div className={styles.сollections_page}>
                                <div className={styles.collections_cards}>
                                    {collections?.map(collection => collection.id && (
                                        <Link to={`/collection/${collection.id}`} id="collection_card" key={collection.id} className={styles.card}>

                                            <div className={styles.release_image_border_bg}/>
                                
                                            <div className={styles.release_image_border}>
                                                <img className={styles.release_image} src={collection.image} alt="" />
                                            </div>

                                            <div className={styles.release_info_border}>
                                                <p className={styles.anime_title}>{collection.title}</p>
                                
                                            </div>  
                                
                                        </Link>
                                    ))}
                                </div>

                            </div>

                        : currentSection === "myCollections" &&
                            <div>myCollections</div>
                    }
                    { fetchCollections.isPending &&
                    (
                    <div className="loader-container_home">	
                        <i className="loader-circle"></i>
                    </div>
                    )
                    }

                </div>
            )
        }
            
        </div>
    )
}
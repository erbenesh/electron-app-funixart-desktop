import { useLocation } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import styles from "./InfiniteScrollList.module.css";
import { useScrollPosition } from "../../hooks/useScrollPosition";
import { useAuthStore } from "../../auth/store/authStore";

interface InfiniteScrollListProps<T> {
    queryKey: string;
    queryFn: (params: {
        pathParam: string, 
        pageParam: number, 
        [key: string]: any
    }) => Promise<{  content: T[]  }>;
    pathIndex: number; // Индекс в pathname для извлечения параметра
    additionalParams?: Record<string, any>;
    renderItem: (item: T) => React.ReactNode;
    loadingComponent?: React.ReactNode;
}

export const InfiniteScrollList = <T,>({
    queryKey,
    queryFn,
    pathIndex,
    additionalParams = {},
    renderItem,
    loadingComponent = (
        <div className="loader-container_home">  
        <i className="loader-circle"></i>
        </div>
    ),
    }: InfiniteScrollListProps<T>) => {

    const profileID = useAuthStore((state) => state.user.id);
        
    const location = useLocation();
    const pathParam = location.pathname.split('/')[pathIndex];

    const {
        data: infiniteList,
        isPending,
        isFetchingNextPage,
        isSuccess,
        fetchNextPage,
    } = useInfiniteQuery({
        queryKey: [queryKey, pathParam, profileID, ...Object.values(additionalParams)],
        queryFn: ({ pageParam }) => 
            queryFn({ 
              pathParam, 
              pageParam, 
              profileID,
              ...additionalParams 
        }),
        initialPageParam: 0,
        getNextPageParam: (lastPage, _, lastPageParam) => {
            if (lastPage.content.length === 0) {
                return undefined;
            }
            return lastPageParam + 1;
        },
        select: data => data.pages.flatMap((page) => page.content),
    });

    const scrollPosition = useScrollPosition();
    useEffect(() => {
        if (isSuccess && !isFetchingNextPage && scrollPosition >= 90) {
            fetchNextPage();
        }
    }, [scrollPosition, isSuccess, isFetchingNextPage, fetchNextPage]);

    return (
        <>
        {isPending ? (
            loadingComponent
        ) : location.pathname.split('/')[1] !== 'feed' ? (
            <div className={styles.last_releases_list_page}>
                <div className={styles.last_releases_list_cards} style={location.pathname.split('/')[1] === 'collections' ? {width: "110rem"} : {}}>
                    {
                    infiniteList.length ? infiniteList?.map((item) => renderItem(item))
                    : <p style={{margin: 'auto', alignContent: 'center', height: '100vh'}}>Ой, а тут ничего нет!</p>
                    }
                </div>

                {isFetchingNextPage && loadingComponent}
            </div>
        ) : 
            infiniteList.length ? infiniteList?.map((item) => renderItem(item))
            : <p style={{margin: 'auto', alignContent: 'center', height: '100vh'}}>Ой, а тут ничего нет!</p>
            
        }
        </>
    );
};
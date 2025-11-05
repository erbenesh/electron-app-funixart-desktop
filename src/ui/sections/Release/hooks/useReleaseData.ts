import { commentService } from '#/api/CommentService';
import { releaseVideoService } from '#/api/ReleaseVideoService';
import { useGetCurrentRelease } from '#/api/hooks';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

interface UseReleaseDataParams {
  releaseId: string | undefined;
  token: string | null;
}

export function useReleaseData({ releaseId, token }: UseReleaseDataParams) {
  // Fetch release data
  const releaseQuery = useGetCurrentRelease({ 
    id: releaseId || '', 
    token 
  });

  // Fetch comments
  const commentsQuery = useInfiniteQuery({
    queryKey: ['getCurrentReleaseComments', releaseId, token],
    queryFn: ({ pageParam }) => commentService.getAllComments("release", releaseId, pageParam, token),
    initialPageParam: 0,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (lastPage.content.length === 0) {
        return undefined;
      }
      return lastPageParam + 1;
    },
    select: (data) => data.pages.flatMap((page) => page.content),
    enabled: Boolean(releaseId),
  });

  // Fetch videos
  const videosQuery = useQuery({
    queryKey: ['getReleaseVideos', releaseId, token],
    queryFn: () => releaseVideoService.getReleaseVideos(releaseId, token || undefined),
    enabled: Boolean(releaseId),
  });

  // Process video blocks
  const videosPayload = videosQuery.data as any;
  const releaseBlocks = videosPayload?.blocks || [];
  const findBlock = (id: number, nameRe: RegExp) => 
    releaseBlocks.find((b: any) => b?.category?.id === id || nameRe.test(b?.category?.name || ''));

  const videoCategories = {
    trailers: findBlock(1, /трейлер/i)?.videos || [],
    previews: findBlock(2, /превью/i)?.videos || [],
    openings: findBlock(3, /опенинг/i)?.videos || [],
    endings: findBlock(4, /эндинг/i)?.videos || [],
    clips: findBlock(5, /клип/i)?.videos || [],
    lastVideos: videosPayload?.last_videos || [],
  };

  return {
    release: releaseQuery.data?.release,
    isReleaseLoading: releaseQuery.isPending,
    releaseError: releaseQuery.error,

    comments: commentsQuery.data || [],
    isCommentsLoading: commentsQuery.isPending,
    hasMoreComments: commentsQuery.hasNextPage,
    fetchNextComments: commentsQuery.fetchNextPage,

    videoCategories,
    isVideosLoading: videosQuery.isPending,

    isLoading: releaseQuery.isPending || commentsQuery.isPending || videosQuery.isPending,
    error: releaseQuery.error || commentsQuery.error || videosQuery.error,
  };
}


import { useParams } from 'react-router-dom';
import { useGetProfile, useGetVotedReleases } from '#/api/hooks';
import { useUserStore } from '#/auth/store/auth';

export function useProfileData() {
  const authUser = useUserStore();
  const params = useParams();

  const requestedId = params.id ?? authUser.user?.id;

  const profileQuery = useGetProfile({ 
    id: requestedId as string | number, 
    token: authUser.token 
  });

  const votedReleasesQuery = useGetVotedReleases({
    profileId: requestedId as string | number,
    page: 0,
    token: authUser.token,
  });

  const profile = profileQuery.data?.profile;
  const isMyProfile = (profileQuery.data as any)?.isMyProfile || (profileQuery.data as any)?.is_my_profile;

  return {
    profile,
    isMyProfile,
    isLoading: profileQuery.isPending || votedReleasesQuery.isPending,
    error: profileQuery.error || votedReleasesQuery.error,
    votedReleases: votedReleasesQuery.data,
    refetchProfile: profileQuery.refetch,
  };
}


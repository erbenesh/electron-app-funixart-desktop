import { FaCheck } from "react-icons/fa6";
import { Avatar, Button } from 'ui-kit';
import { sinceUnixDate } from '#/api/utils';

interface ProfileHeaderProps {
  profile: any;
  isMyProfile: boolean;
  onEdit?: () => void;
  onAddFriend?: () => void;
  onRemoveFriend?: () => void;
  isFriend?: boolean;
}

export function ProfileHeader({
  profile,
  isMyProfile,
  onEdit,
  onAddFriend,
  onRemoveFriend,
  isFriend,
}: ProfileHeaderProps) {
  if (!profile) return null;

  return (
    <div className="profile-header">
      <div className="profile-avatar-section">
        <Avatar 
          src={profile.avatar} 
          alt={profile.username}
          size="lg"
        />
        
        <div className="profile-info">
          <h1 className="profile-username">{profile.username}</h1>
          
          {profile.status && (
            <p className="profile-status">{profile.status}</p>
          )}
          
          <p className="profile-joined">
            На сайте {sinceUnixDate(profile.creation_date)}
          </p>
        </div>
      </div>

      <div className="profile-actions">
        {isMyProfile ? (
          <Button onClick={onEdit}>
            Редактировать профиль
          </Button>
        ) : (
          <>
            {isFriend ? (
              <Button onClick={onRemoveFriend} variant="ghost">
                <FaCheck /> Уже друзья
              </Button>
            ) : (
              <Button onClick={onAddFriend}>
                Добавить в друзья
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
}


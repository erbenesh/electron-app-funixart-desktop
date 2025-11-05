import { FaVk, FaTelegramPlane, FaInstagram, FaTiktok } from "react-icons/fa";
import { SiDiscord } from "react-icons/si";

interface ProfileSocialLinksProps {
  profile: any;
}

export function ProfileSocialLinks({ profile }: ProfileSocialLinksProps) {
  if (!profile) return null;

  const links = [
    { url: profile.vk_url, icon: FaVk, label: 'VK', color: '#4680C2' },
    { url: profile.telegram_url, icon: FaTelegramPlane, label: 'Telegram', color: '#0088cc' },
    { url: profile.inst_url, icon: FaInstagram, label: 'Instagram', color: '#E4405F' },
    { url: profile.tt_url, icon: FaTiktok, label: 'TikTok', color: '#000000' },
    { url: profile.discord_url, icon: SiDiscord, label: 'Discord', color: '#5865F2' },
  ].filter(link => link.url);

  if (links.length === 0) return null;

  return (
    <div className="profile-social-links">
      {links.map((link) => {
        const Icon = link.icon;
        return (
          <a
            key={link.label}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            style={{ color: link.color }}
            title={link.label}
          >
            <Icon size={24} />
          </a>
        );
      })}
    </div>
  );
}


import { Modal, Input, TextArea, Button } from 'ui-kit';
import { FaVk, FaTelegramPlane, FaInstagram, FaTiktok } from "react-icons/fa";
import { SiDiscord } from "react-icons/si";
import { MdAddLink } from "react-icons/md";

interface ProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: {
    status: string;
    vk: string;
    telegram: string;
    instagram: string;
    tiktok: string;
    discord: string;
  };
  onChange: (data: any) => void;
  onSave: () => void;
  isSaving: boolean;
  error: string | null;
  success: boolean;
}

export function ProfileEditModal({
  isOpen,
  onClose,
  formData,
  onChange,
  onSave,
  isSaving,
  error,
  success,
}: ProfileEditModalProps) {
  const updateField = (field: string, value: string) => {
    onChange({ ...formData, [field]: value });
  };

  return (
    <Modal open={isOpen} onClose={onClose} title="Редактирование профиля">
      <div className="profile-edit-form">
        {/* Status */}
        <div className="form-field">
          <label>Статус</label>
          <TextArea
            value={formData.status}
            onChange={(e) => updateField('status', e.target.value)}
            placeholder="Ваш статус..."
            rows={3}
          />
        </div>

        {/* Social Links */}
        <div className="form-section">
          <h4>Социальные сети</h4>

          <div className="form-field">
            <label>
              <FaVk /> VK
            </label>
            <Input
              value={formData.vk}
              onChange={(e) => updateField('vk', e.target.value)}
              placeholder="https://vk.com/..."
            />
          </div>

          <div className="form-field">
            <label>
              <FaTelegramPlane /> Telegram
            </label>
            <Input
              value={formData.telegram}
              onChange={(e) => updateField('telegram', e.target.value)}
              placeholder="https://t.me/..."
            />
          </div>

          <div className="form-field">
            <label>
              <FaInstagram /> Instagram
            </label>
            <Input
              value={formData.instagram}
              onChange={(e) => updateField('instagram', e.target.value)}
              placeholder="https://instagram.com/..."
            />
          </div>

          <div className="form-field">
            <label>
              <FaTiktok /> TikTok
            </label>
            <Input
              value={formData.tiktok}
              onChange={(e) => updateField('tiktok', e.target.value)}
              placeholder="https://tiktok.com/..."
            />
          </div>

          <div className="form-field">
            <label>
              <SiDiscord /> Discord
            </label>
            <Input
              value={formData.discord}
              onChange={(e) => updateField('discord', e.target.value)}
              placeholder="username#1234"
            />
          </div>
        </div>

        {/* Error/Success Messages */}
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">✓ Сохранено успешно!</div>}

        {/* Actions */}
        <div className="modal-actions">
          <Button onClick={onClose} variant="ghost" disabled={isSaving}>
            Отмена
          </Button>
          <Button onClick={onSave} loading={isSaving}>
            Сохранить
          </Button>
        </div>
      </div>
    </Modal>
  );
}


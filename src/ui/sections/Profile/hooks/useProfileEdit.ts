import { useState } from 'react';
import { profilePreferenceService } from '#/api/ProfilePreferenceService';

interface ProfileEditForm {
  status: string;
  vk: string;
  telegram: string;
  instagram: string;
  tiktok: string;
  discord: string;
}

export function useProfileEdit(initialProfile: any, token: string | null) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [formData, setFormData] = useState<ProfileEditForm>({
    status: '',
    vk: '',
    telegram: '',
    instagram: '',
    tiktok: '',
    discord: '',
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const openEdit = () => {
    if (initialProfile) {
      setFormData({
        status: initialProfile.status || '',
        vk: initialProfile.vk_url || '',
        telegram: initialProfile.telegram_url || '',
        instagram: initialProfile.inst_url || '',
        tiktok: initialProfile.tt_url || '',
        discord: initialProfile.discord_url || '',
      });
    }
    setIsEditOpen(true);
    setSaveError(null);
    setSaveSuccess(false);
  };

  const closeEdit = () => {
    setIsEditOpen(false);
    setSaveError(null);
    setSaveSuccess(false);
  };

  const saveProfile = async (onSuccess?: () => void) => {
    if (!token) {
      setSaveError('Необходима авторизация');
      return;
    }

    setIsSaving(true);
    setSaveError(null);

    try {
      // Edit status
      if (formData.status) {
        await profilePreferenceService.editStatus({ status: formData.status }, token);
      }

      // Edit social links
      const response = await profilePreferenceService.editSocial({
        vk_page: formData.vk || null,
        tg_page: formData.telegram || null,
        inst_page: formData.instagram || null,
        tt_page: formData.tiktok || null,
        discord_page: formData.discord || null,
      }, token);

      if (response.code === 200) {
        setSaveSuccess(true);
        setTimeout(() => {
          closeEdit();
          onSuccess?.();
        }, 1000);
      } else {
        setSaveError('Не удалось сохранить изменения');
      }
    } catch (error) {
      setSaveError('Произошла ошибка при сохранении');
      console.error('Profile save error:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return {
    isEditOpen,
    formData,
    setFormData,
    isSaving,
    saveError,
    saveSuccess,
    openEdit,
    closeEdit,
    saveProfile,
  };
}


/**
 * Пример использования Telegram Mini Apps интеграции
 * 
 * Этот файл демонстрирует все возможности интеграции с Telegram:
 * - BackButton для навигации
 * - MainButton для основных действий
 * - Haptic Feedback для обратной связи
 * - Theme Params для стилизации
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTelegramBackButton } from '../hooks/useTelegramBackButton';
import { useTelegramMainButton } from '../hooks/useTelegramMainButton';
import { useTelegramHaptic } from '../hooks/useTelegramHaptic';

// ============================================
// Пример 1: Форма с MainButton
// ============================================
export const CreatePostExample: React.FC = () => {
  const navigate = useNavigate();
  const { notification } = useTelegramHaptic();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Управление кнопкой "Назад"
  useTelegramBackButton({
    onBack: () => {
      if (title || content) {
        // Показать подтверждение перед выходом
        const confirmed = window.confirm('Несохраненные изменения будут потеряны. Продолжить?');
        if (confirmed) navigate(-1);
      } else {
        navigate(-1);
      }
    }
  });

  // Главная кнопка для отправки
  const mainButton = useTelegramMainButton({
    text: 'Опубликовать',
    isEnabled: title.length > 0 && content.length > 0,
    onClick: handleSubmit
  });

  async function handleSubmit() {
    setIsSubmitting(true);
    mainButton.showLoader();
    mainButton.setText('Публикация...');

    try {
      // Имитация API запроса
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Успех
      notification('success');
      mainButton.hide();
      navigate('/feed');
    } catch (error) {
      // Ошибка
      notification('error');
      mainButton.hideLoader();
      mainButton.setText('Ошибка. Попробуйте снова');
      
      // Вернуть текст через 2 секунды
      setTimeout(() => {
        mainButton.setText('Опубликовать');
      }, 2000);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Создать пост</h2>
      <input
        type="text"
        placeholder="Заголовок"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={isSubmitting}
        style={{
          width: '100%',
          padding: '0.5rem',
          marginBottom: '1rem',
          backgroundColor: 'var(--tg-theme-bg-color)',
          color: 'var(--tg-theme-text-color)',
          border: '1px solid var(--tg-theme-hint-color)'
        }}
      />
      <textarea
        placeholder="Содержание"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        disabled={isSubmitting}
        rows={10}
        style={{
          width: '100%',
          padding: '0.5rem',
          backgroundColor: 'var(--tg-theme-bg-color)',
          color: 'var(--tg-theme-text-color)',
          border: '1px solid var(--tg-theme-hint-color)'
        }}
      />
    </div>
  );
};

// ============================================
// Пример 2: Детальная страница с BackButton
// ============================================
export const ReleaseDetailExample: React.FC = () => {
  const { impact } = useTelegramHaptic();

  // BackButton показывается автоматически на не-главных страницах
  useTelegramBackButton();

  const handleAddToFavorites = () => {
    impact('medium');
    // Добавить в избранное
    console.log('Added to favorites');
  };

  const handleShare = () => {
    impact('light');
    // Поделиться
    console.log('Share clicked');
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Релиз: Название аниме</h2>
      <p style={{ color: 'var(--tg-theme-text-color)' }}>
        Описание релиза...
      </p>
      
      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <button 
          onClick={handleAddToFavorites}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: 'var(--tg-theme-button-color)',
            color: 'var(--tg-theme-button-text-color)',
            border: 'none',
            borderRadius: '0.5rem',
            cursor: 'pointer'
          }}
        >
          В избранное
        </button>
        <button 
          onClick={handleShare}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: 'var(--tg-theme-secondary-bg-color)',
            color: 'var(--tg-theme-text-color)',
            border: 'none',
            borderRadius: '0.5rem',
            cursor: 'pointer'
          }}
        >
          Поделиться
        </button>
      </div>
    </div>
  );
};

// ============================================
// Пример 3: Список с Haptic Feedback
// ============================================
export const ListWithHapticExample: React.FC = () => {
  const { impact, selectionChanged } = useTelegramHaptic();
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const items = [
    { id: 1, title: 'Элемент 1' },
    { id: 2, title: 'Элемент 2' },
    { id: 3, title: 'Элемент 3' },
  ];

  const handleSelect = (id: number) => {
    // Haptic при выборе элемента
    selectionChanged();
    setSelectedId(id);
  };

  const handleDelete = (id: number) => {
    // Сильный haptic для деструктивного действия
    impact('heavy');
    console.log('Delete:', id);
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Список с Haptic</h2>
      {items.map(item => (
        <div
          key={item.id}
          onClick={() => handleSelect(item.id)}
          style={{
            padding: '1rem',
            marginBottom: '0.5rem',
            backgroundColor: selectedId === item.id 
              ? 'var(--tg-theme-button-color)' 
              : 'var(--tg-theme-secondary-bg-color)',
            color: selectedId === item.id 
              ? 'var(--tg-theme-button-text-color)' 
              : 'var(--tg-theme-text-color)',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <span>{item.title}</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(item.id);
            }}
            style={{
              padding: '0.25rem 0.5rem',
              backgroundColor: 'var(--tg-theme-destructive-text-color)',
              color: 'white',
              border: 'none',
              borderRadius: '0.25rem',
              cursor: 'pointer'
            }}
          >
            Удалить
          </button>
        </div>
      ))}
    </div>
  );
};

// ============================================
// Пример 4: Мультишаговая форма
// ============================================
export const MultiStepFormExample: React.FC = () => {
  const navigate = useNavigate();
  const { impact, notification } = useTelegramHaptic();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    description: ''
  });

  useTelegramBackButton({
    onBack: () => {
      if (step > 1) {
        // Вернуться к предыдущему шагу
        impact('light');
        setStep(step - 1);
      } else {
        // Выйти из формы
        navigate(-1);
      }
    }
  });

  const mainButton = useTelegramMainButton({
    text: step === 3 ? 'Завершить' : 'Далее',
    isEnabled: getCurrentStepValid(),
    onClick: handleNext
  });

  function getCurrentStepValid(): boolean {
    switch (step) {
      case 1: return formData.name.length > 0;
      case 2: return formData.email.length > 0 && formData.email.includes('@');
      case 3: return formData.description.length > 0;
      default: return false;
    }
  }

  async function handleNext() {
    if (step < 3) {
      impact('medium');
      setStep(step + 1);
    } else {
      // Отправка формы
      mainButton.showLoader();
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        notification('success');
        navigate(-1);
      } catch {
        notification('error');
        mainButton.hideLoader();
      }
    }
  }

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Шаг {step} из 3</h2>
      
      {step === 1 && (
        <input
          type="text"
          placeholder="Ваше имя"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          style={{
            width: '100%',
            padding: '0.5rem',
            backgroundColor: 'var(--tg-theme-bg-color)',
            color: 'var(--tg-theme-text-color)',
            border: '1px solid var(--tg-theme-hint-color)'
          }}
        />
      )}
      
      {step === 2 && (
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          style={{
            width: '100%',
            padding: '0.5rem',
            backgroundColor: 'var(--tg-theme-bg-color)',
            color: 'var(--tg-theme-text-color)',
            border: '1px solid var(--tg-theme-hint-color)'
          }}
        />
      )}
      
      {step === 3 && (
        <textarea
          placeholder="Описание"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={5}
          style={{
            width: '100%',
            padding: '0.5rem',
            backgroundColor: 'var(--tg-theme-bg-color)',
            color: 'var(--tg-theme-text-color)',
            border: '1px solid var(--tg-theme-hint-color)'
          }}
        />
      )}

      <div style={{ 
        marginTop: '1rem', 
        color: 'var(--tg-theme-hint-color)',
        fontSize: '0.875rem' 
      }}>
        Используйте кнопку "Назад" Telegram для возврата к предыдущему шагу
      </div>
    </div>
  );
};

// ============================================
// Экспорт всех примеров
// ============================================
export const TelegramExamples = {
  CreatePost: CreatePostExample,
  ReleaseDetail: ReleaseDetailExample,
  ListWithHaptic: ListWithHapticExample,
  MultiStepForm: MultiStepFormExample
};


/**
 * Определяет, поддерживает ли устройство hover (мышь/тачпад)
 * и добавляет соответствующий класс на body
 * 
 * Это позволяет отключать hover эффекты на touch устройствах
 */
export function detectHoverCapability(): void {
  // Проверяем с помощью matchMedia, поддерживает ли устройство hover
  const hasHover = window.matchMedia('(hover: hover)').matches;
  
  // Добавляем класс на body в зависимости от результата
  if (hasHover) {
    document.body.classList.add('has-hover');
    document.body.classList.remove('no-hover');
  } else {
    document.body.classList.add('no-hover');
    document.body.classList.remove('has-hover');
  }
  
  // Также проверяем тип указателя (точность)
  const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
  if (hasFinePointer) {
    document.body.classList.add('has-fine-pointer');
  } else {
    document.body.classList.add('has-coarse-pointer');
  }
}

/**
 * Инициализирует определение hover при загрузке страницы
 */
export function initHoverDetection(): void {
  // Запускаем при загрузке DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', detectHoverCapability);
  } else {
    detectHoverCapability();
  }
  
  // Отслеживаем изменения медиа-запросов (например, при подключении мыши к планшету)
  const hoverMediaQuery = window.matchMedia('(hover: hover)');
  if (hoverMediaQuery.addEventListener) {
    hoverMediaQuery.addEventListener('change', detectHoverCapability);
  } else {
    // Fallback для старых браузеров
    hoverMediaQuery.addListener(detectHoverCapability);
  }
}


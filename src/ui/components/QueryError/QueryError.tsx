import { Button } from 'ui-kit';
import styles from './QueryError.module.css';

interface QueryErrorProps {
  error: Error;
  onRetry?: () => void;
  title?: string;
  message?: string;
}

export function QueryError({ 
  error, 
  onRetry,
  title = 'Ошибка загрузки данных',
  message,
}: QueryErrorProps) {
  const errorMessage = message || error.message || 'Не удалось загрузить данные';

  return (
    <div className={styles.container}>
      <div className={styles.icon}>⚠️</div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.message}>{errorMessage}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="ghost">
          Повторить попытку
        </Button>
      )}
      {process.env.NODE_ENV === 'development' && (
        <details className={styles.details}>
          <summary>Подробности ошибки</summary>
          <pre className={styles.stack}>{error.stack}</pre>
        </details>
      )}
    </div>
  );
}


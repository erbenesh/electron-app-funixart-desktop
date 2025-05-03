import styles from './NavigationButtons.module.css';

const SectionTitleMapping = {
  last: 'Последнее',
  finished: 'Завершенные',
  ongoing: 'Онгоинги',
  announce: 'Анонсы',
  films: 'Фильмы',
};

export const NavigationButtons = ({ ...props }) => (
    <div className={styles.buttons_empty_wrap}>
      <div
        className={styles.buttons_bg_wrap}
        style={props.isHeaderHidden ? { transform: 'translateY(-9rem)' } : {}}
      >
        <ul className={styles.buttons_list}>
          <li
            className={props.currentSection === 'last' ? styles.button_active : styles.button}
            onClick={() => props.setCurrentSection('last')}
          >
            {SectionTitleMapping.last}
          </li>

          <li
            className={props.currentSection === 'ongoing' ? styles.button_active : styles.button}
            onClick={() => props.setCurrentSection('ongoing')}
          >
            {SectionTitleMapping.ongoing}
          </li>

          <li
            className={props.currentSection === 'announce' ? styles.button_active : styles.button}
            onClick={() => props.setCurrentSection('announce')}
          >
            {SectionTitleMapping.announce}
          </li>

          <li
            className={props.currentSection === 'finished' ? styles.button_active : styles.button}
            onClick={() => props.setCurrentSection('finished')}
          >
            {SectionTitleMapping.finished}
          </li>

          <li
            className={props.currentSection === 'films' ? styles.button_active : styles.button}
            onClick={() => props.setCurrentSection('films')}
          >
            {SectionTitleMapping.films}
          </li>
        </ul>
      </div>
    </div>
  );

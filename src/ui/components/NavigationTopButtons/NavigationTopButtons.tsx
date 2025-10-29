
import styles from './NavigationTopButtons.module.css'
import { SegmentedControl } from 'ui-kit/components/SegmentedControl/SegmentedControl'

const SectionTitleMapping = {
    last: "Последнее",
    finished: "Завершенные",
    ongoing: "Онгоинги",
    announce: "Анонсы",
    films: "Фильмы",
};

export const NavigationTopButtons = ({...props}) => {

    return (
        <div className={styles.buttons_empty_wrap}>
            <div className={styles.buttons_bg_wrap} style={props.isHeaderHidden ? {transform: "translateY(-9rem)"} : {}}>
                <div className={styles.buttons_list}>
                    <SegmentedControl
                        items={[
                            { key: 'last', label: SectionTitleMapping.last },
                            { key: 'ongoing', label: SectionTitleMapping.ongoing },
                            { key: 'announce', label: SectionTitleMapping.announce },
                            { key: 'finished', label: SectionTitleMapping.finished },
                            { key: 'films', label: SectionTitleMapping.films },
                        ]}
                        value={props.currentSection}
                        onChange={props.setCurrentSection}
                    />
                </div>
            </div>
        </div>
    );

}
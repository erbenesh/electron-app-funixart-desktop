import { useMemo, useState } from 'react'
import styles from './VoiceoverPicker.module.css'

export type VoiceoverKind = 'all' | 'dub' | 'subs'

export interface VoiceoverItem {
    id: number | string
    title: string
    episodesCount: number
    viewsCount?: number
    logoUrl?: string
    isNew?: boolean
    kind: VoiceoverKind
}

interface VoiceoverPickerProps {
    items: VoiceoverItem[]
    initialKind?: VoiceoverKind
    onSelect?: (item: VoiceoverItem) => void
}

export const VoiceoverPicker = ({ items, initialKind = 'all', onSelect }: VoiceoverPickerProps) => {
    const [kind, setKind] = useState<VoiceoverKind>(initialKind)

    const filtered = useMemo(() => {
        if (kind === 'all') return items
        return items.filter((i) => i.kind === kind)
    }, [items, kind])

    return (
        <div className={styles.wrap}>
            <div className={styles.tabs}>
                <button
                    className={`${styles.tab} ${kind === 'all' ? styles.tab_active : ''}`}
                    type="button"
                    onClick={() => setKind('all')}
                >
                    Все
                </button>
                <button
                    className={`${styles.tab} ${kind === 'dub' ? styles.tab_active : ''}`}
                    type="button"
                    onClick={() => setKind('dub')}
                >
                    Озвучки
                </button>
                <button
                    className={`${styles.tab} ${kind === 'subs' ? styles.tab_active : ''}`}
                    type="button"
                    onClick={() => setKind('subs')}
                >
                    Субтитры
                </button>
            </div>

            <div className={styles.list}>
                {filtered.map((i) => (
                    <button key={i.id} className={styles.row} type="button" onClick={() => onSelect && onSelect(i)}>
                        <div className={styles.left}>
                            <div className={styles.logo_border}>
                                {i.logoUrl ? (
                                    <img className={styles.logo} src={i.logoUrl} alt={i.title} />
                                ) : (
                                    <div className={styles.logo_placeholder} />
                                )}
                            </div>
                            <div className={styles.meta}>
                                <div className={styles.title_line}>
                                    <span className={styles.title}>{i.title}</span>
                                    {i.isNew && <span className={styles.badge}>НОВИНКА</span>}
                                </div>
                                <span className={styles.subtitle}>{i.episodesCount} эпизодов</span>
                            </div>
                        </div>
                        <div className={styles.right}>
                            {typeof i.viewsCount === 'number' && (
                                <span className={styles.views} title="Просмотры">
                                    {Intl.NumberFormat('ru-RU', { notation: 'compact' }).format(i.viewsCount)}
                                </span>
                            )}
                        </div>
                    </button>
                ))}
            </div>
        </div>
    )
}



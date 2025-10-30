import { useEffect, useMemo, useRef, useState } from 'react';
import { GoSearch } from 'react-icons/go';
import { IoClose } from 'react-icons/io5';
import { useLocation, useNavigate } from 'react-router-dom';
import { SearchInput } from 'ui-kit/components/SearchInput/SearchInput';
import { useClickOutside } from '../../hooks/useClickOutside';
import { useSearchResults } from '../../api/hooks/useSearch';
import { ReleaseCard } from '../ReleaseCard/ReleaseCard';
import styles from './TopNavigationBar.module.css';

interface GlobalSearchProps {
    token: string;
}

export const GlobalSearch: React.FC<GlobalSearchProps> = ({ token }) => {
    const [inputValue, setInputValue] = useState('');
    const [debouncedValue, setDebouncedValue] = useState('');
    const [activeIndex, setActiveIndex] = useState<number>(-1);

    const inputWrapRef = useRef<HTMLDivElement | null>(null);
    const resultsRef = useRef<HTMLDivElement | null>(null);
    const navigate = useNavigate();
    const location = useLocation();

    // Debounce user input
    useEffect(() => {
        const id = setTimeout(() => setDebouncedValue(inputValue.trim()), 300);
        return () => clearTimeout(id);
    }, [inputValue]);

    const queryEnabled = Boolean(token && debouncedValue);
    const { data } = useSearchResults({ token, query: debouncedValue, searchBy: null, location: location.pathname });

    const results = useMemo(() => data?.data?.content ?? [], [data]);

    useClickOutside(inputWrapRef, () => {
        setInputValue('');
        setActiveIndex(-1);
    });

    // Clear search and overlay on route change
    useEffect(() => {
        setInputValue('');
        setActiveIndex(-1);
    }, [location.pathname]);

    const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (!queryEnabled || results.length === 0) return;
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setActiveIndex((i) => Math.min(i + 1, results.length - 1));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setActiveIndex((i) => Math.max(i - 1, 0));
        } else if (e.key === 'Enter') {
            e.preventDefault();
            const target = results[activeIndex] ?? results[0];
            if (target?.id) {
                navigate(`/release/${target.id}`);
                setInputValue('');
                setActiveIndex(-1);
            }
        } else if (e.key === 'Escape') {
            setInputValue('');
            setActiveIndex(-1);
        }
    };

    const showResults = queryEnabled && inputValue !== '' && results.length > 0;

    return (
        <div className={styles.serach_input_wrapper} ref={inputWrapRef}
             role="combobox"
             aria-haspopup="listbox"
             aria-expanded={showResults}
             aria-owns="global-search-results">
            <SearchInput
                placeholder='Поиск аниме'
                value={inputValue}
                onChange={el => setInputValue(el.currentTarget.value)}
                onKeyDown={onKeyDown}
                wrapperClassName={styles.search_wrapper}
                className={styles.search_input}
                aria-autocomplete="list"
                aria-controls="global-search-results"
            />
            {inputValue && (
                <button
                    type="button"
                    aria-label="Очистить поиск"
                    className={styles.clear_btn}
                    onClick={() => { setInputValue(''); setActiveIndex(-1); }}
                >
                    <IoClose size={16} />
                </button>
            )}
            <button
                type="button"
                aria-label="Найти"
                className={styles.search_btn}
                onClick={() => {
                    if (results.length > 0) {
                        const target = results[0];
                        if (target?.id) {
                            navigate(`/release/${target.id}`);
                            setInputValue('');
                            setActiveIndex(-1);
                        }
                    }
                }}
            >
                <GoSearch size={16} />
            </button>

            {showResults && (
                <div ref={resultsRef} className={styles.search_results_wrap}>
                    <div className={styles.search_results} role="listbox" id="global-search-results">
                        <h2>Результаты поиска</h2>
                        <div className={styles.results}>
                            {results.map((el, idx) => (
                                el.id && (
                                    <div
                                        key={el.id}
                                        role="option"
                                        aria-selected={idx === activeIndex}
                                        onMouseEnter={() => setActiveIndex(idx)}
                                        onClick={() => {
                                            navigate(`/release/${el.id}`);
                                            setInputValue('');
                                            setActiveIndex(-1);
                                        }}
                                        style={idx === activeIndex ? { outline: '2px solid rgb(189, 78, 44)' } : {}}
                                    >
                                        <ReleaseCard release={el} />
                                    </div>
                                )
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};



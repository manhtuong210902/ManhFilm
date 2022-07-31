import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SearchHeader.module.scss';

const cx = classNames.bind(styles);

function SearchHeader() {
    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate();
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const handleOnChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        if (searchValue.trim() === '') return;
        navigate(`/search/${searchValue}`);
    };

    return (
        <div className={cx('header-search')}>
            <div className={cx('search-body')}>
                <form onSubmit={handleOnSubmit} autoComplete="off">
                    <input
                        ref={inputRef}
                        type="text"
                        name="search"
                        placeholder="Type here..."
                        className={cx('input-search')}
                        value={searchValue}
                        onChange={handleOnChange}
                    />
                    <button type="submit" className={cx('search-btn-cart')}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                </form>
            </div>
        </div>
    );
}

export default SearchHeader;

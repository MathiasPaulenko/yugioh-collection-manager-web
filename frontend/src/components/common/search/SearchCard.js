import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaTimes } from 'react-icons/fa';

export const SearchCard = ({
    value,
    handle,
    resetValue,
    placeholder,
}) => {

    const navigate = useNavigate();
    const { searchText } = value;
    const inputRef = useRef(null);

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`?q=${searchText}`);
    };

    const handleReset = (e) => {
        e.preventDefault();
        inputRef.current.value = "";
        navigate({resetValue});
    };

    return (
        <form onSubmit={handleSearch} className="mb-3 animate__animated animate__fadeIn">
            <div className="coll-search-wrap position-relative">
                <FaSearch className="coll-search-icon" size={16} />
                <input
                    type="text"
                    placeholder={placeholder}
                    className="coll-search-input form-control ps-5 pe-5 rounded-pill"
                    name="searchText"
                    id="searchText"
                    autoComplete="off"
                    value={searchText}
                    onChange={handle}
                    ref={inputRef}
                />
                {searchText && (
                    <button
                        type="button"
                        className="coll-search-clear btn btn-link"
                        onClick={handleReset}
                        aria-label="Clear"
                    >
                        <FaTimes size={14} />
                    </button>
                )}
            </div>
        </form>
    )
}

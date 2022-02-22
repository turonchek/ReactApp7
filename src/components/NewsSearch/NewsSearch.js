import React,{useCallback,useState, useRef} from "react";
import PropTypes from 'prop-types';
import { HASHTAGS } from "../../data";

export function NewsSearch(props){
    const searchRef=useRef(null);

    const handleChangeSearch = useCallback(()=>{   
        const {onChangeSearch} = props;
        onChangeSearch(searchRef.current.value);
    },[searchRef]);

    const handleChangeFilters = useCallback((e)=>{   
        const {onChangeFilters} = props;
        const { value, id } = e.currentTarget;
        let newFilter;

        if (props.filters.includes(value)) {
            newFilter = props.filters.filter(el => el !== value);
        } else {
            newFilter = [...props.filters, {value, id}];
        }
        onChangeFilters(newFilter);
    },[props.filters]);

    return (
        <div>
            <label>
                <input 
                type="text" 
                ref={searchRef}
                />
            </label>
            <div>
                <button onClick={handleChangeSearch}>Search</button>
            </div>
            {HASHTAGS.map((hashtagsEl) => (
                        <label key={hashtagsEl.id}>
                        <input
                            name={hashtagsEl.word}
                            id={hashtagsEl.id}
                            // checked={HASHTAGS.indexOf(hashtagsEl.word) !== -1}
                            type="checkbox"
                            value={hashtagsEl.word}
                            onChange={handleChangeFilters}
                        /><span>{hashtagsEl.word}</span>
                        </label>
                    ))}
        </div>
    );
}

NewsSearch.propTypes={
    search:PropTypes.string,
    onChangeSearch:PropTypes.func
}

NewsSearch.defaultPropTypes={
    search:PropTypes.string,
    onChangeSearch:PropTypes.func
}
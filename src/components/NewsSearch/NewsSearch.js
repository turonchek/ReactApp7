import React,{useCallback,useState, useRef} from "react";
import PropTypes from 'prop-types';
import { HASHTAGS } from "../../data";

export function NewsSearch(props){
    const searchRef=useRef(null);
    const [searchHashtags,setSearchHashtags] = useState([]);

    const handleChangeSearchHashtags = useCallback((e)=>{
        const { value, id } = e.currentTarget;
        let newSearchHashtag;
        if (searchHashtags.includes(value)) {
            newSearchHashtag = searchHashtags.filter(el => el !== value);
        } else {
            newSearchHashtag = [...searchHashtags, {value,id}];
        }
        setSearchHashtags( newSearchHashtag );
    },[searchHashtags,setSearchHashtags])

    const handleChangeSearch = useCallback(()=>{   
        const {onChangeSearch} = props;
        onChangeSearch({search:searchRef.current.value,searchHashtags});
    },[searchRef,searchHashtags]);

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
                            // checked={hashtags.indexOf(hashtagsEl.word) !== -1}
                            type="checkbox"
                            value={hashtagsEl.word}
                            onChange={handleChangeSearchHashtags}
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
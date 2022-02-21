import React, {useState,useEffect, useCallback, useMemo} from 'react';
import PropTypes from 'prop-types';
import { makeNews, makeNewsItem } from '../../data';
import { NewsList } from '../NewsList/NewsList';
import { NewsForm } from '../NewsForm/NewsForm';
import { NewsSearch } from '../NewsSearch/NewsSearch' ;
import { HASHTAGS } from '../../data';

const news=makeNews();
// console.log(news)

export function NewsPage(){

    const [items,setItems] = useState(news);
    const [isEditing,setIsEditing] = useState(false);
    const [isSearch,setIsSearch] = useState(false);
    const [search,setSearch] = useState({search:``,searchHashtags:[]});

    const addRandomNewsItem =useCallback(()=>{
        setItems([
            makeNewsItem(),
            ...items
        ])
    },[items]);

    const onRemoveNewsItem = useCallback((itemID)=>{
        console.log(`remove`)
        const newItems = items.filter((item) => item.id !== itemID);
        setItems(newItems);
    },[items])

    useEffect(()=>{
        if(search.search===``){
            setItems(news)
            return
        }
        const itemsFilter =items.filter(el => {
            if(el.title.toLowerCase().indexOf(search.search.toLowerCase())<0 
                && el.text.toLowerCase().indexOf(search.search.toLowerCase())<0 
                && el.description.toLowerCase().indexOf(search.search.toLowerCase())<0
                ) return false;
            // if(el.hashtags.map((id)=>{
            //     search.searchHashtags.map((srchHshtg)=>{
            //         if (srchHshtg.id===id){
            //             console.log(el)
            //             // return false;
            //         }
            //     })
            // })) return false;
            return true;
        })
        setItems(itemsFilter);
    },[search,setItems])

    return(
        <div className="news-page">
            <div className="news-page__list">
            <div className="news-page__cations">
                <button onClick={addRandomNewsItem}>Add random item</button>
                <button onClick={() => setIsEditing(!isEditing )}>
                {isEditing ? 'Cancel' : 'Add item'}
                </button>
                <button onClick={()=> setIsSearch( !isSearch )}>
                {isSearch ? 'Cancel' : 'Search'}
                </button>
            </div>
            {isEditing && (
                <NewsForm
                    onAddNewsItem={(item)=>setItems([item,...items])}
                />
            )}
            {(isSearch &&
                <NewsSearch
                    onChangeSearch={(newSearch)=>setSearch(newSearch)}
                />
            )}
            <NewsList
                items={items}
                onRemoveNewsItem={onRemoveNewsItem}
            />
            </div>
        </div>
    );
}


NewsPage.propTypes = {};

NewsPage.defaultProps = {};
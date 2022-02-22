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
    const [search,setSearch] = useState(``);
    const [filters,setFilters] = useState([]);

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
        if(search ===``){
            setItems(news)
            return
        }
        const itemsSearch=items.filter(el => {
            if(el.title.toLowerCase().indexOf(search.toLowerCase())<0 
                && el.text.toLowerCase().indexOf(search.toLowerCase())<0 
                && el.description.toLowerCase().indexOf(search.toLowerCase())<0
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
        setItems(itemsSearch);
    },[search,setItems])


    useEffect(()=>{
        if(filters.length===0){
            setItems(news);
            return
        }
        // const filteredItems=items.filter(function(itemsEl){
        //     return filters.filter(function(filtersEl){
        //         // return filtersEl.id=itemsEl.hashtags.id;
        //         return itemsEl.hashtags.filter(hshtgEl=>hshtgEl.id === filtersEl.id)
        //     })
        // });
        // const filteredItems=items.filter(itemsEl=>{
        //     // console.log(`itemsElID---------`,itemsEl.hashtags)
        //     return itemsEl.hashtags.filter(hshtgElID=>{
        //         console.log(`hshtgElID--------`,hshtgElID)
        //         return filters.filter(filtersEl=>{
        //             console.log(`filtersElID------`,filtersEl.id)
        //         })
        //     })
        //     console.log(`---------`)
            // return filters.filter(filtersEl=>{
            //     // console.log(`filtersElID-------`,filtersEl.id)
            //     // filtersEl.filter(el=>console.log(`itemsElID---------`,el.id))
            // })
        // })




        // console.log(filters)
        // const filteredItems=items.filter(el=>console.log(el.hashtags))
        // const filteredItems=items.filter(el=>!filters.includes(el.hashtags))
        // setItems(filteredItems);
        // console.log(filteredItems)
        // console.log(filters)
    },[filters,setFilters])


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
                    filters={filters}
                    onChangeFilters ={(newFilter)=>setFilters(newFilter)}
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
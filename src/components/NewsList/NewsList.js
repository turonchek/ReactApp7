import React from "react";
import PropTypes from 'prop-types';
import { NewsItem } from "../NewsItem/NewsItem";

export function NewsList(props){
    const {items, onRemoveNewsItem} = props;
    return (
        <div className="news-list">
            <div className="news-list__cont">

            {items.map(el => (
                <div key={el.id} className="news-list__el">
                    <NewsItem
                        onRemoveNewsItem={onRemoveNewsItem}
                        newsItem={el}
                    />
                </div>
            ))}

            </div>
        </div>
    );
}

NewsList.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        authors:PropTypes.arrayOf(PropTypes.string),
        description:PropTypes.string,
        hashtags:PropTypes.arrayOf(PropTypes.string),
        id:PropTypes.string,
        photo:PropTypes.string,
        text:PropTypes.string,
        title:PropTypes.string,
    })),
    onRemoveNewsItem: PropTypes.func.isRequired,
};

NewsList.defaultProps = {
    items: [
        PropTypes.shape({
            hashtags:PropTypes.string,
            authors:PropTypes.string,
        })
    ],
};
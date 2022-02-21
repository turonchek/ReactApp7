import React, {useState, useRef, useCallback } from 'react';
import { useForm } from "react-hook-form";
import PropTypes from 'prop-types';
import faker from 'faker';
import {getBase64} from "../utils";
import { HASHTAGS, AUTHORS } from "../../data";

export function NewsForm(props){

    // const titleRef=useRef(null);
    // const descriptionRef=useRef(null);
    // const textRef=useRef(null);
    const [photo,setPhoto] = useState(``);
    const [hashtags,setHashtags] = useState([]);
    const [authors,setAuthors] = useState(AUTHORS[0].name);
    const { 
        register, 
        handleSubmit,
        getValues,
        formState: { errors } 
    } = useForm();

    const onSubmit = (e) => {
        const id = faker.datatype.uuid();
        // const title=titleRef.current.value;
        // const text=textRef.current.value;
        // const description=descriptionRef.current.value;
        // значения можно достать и таким способом
        const title=getValues(`title`);
        const description=getValues(`description`);
        const text=getValues(`text`);
        const newsItem = {
            id,
            title,
            text,
            description,
            photo,
            hashtags,
            authors,
        };
        props.onAddNewsItem(newsItem);
    };

    const handleChangeHashtags = useCallback((e) => {
        const { value } = e.currentTarget;
        let newHashtag;
        if (hashtags.includes(value)) {
            newHashtag = hashtags.filter(el => el !== value);
        } else {
            newHashtag = [...hashtags, value];
        }
        setHashtags( newHashtag );
    },[hashtags,setHashtags]);

    const handleChangePhoto = useCallback((e) => {
        const file = e.currentTarget.files[0];
        getBase64(file, (base64) => {
            setPhoto( base64 );
        })
    },[]);

    const handleChangeAuthors = useCallback((e) => {
        const { value } = e.currentTarget;
        setAuthors( value );
    },[]);

    return (
        <div className="news-form">
            <div className="panel panel-default">
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="news-form__cont" id="my-form">

            <div className="news-form__row">
                <div className="news-form__label">
                    <label htmlFor="news-form-title">*Title:</label>
                </div>
                <input 
                    // ref={titleRef}
                    {...register(`title`,{
                        required:{
                            value:true,
                            message:`This field is required`
                        },
                        minLength:{
                            value:5,
                            message:`Field should contain at least 5 digits`
                        },
                        maxLength:{
                            value:25,
                            message:`The field must not contain more than 5 digits`
                        },
                    })
                    }
                    type="text" 
                    name="title" 
                    id="news-form-title"/>
                {errors.title && <div style={{color:`red`}}>{errors.title.message}</div>}
                </div>

            <div className="news-form__row">
                <div className="news-form__label">
                    <label htmlFor="news-form-description">*Description:</label>
                </div>
                <textarea 
                    // ref={descriptionRef}
                    {...register(`description`,{
                        required:{
                            value:true,
                            message:`This field is required`
                        },
                        minLength:{
                            value:10,
                            message:`Field should contain at least 10 digits`
                        },
                        maxLength:{
                            value:100,
                            message:`The field must not contain more than 100 digits`
                        },
                    })
                    }
                    style={{width: '200px',height: '100px',}} 
                    name="description" 
                    id="news-form-description"
                />
                {errors.description && <div style={{color:`red`}}>{errors.description.message}</div>}
            </div>

            <div className="news-form__row">
                <div className="news-form__label">
                    <label htmlFor="news-form-title">*Text:</label>
                </div>
                <textarea 
                    // ref={textRef}
                    {...register(`text`,{
                        required:{
                            value:true,
                            message:`This field is required`
                        },
                        minLength:{
                            value:20,
                            message:`Field should contain at least 20 digits`
                        },
                        maxLength:{
                            value:200,
                            message:`The field must not contain more than 100 digits`
                        },
                    })
                    }
                    style={{width: '300px',height: '200px',}}  
                    name="text" 
                    id="news-form-text"
                    />
                {errors.text && <div style={{color:`red`}}>{errors.text.message}</div>}
            </div>

            <div className="news-form__row">
                <div className="news-form__label">
                    <label htmlFor="news-form-photo">Photo:</label>
                </div>   
                {photo.length > 0 && (
                    <img style={{
                        width: '300px',
                        height: '200px',
                        objectFit: 'contain',
                    }} src={photo} alt=""/>
                )}
                <input type="file" accept=".jpeg,.png" onChange={handleChangePhoto} />
            </div>

            <div className="news-form__row">
                <span>Author:</span>
                <div>
                {AUTHORS.map((authorsEl) => (
                    <label key={authorsEl.id}>
                    <input
                        checked={authors === authorsEl.name}
                        type="radio"
                        value={authorsEl.name}
                        onChange={handleChangeAuthors}
                    /><span>{authorsEl.name}</span>
                    </label>
                ))}
                </div>
            </div>

            <div className="news-form__row">
                <span>Hashtags:</span>
                <div>
                    {HASHTAGS.map((hashtagsEl) => (
                        <label key={hashtagsEl.id}>
                        <input
                            name={hashtagsEl.word}
                            checked={hashtags.indexOf(hashtagsEl.word) !== -1}
                            type="checkbox"
                            value={hashtagsEl.word}
                            onChange={handleChangeHashtags}
                        /><span>{hashtagsEl.word}</span>
                        </label>
                    ))}
                </div>
            </div>
            <button type="submit">Create item</button>
            </form>
        </div>
    );
}

NewsForm.propTypes = {
    onAddNewsItem: PropTypes.func.isRequired,
};

NewsForm.defaultProps = {};
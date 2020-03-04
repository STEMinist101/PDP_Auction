import {POST_ITEM,EDIT_ITEM,GET_ITEM,GET_ITEMS,ITEMS_LOADING,CLEAR_ITEMS,CLEAR_ITEM, ADD_ERROR} from './types/types'
import {setSearchText} from './filterActions'
import { clearErrors } from './errorActions';
import axios from 'axios'

const url = process.env.NODE_ENV === 'production' ? '': 'http://localhost:3000'

export const getItem = (title,id) => dispatch => {
    dispatch(itemsLoading(true));
    axios.get(`${url}/products/${title}/${id}`)
        .then(res => {
            dispatch({
                type: GET_ITEM,
                loading: false,
                item: res.data
            });
        });
};

export const getItems = () => dispatch => {
    dispatch(itemsLoading(true));
    axios.get(`${url}/products`)
        .then(res=>{
            dispatch({
                type:GET_ITEMS,
                loading:false,
                items: res.data
            });
        });
};

export const getItemsByName = text => dispatch => {
    text = text.trim();
    if(text !== ''){
        dispatch(itemsLoading(true));
        dispatch(setSearchText(text));
        axios.get(`${url}/products/${text}`)
            .then(res => {
                dispatch({
                    type: GET_ITEMS,
                    items: res.data
                });
            });
    } else {
        dispatch(getItems());
    }
};

export const postItem = ({title, startingBid, description, imageUrl, thumbnail}, token) => dispatch =>{
    dispatch(itemsLoading(true));
    console.log(token);

    const fd = new FormData();
    fd.append('title', title);
    fd.append('startingBid', startingBid);
    fd.append('description', description);
    fd.append('imageUrl', imageUrl);
    fd.append('thumbnail', thumbnail);

    axios.post(`${url}/products`, fd, { headers: { 'x-auth': token} })
        .then(data => {
            dispatch({
                type: POST_ITEM,
                loading:false
            });
            dispatch(clearErrors());
        })
        .catch(err => {
            const errorsArr = Object.entries(err.response.data.errors);
            
            dispatch(clearErrors());
            errorsArr.forEach(err => {
                dispatch({
                    type: ADD_ERROR,
                    errorType: err[0],
                    errorValue: err[1].message
                });
            });
            dispatch(itemsLoading(false));
        });
};

export const putItem = ({_id, title, startingBid, description, imageUrl, thumbnail }, token) => dispatch => {
    dispatch(itemsLoading(true));
    
    const fd = new FormData();
    fd.append('_id', _id);
    fd.append('title', title);
    fd.append('startingBid', startingBid);
    fd.append('description', description);
    fd.append('imageUrl', imageUrl);
    fd.append('thumbnail', thumbnail);

    axios.put(`${url}/products/alter`, fd, { headers: { 'x-auth': token } })
        .then(res => {
            dispatch({
                type: EDIT_ITEM,
                loading: false
            });
        })
        .catch(err => {
            const errorsArr = Object.entries(err.response.data.errors);

            dispatch(clearErrors());
            console.error(errorsArr);
        });
};

export const clearItems = () => ({
    type: CLEAR_ITEMS
});

export const clearItem = () => ({
    type: CLEAR_ITEM
});

export const itemsLoading = loading => ({
    type: ITEMS_LOADING,
    loading
});
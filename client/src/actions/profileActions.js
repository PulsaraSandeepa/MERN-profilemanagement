import axios from 'axios'
import {PROFILE_LOADING, GET_ERRORS, GET_PROFILE, CLEAR_CURRENT_PROFILE} from './types';

//Get current profile
export const getCurrentProfile =() => dispatch => {
    dispatch(setProfileLoading());
    axios.get("./api/proile")
    .then(res=>{
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        })
    }).catch(err=>
        dispatch({
            type:GET_PROFILE,
            payload:{}
        })
        )
}

//Profile loading
export const setProfileLoading=()=>{
    return {
        type:PROFILE_LOADING
    }
}

//clear profile
export const clearCurrentProfile=()=>{
    return {
        type:CLEAR_CURRENT_PROFILE
    }
}
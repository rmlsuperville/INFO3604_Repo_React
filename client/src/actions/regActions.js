//The axios module is how the front-end component of the system communicates
//with the backend api and database (Express & Nodejs)
import axios from 'axios';

//Imported the returnErrors and clearErrors functions from errorActions file
import {returnErrors, clearErrors} from './errorActions';

import {
    REGISTER_SUCCESS_AWAITING,
    CLEAR_REG_MESSAGE,
    REGISTER_FAIL,
    GET_REG_LISTING,
    REG_LISTING_LOADING,
    UPDATE_REG_STATUS, 
    REGISTER_SUCCESS
} from '../actions/types';


//This function sends the information from the 'Register' form on the front-end to the backend database
export const registerUser = ({name, email, clubID, password}) => dispatch => {
    //Headers
    const config = {
        headers: {
            "Content-type" : "application/json" 
        }
    }

    //Create request body
    const body = JSON.stringify({ name, email, clubID, password});

    //Send headers and request body to the the api endpoints
    //Access the backend api (Express & Nodejs) to post/store registration information to the database
    axios.post('/api/register', body, config)
        .then(res => {
                dispatch(clearErrors());
                dispatch({
                    type: REGISTER_SUCCESS_AWAITING,
                    payload: res.data
                });
            }
        )
        .catch(err => {//If an error is caught
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
            dispatch({type: REGISTER_FAIL});
        });
}

//This function clears all messages returned on the registration form of the front-end
export const clearRegMessage = () => {
    return({
        type: CLEAR_REG_MESSAGE
    })
};


//This function gets the all the registration records from the database
export const getRegListing = () => dispatch =>{
    
    dispatch(setRegListLoading());

    //Access the backend api (Express & Nodejs) to get all the registration records from the database
    axios
        .get('/api/register/listing')
        .then(res => dispatch({
            type: GET_REG_LISTING,
            payload: res.data
        }))
        .catch(err => //If errors are caught
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};

export const setRegListLoading = () => {
    return {
        type: REG_LISTING_LOADING
    };
};


//This function is responsible for changing the registration status of a user from 0 (Pending) to 1 (Authenticated)
//in the database based on their registration id
export const updateRegStatus = (id) => dispatch =>{
    //Headers
    const config = {
        headers: {
            "Content-type" : "application/json" 
        }
    }

    //Create request body
    const body = JSON.stringify({ id });
  
    //Access the backend api (Express & Nodejs) to update the registration information in the database
    axios.post('/api/register/update', body, config)
        .then(res => dispatch({
            type: UPDATE_REG_STATUS,
            payload: res.data
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));//If an error is caught
};


//This function creates a new user in the database based on their provided information
export const createUser = ({ name, email, password, clubID}) => dispatch => {
    //Headers
    const config = {
        headers: {
            "Content-type" : "application/json" 
        }
    }

    //Create request body
    const body = JSON.stringify({ name, email, password, clubID });

    //Send headers and request body to the the api endpoints
    //Access the backend api (Express & Nodejs) to create a new user in the users table of the database
    axios.post('/api/register/user', body, config)
        .then(res => dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        }))
        .catch(err => {//If an error is caught
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
            dispatch({type: REGISTER_FAIL});
        });
}


//This function creates a new admin/Club Executive user in the database
export const createAdmin = ({ name, email, password, clubID}) => dispatch => {

    //Headers
    const config = {
        headers: {
            "Content-type" : "application/json" 
        }
    }

    //Create request body
    const body = JSON.stringify({ name, email, password, clubID });

    //Send headers and request body to the the api endpoints
    //Access the backend api (Express & Nodejs) to create a new admin/Club Executive in the users table of the database
    axios.post('/api/register/user/admin', body, config)
        .then(res => dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        }))
        .catch(err => {//If an error is caught
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
            dispatch({type: REGISTER_FAIL});
        });
}
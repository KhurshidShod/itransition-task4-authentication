import axios from 'axios'
import { 
    REG_PASS, 
    REG_FAIL,
    AUTH_PASS,
    AUTH_FAIL,
    LOGIN_FAIL,
    LOGIN_PASS,
    LOGOUT,
} from '../actions/types.js'
import setAuthToken from '../helpers/setAuthToken.js'

export const loadUsers = () => async (dispatch) => {
    if(localStorage.token){
        setAuthToken(localStorage.token)
    }
    try {
        const res = await axios.get('https://itransition-task4-auth.herokuapp.com/api/auth')
        dispatch({
            type: AUTH_PASS,
            payload: res.data
        })
    } catch (err) {
        dispatch({ type: AUTH_FAIL })
    }
};

export const register = 
({ name, email, password }) => 
async (dispatch) => {
    const config = {
        headers: { "Content-Type": "application/json" }
    };
    const body = JSON.stringify({ name, email, password });
    try {
        const res = await axios.post("https://itransition-task4-auth.herokuapp.com/api/users", body, config);
        dispatch({
            type: REG_PASS,
            payload: res.data
        });
    } catch (error) {
        const errors = error.response.data.errors;
        if(errors) {
            errors.forEach((error) => {
                alert(error.msg)
            });
        }
        dispatch({
            type: REG_FAIL,
        })
    }
}

export const login = ({ email, password, status }) => async (dispatch) => {
    const config = {
        headers: {'Content-Type': 'application/json'}
    }
    const body = JSON.stringify({ email, password });
    try {
        const res = await axios.post('https://itransition-task4-auth.herokuapp.com/api/auth', body, config);
        dispatch({
            type: LOGIN_PASS,
            payload: res.data
        })
        dispatch(loadUsers)
    } catch (err) {
        const errors = err.response.data.errors;
        if(errors) {
            errors.forEach((error) => alert(error.msg))
        }
        dispatch({
            type: LOGIN_FAIL,
        })
    }
};

export const logout =  (id) =>  (dispatch) => {
    localStorage.removeItem('email')
    localStorage.removeItem('token')
    const body = JSON.stringify({ id });
    const config = {
        headers: {'Content-Type': 'application/json'}
    }
     axios.post('https://itransition-task4-auth.herokuapp.com/api/users/logout',body, config)
    dispatch({
        type: LOGOUT,
    });

}

import axios from "axios";

export const ACTION_TYPES = {
    FETCH_USERS: "FETCH_USERS",
    FETCH_USER: "FETCH_USER",
    FETCH_USERS_ERROR: "FETCH_USERS_ERROR",
    CREATE_USER: "CREATE_USER",
    EDIT_USER: "EDIT_USER",
    DELETE_USER: "DELETE_USER",
};

const API_URL = "https://65a25d5342ecd7d7f0a771bd.mockapi.io/users";

export const fetchUsers = () => async (dispatch) => {
    try {
        const response = await axios.get(`${API_URL}`);
        dispatch({
            type: ACTION_TYPES.FETCH_USERS,
            payload: response.data,
        });
    } catch (err) {
        dispatch({
            type: ACTION_TYPES.FETCH_USERS_ERROR,
            payload: err.message
        });
    }
};

export const fetchUser = (userId) => async (dispatch) => {
    try {
        const response = await axios.get(`${API_URL}/${userId}`);
        dispatch({ type: ACTION_TYPES.FETCH_USER, payload: response.data });
    } catch (err) {
        dispatch({
            type: ACTION_TYPES.FETCH_USERS_ERROR,
            payload: err.message
        });
    }
}

export const createUser = (user) => async (dispatch) => {
    try {
      const response = await axios.post(API_URL, user);
      dispatch({ type: ACTION_TYPES.CREATE_USER, payload: response.data });
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };
  
  export const editUser = (user) => async (dispatch) => {
    try {
      const response = await axios.put(`${API_URL}/${user.id}`, user);
      dispatch({ type: ACTION_TYPES.EDIT_USER, payload: response.data });
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };
  
  export const deleteUser = (userId) => async (dispatch) => {
    await axios.delete(`${API_URL}/${userId}`);
    dispatch({ type: ACTION_TYPES.DELETE_USER, payload: userId });
  };

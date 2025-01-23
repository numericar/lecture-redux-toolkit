import { ACTION_TYPES } from "../actions/userAction";

const initState = {
    users: [],
    currentUser: null,
};

const userReducer = (state = initState, action) => {
    switch (action.type) {
        case ACTION_TYPES.FETCH_USERS:
            return {
                ...state,
                users: action.payload,
            };
        case ACTION_TYPES.FETCH_USER:
            return { ...state, currentUser: action.payload };
        case ACTION_TYPES.CREATE_USER:
            return { ...state, users: [...state.users, action.payload] };
        case ACTION_TYPES.EDIT_USER:
            return {
                ...state,
                users: state.users.map((user) =>
                    user.id === action.payload.id ? action.payload : user
                ),
            };
        case ACTION_TYPES.DELETE_USER:
            return {
                ...state,
                users: state.users.filter((user) => user.id !== action.payload),
            };
        default:
            return state;
    }
};

export default userReducer;

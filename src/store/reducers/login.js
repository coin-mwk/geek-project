import { LOGOUT, SET_TOKEN } from "../constant";

const initValue = {
    token:'',
    refresh_token:'',
}


export default function reducer(state = initValue, action){
    const {type,payload} = action;
    switch (type) {
        case SET_TOKEN:
            return payload;
        case LOGOUT:
            return {}
        default:
            return state;
    }
}
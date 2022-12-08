import { SAVE_PROFILE, SAVE_USER } from "../constant";

const initValues = {
    user:{},
    profile:{},
};

export default function reducer(state = initValues, action){
    const {type, payload} = action;
    switch (type) {
        case SAVE_USER:
            return{
                ...state,
                user:payload,
            }
        case SAVE_PROFILE:
            return{
                ...state,
                profile:payload
            }
        default:
            return state
    }
}
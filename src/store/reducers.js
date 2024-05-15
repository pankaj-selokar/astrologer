import {ADD_ASTROLOGER,DELETE_ASTROLOGER,UPDATE_ASTROLOGER,FETCH_ASTROLOGER} from './Actions';
const initialState = {
    astrologer: []
};

const astrologerReduser=(state=initialState,action)=>{

switch (action.type) {
        case ADD_ASTROLOGER:
            return { ...state, astrologer: [...state.astrologer, action.payload] };
        case DELETE_ASTROLOGER:
            return { ...state, astrologer: state.astrologer.filter(astrologer => astrologer.id !== action.payload) };
        case UPDATE_ASTROLOGER:
            return {
                ...state,
                astrologer: state.astrologer.map(astrologer =>
                    astrologer.id === action.payload.id ? action.payload : astrologer
                )
            };
        case FETCH_ASTROLOGER:
            return { ...state, astrologer: action.payload };
        default:
            return state;
    }

    

}
export default astrologerReduser;
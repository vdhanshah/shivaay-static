import { SET_DOCTORS } from '../actions/doctors'
const initialState = {
    doctors: []
}
const doctors = (state = initialState, action) => {
    switch (action.type) {
        case SET_DOCTORS:
            return {
                ...state,
                doctors: action.doctors
            }
        default:
            return state;

    }
};
export default doctors;
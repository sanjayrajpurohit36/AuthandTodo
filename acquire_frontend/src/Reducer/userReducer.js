export default function reducer(state={
    signUpData : {},
    logoutData : {},
    profileData : {}
}, action) {
    switch(action.type) {
        case "USER_DATA":
            return {...state, signUpData: action.payload }
        case "USER_LOGOUT":
            return {...state, logoutData: action.payload}
        case "PROFILE_DATA_UPDATE":
            return {...state, profileData: action.payload}
        default : {}
    }

    return state;
}
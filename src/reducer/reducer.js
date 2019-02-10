
let initialState = {
  user_info: {},
  current_match: {},
  matches: [],
  selected_user: []
  }

const reducer = (state = initialState, action) => {
  switch (action.type){

    case 'CURRENT_USER':
      return {...state, user_info: action.payload, current_match: {}}

    case 'LOG_IN':
        localStorage.setItem("token", action.payload.jwt)
        return {...state, user_info: action.payload.user}

    case 'LOG_OUT':
        localStorage.clear()
        // const emptyState = {user_info: {}, current_match: {}}
        return {...state, user_info: {}}

    case 'GET_MATCH':
        if(action.payload === undefined){
          return {...state, current_match: 'no user found'}
        } else {
        return {...state, current_match: action.payload}
      }

    case 'SET_MATCHES':
    console.log(action.payload, "matches")
        return {...state, matches: action.payload}

    case 'ERROR':
        return {...state, user_info: action.payload}

    case 'SELECT_USER':
    console.log(action.payload, "inside reducer")
        return {...state, selected_user: action.payload}

    default:
      return state
  }
}

export default reducer;

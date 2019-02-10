export const loadMatch = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token")
    fetch("http://localhost:3000/find_matches", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: 'Token ' + token
        }
      })
    .then(r => r.json())
    .then(match => dispatch({type: 'GET_MATCH', payload: match}))
  }
}

export const login = (username, password) => {
  return (dispatch) => {
  fetch("http://localhost:3000/login",{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      username,
      password
    })
  })
  .then(res => res.json())
  .then(resp => {
    if (resp.error){
      dispatch({type:'ERROR', payload: resp.error})
    }
    else{
      console.log('this is the resp', resp)
      dispatch({type:'LOG_IN', payload: resp})
    }
  })
  }
}

export const showMatches = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token")
    return fetch("http://localhost:3000/show_matches", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: 'Token ' + token
        }
      })
    .then(r => r.json())
    .then(matches => dispatch({type:'SET_MATCHES', payload: matches}))
    }
  }

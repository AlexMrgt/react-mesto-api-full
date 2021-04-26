
export const BASE_URL = 'https://api.mesto.practikum.nomoredomains.club';

export const register = ({password, email}) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    'credentials': 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password, email})
  })
  .then(res =>
    res.ok? res.json() : Promise.reject(`register ERR TXT:  ${res.status}`))
};

export const authorize = ({email, password})=> {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    'credentials': 'include',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({password, email})
  })
  .then(res =>
    res.ok? console.log('success auth') : Promise.reject(`authorize ERR TXT:  ${res.status}`) );
}

export const logOut = () => {

  return fetch(`${BASE_URL}/logout`,{
    method: 'DELETE',
    'credentials': 'include',
  })
  .then(() => {
    console.log('Now you have a guest status');
  })
  .catch(err => {
    console.log(err);
  })
}

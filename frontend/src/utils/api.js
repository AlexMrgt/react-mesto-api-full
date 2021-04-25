class Api {

  constructor(
    {
      baseUrl,
    }) {

    this._baseUrl = baseUrl;

  }

  _checkResponce(res){

    return res.ok ?  res.json() : Promise.reject(`Ошибка: ${res.status}`)
  }

  getUserInfo(){

    return fetch(`${this._baseUrl}/users/me`, {
      'credentials': 'include',
    })
      .then(res => this._checkResponce(res))
  }

  editTextUserInfo({name, about}){

    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      'credentials': 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
    .then(res => this._checkResponce(res))
  }

  editUserPhoto({avatar}){

    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      'credentials': 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: avatar
      })
    })
      .then(res => this._checkResponce(res))
  }

  getDefaultCards(){

    return fetch(`${this._baseUrl}/cards`, {

      'credentials': 'include',
    })
        .then(res => this._checkResponce(res))

  }

  addNewCard({link, name}){

    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      'credentials': 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        link,
      })
    })
      .then(res => this._checkResponce(res))
  }

  setLike(cardId){
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      'credentials': 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => this._checkResponce(res))
  }

  deleteLike(cardId){

    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      'credentials': 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => this._checkResponce(res))
  }

  deleteCard(cardId){

    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      'credentials': 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => this._checkResponce(res))

  }
}

const api = new Api({
  baseUrl: 'https://api.mesto.practikum.nomoredomains.club',
});

export default api;

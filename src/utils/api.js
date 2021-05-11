class Api {
  constructor(options) {
    this.url = options.baseUrl;
    this.headers =  options.headers;
  }
  _check(res) {
    if (res.ok) {
        return res.json()
    }
       return Promise.reject(`Ошибка: ${res.status}`)
  }

  getProfileInfo() {
    return fetch(this.url + '/users/me', {
        headers: this.headers
    })
    .then(res => this._check(res))
  }

  getInitialCards() {
    return fetch(this.url + '/cards', {
        headers: this.headers})
        .then(res => this._check(res))
  }

  editProfileInfo(info) {
      return fetch(this.url + '/users/me', {
          method: "PATCH",
          headers: this.headers,
          body: JSON.stringify({
            name: info.name,
            about: info.about
        })
      })
      .then(res => this._check(res))
  }

createCard(card) {
    return fetch(this.url + '/cards', {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
            name: card.name,
            link: card.link
        })
    })
    .then(res => this._check(res))
}

removeCard(id) {
    return fetch(`${this.url + '/cards'}/${id}`, {
        method: 'DELETE',
        headers: this.headers,
    })
    .then(res => this._check(res))
}



changeLikeCardStatus(id, isLiked) {
    if (isLiked) {
        return fetch(`${this.url + '/cards/likes'}/${id}`, {
            method: 'PUT',
            headers: this.headers,
        })
        .then(res => this._check(res))
        
    } else {
        return fetch(`${this.url + '/cards/likes'}/${id}`, {
            method: 'DELETE',
            headers: this.headers,
        })
        .then(res => this._check(res))
        }
}

updateAvatar(link) {
    return fetch(this.url + '/users/me/avatar', {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify({
            avatar: link,
        })
    })
    .then(res => this._check(res))
}
}

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-21',
    headers: {
        authorization: '2eb4d3bb-6397-4fac-946b-506829848b31',
        'Content-Type': 'application/json'
    }
})

export default api;
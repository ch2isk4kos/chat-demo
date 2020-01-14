class MessagesAdapter {
    constructor() {
        this.baseUrl = 'http://localhost:3000/api/v1/messages'
        this.commentsUrl = 'http://localhost:3000/api/v1/comments'
    }

    getMessages() {
        return fetch(this.baseUrl).then(response => response.json())
    }

    postMessage(messageObj) {

        const message = {
            content: messageObj.content,
            creator: messageObj.creator
        }

        return fetch(this.baseUrl, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({message})
        })
        .then(res => res.json())
        .catch(error => console.log(error))
    }

    destroyMessage(id) {
        return fetch('http://localhost:3000/api/v1/messages/' + id, {
            method: 'DELETE'
        })
        .catch(error => console.log(error))
    }

}

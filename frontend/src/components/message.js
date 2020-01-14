class Message {
    constructor(messageObj) {
        this.id = messageObj.id
        this.content = messageObj.content
        this.creator = messageObj.creator
        this.comments = messageObj.comments
        // this.deleteButtonEventListener()
    }

    renderMessage() {
        return `
        <div data-id=${this.id} class="message-container">
            <p><strong>@${this.creator}</strong>: ${this.content}</p>
            <button type="button" id=${this.id} class="new-comment-button">Comment</button>
            <div data-id=${this.id} class="new-comment-container" style="display: none"><br>
                <form class="new-comment-form">
                    <textarea name="comment-content" class="new-comment-content" rows="5" cols="46"></textarea><br>
                    <label for="creator">Comment By:</label>
                    <input type="text" name="comment-creator" class="new-comment-creator">
                    <input type="submit" value="Submit" id=${this.id} class="new-comment-submit">
                    <button type="button" id=${this.id} class="cancel-comment-button">Cancel</button>
                </form><br>
            </div>
            <div>
                <button type="button" id=${this.id} class="delete-message-button">Delete</buttton>
            </div>
            <div>
                <ul id="comments-container-${this.id}">
                    ${this.renderComments()}
                </ul>
            </div>
        </div>
        `
    }

    createComment(commentObject) {

        const commentObj = {
            message_id: this.id,
            content: commentObject.content,
            creator: commentObject.creator
        }

        console.log("commentObj:", commentObj)

        return fetch('http://localhost:3000/api/v1/comments', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(commentObj)
        })
        .then(response => response.json())
        .then(comment => {
            console.log("comment:", comment)
            // console.log("comment.content:", comment.content)
            // console.log("comment.creator:", comment.creator)

            this.comments.push(comment)

            document.getElementById(`comments-container-${this.id}`).innerHTML += `
                <li class="comment" style="list-style-type: none">
                    <p>${comment.content} <strong>@${comment.creator}</strong></p>
                </li>
            `
        })
        .catch(error => console.log(error))
    }

    // deleteButtonEventListener() {
    //     const deleteBtns = document.getElementsByClassName('delete-message-buttton')
    //     for (let btn of deleteBtns) {
    //         btn.addEventListener('click', this.destroyMessage())
    //     }
    // }
    //
    destroyMessage(id) {
        console.log("deleteMessage(id)", id)
        return fetch('http://localhost:3000/api/v1/messages/' + id, {
            method: 'DELETE'
        })
    }

    renderComments() {
        return this.comments.map(comment => `
            <li class="comment" style="list-style-type: none">
                <p>${comment.content} <strong>@${comment.creator}</strong></p>
            </li>
        `).join('')
    }

}

// <button type="button" class="delete-message-${this.id}-button" onclick=${this.deleteMessage(this.id)}>Delete</buttton>
// onclick=${this.deleteMessage(this.id)}

// class="delete-message-${this.id}-button"

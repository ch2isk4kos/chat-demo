class Message {
    constructor(messageObj) {
        this.id = messageObj.id
        this.content = messageObj.content
        this.creator = messageObj.creator
        this.comments = messageObj.comments
    }

    renderMessage() {
        return `
        <div data-id=${this.id} class="message-container">
            <p><strong>@${this.creator}</strong>: ${this.content}</p>
            <button type="button" id=${this.id} class="new-comment-button">Comment</button>
            <div data-id=${this.id} class="new-comment-container" style="display: none">
                <form id="new-comment-form">
                    <textarea name="comment-content" id="new-comment-content" rows="5" cols="46"></textarea><br>
                    <label for="creator">Comment By:</label>
                    <input type="text" name="comment-creator" id="new-comment-creator">
                    <input type="submit" value="Submit" id=${this.id} class="new-comment-submit">
                </form><br>
                <button type="button" id=${this.id} class="cancel-comment-button">Cancel</button>
            </div>
        </div>
        <ul data-id="${this.id}" class="comments-container">
            ${this.renderComments()}
        </ul>
        `
    }

    createComment() {
        // e.preventDefault()
        // debugger

        console.log("createComment:", this)

        const newCommentContainer = document.getElementsByClassName('new-comment-container')
        const newCommentForm = document.getElementById('new-comment-form')
        const newCommentContent = document.getElementById('new-comment-content')
        const newCommentCreator = document.getElementById('new-comment-creator')

        // const newCommentContainer = document.getElementsByClassName('new-comment-container')
        // const newCommentForm = document.getElementsByClassName('new-comment-form')
        // const newCommentContent = document.getElementsByClassName('new-comment-content')
        // const newCommentCreator = document.getElementsByClassName('new-comment-creator')

        // console.log('this', this)
        // console.log('newCommentContent:', newCommentContent.value)
        // console.log('newCommentCreator:', newCommentCreator)

        const commentObj = {
            message_id: this.id,
            content: newCommentContent.value,
            creator: newCommentCreator.value
        }

        console.log("commentObj:", commentObj)

        return fetch('http://localhost:3000/api/v1/comments', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(commentObject)
        })
        .then(resp => resp.json())
        .then(comment => {
            console.log("comment:", comment)
            this.comments.push(comment)
        })
        .catch(error => console.log(error))
    }

    renderComments() {
        return this.comments.map(comment => `
            <li class="comment" style="list-style-type: none">
                <p>${comment.content} <strong>@${comment.creator}</strong></p>
            </li>
        `).join('')
    }
}

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
                <form class="new-comment-form">
                    <textarea name="comment-content" class="new-comment-content" rows="5" cols="46"></textarea><br>
                    <label for="creator">Comment By:</label>
                    <input type="text" name="comment-creator" class="new-comment-creator">
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

    renderComments() {
        return this.comments.map(comment => `
            <li class="comment" style="list-style-type: none">
                <p>${comment.content} <strong>@${comment.creator}</strong></p>
            </li>
        `).join('')
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

            this.comments.push(new Comment({comment}))
            this.renderComments()

            // this.comments.push(new Comment(comment))
            // this.renderComments()

            // this.comments.push(comment)
            // this.renderComments()

        })
        .catch(error => console.log(error))
    }

}

class Message {
    constructor(messageObj) {
        this.id = messageObj.id
        this.content = messageObj.content
        this.creator = messageObj.creator
        this.comments = messageObj.comments
    }

    renderMessage() {
        // console.log("this.renderMessage():", this)
        return `
        <div data-id=${this.id} class="message-container">
            <p><strong>@${this.creator}</strong>: ${this.content}</p>
            <div data-id=${this.id} class="new-comment-container" style="display: none">
                <form class="new-comment-form">
                    <textarea id="new-comment-content" rows="5" cols="46"></textarea><br>
                    <label for="creator">Created By:</label>
                    <input type="text" name="creator" id="new-comment-creator">
                    <input type="submit" value="Submit">
                </form>
            </div>
            <button type="button" id=${this.id} class="new-comment-button">Comment</button>
        </div>
        `
    }

    // renderCommentForm() {
    //     console.log(this)
    // }

    // commentForm() {
    //     return `
    //     <div data-id=${this.id} class="new-comment-container" style="display: none">
    //         <form id="new-comment-form">
    //             <textarea id="new-comment-content" rows="8" cols="60"></textarea><br>
    //             <label for="creator">Created By:</label>
    //             <input type="text" name="creator" id="new-comment-creator">
    //             <input type="submit" value="Submit">
    //         </form>
    //     </div>
    //     `
    // }

    renderComment() {
        return `
        <div data-id=${this.id}>
            <h4>${this.creator} says...</h4>
            <p>${this.content}</p>
        </div>
        `
    }

}

// <div data-id=${this.id} class="new-comment-container" style="display: none">
//     <form id="new-comment-form">
//         <textarea id="new-comment-content" rows="8" cols="60"></textarea><br>
//         <label for="creator">Created By:</label>
//         <input type="text" name="creator" id="new-comment-creator">
//         <input type="submit" value="Submit">
//     </form>
// </div>

// #############################################################################

// return `
//     <div class="card" data-id=${this.id}>
//       <img class="card-img" src="${this.photo}" alt="${this.name}">
//       <h2 class="card-title">${this.name}</h2>
//       <div class="card-content">
//         <ul>
//           <li>Tag</li>
//           <li>Tag</li>
//           <li>Tag</li>
//         </ul>
//         <a class="card-link" target=”_blank” href="http://www.google.com/maps/place/${this.lat},${this.long}">Find this Location</a>
//         <button type='button' value=${this.likes} id=${this.id}>
//           ${this.likes} Likes
//           <span><i class="fas fa-thumbs-up"></i></span>
//         </button>
//       </div>
//     </div>
//     `

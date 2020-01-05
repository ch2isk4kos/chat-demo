class Messages {
    constructor() {
        // debugger
        this.messages = []
        this.adapter = new MessagesAdapter()
        this.initBindings()
        // this.initEventHandlers()
        this.fetchAndLoadMessages()
    }

    initBindings() {
        // messages
        this.messageContainer = document.getElementsByClassName('message-container')
        this.newCommentButtons = document.getElementsByClassName('new-comment-button')

        // new message
        this.messagesContainer = document.getElementById('messages-container')
        this.newMessageContainer = document.getElementById('new-message-container')
        this.newMessageContent = document.getElementById('new-message-content')
        this.newMessageCreator = document.getElementById('new-message-creator')
        this.newMessageForm = document.getElementById('new-message-form')

        // comments
        this.commentsContainer = document.getElementsByClassName('comments-container')

        // new comment
        this.newCommentContainer = document.getElementsByClassName('new-comment-container')
        this.newCommentForm = document.getElementsByClassName('new-comment-form')
        this.newCommentContent = document.getElementsByClassName('new-comment-content')
        this.newCommentCreator = document.getElementsByClassName('new-comment-creator')
        this.newCommentSubmit = document.getElementsByClassName('new-comment-submit')
        this.cancelCommentButtons = document.getElementsByClassName('cancel-comment-button')

        console.log('initBinds:', this.newCommentContent)

        // new like

        // event listeners
        this.newMessageForm.addEventListener('submit', this.createMessage.bind(this))
        this.messagesContainer.addEventListener('click', this.renderCommentForm.bind(this))

        // console.log("newCommentContainer:", this.newCommentContainer)
        // console.log("newCommentSubmit:", this.newCommentSubmit)
        // console.log("commentsContainer:", this.commentsContainer)
        // console.log("messageContainer", this.messageContainer)
    }

    // initEventHandlers() {
    //     this.newMessageSubmitButton.addEventListener('submit', this.createMessage.bind(this));
    // }

    renderCommentForm(e) {
        e.preventDefault();

        switch(e.target.className) {
            case "new-comment-button":

                // this.newCommentButtons = document.getElementsByClassName('new-comment-button')
                // this.newCommentContainer = document.getElementsByClassName('new-comment-container')

                // let commentBtn = this.newMessagesContainer[`${e.target.id}`];
                // let commentContainer = this.messageContainer[e.target.id];
                // commentContainer.style.display = 'block';

                // console.log("this:", this)
                // console.log("e.target:", e.target)
                // console.log("e.target.id:", e.target.id)
                // console.log("new comment button:", this.newCommentButtons)

                // console.log("e.target.dataset.id:", e.target.dataset.id)
                // console.log("this.messages:", this.messages)
                // console.log("message container:", this.messageContainer)
                // console.log(this.messageContainer.children)
                // console.log(this.messageContainer.childNodes)
                // console.log("messages container:", this.messagesContainer)
                // console.log("new comment container:", this.newCommentContainer)

                // Attempt 0:
                // this.newCommentContainer.style.display = 'block';

                // Attempt 1:
                // this.newCommentContainer[`${e.target}`].style.display = "block"
                // this.newCommentContainer[`${e.target.dataset.id}`].style.display = "block"

                // Attempt 2:
                // this.messageContainer[`${e.target}`].style.display = "block"
                // this.messageContainer[`${e.target.dataset.id}`].style.display = "block"


                // Attempt 3:
                // this.messages.forEach(() => {
                //     this.newCommentContainer[`${e.target.dataset.id}`].style.display = 'block';
                // })

                // Attempt 4:
                // this.messages.forEach(() => {
                //     if (e.target.style.display === "none") {
                //         e.target.style.display = "block";
                //     }
                // })

                // Attempt 5:
                // this.messages.forEach(() => {
                //     if (this.newCommentContainer.style.display === 'none') {
                //         this.newCommentContainer.style.display = 'block'
                //     } else {
                //         return;
                //     }
                // })

                // Attempt 6:
                // this.messages.forEach(() => {
                //     this.messagesContainer.style.display = 'block';
                // })

                // Attempt 7: renders all of the comment containers
                // for (let i=0; i < this.newCommentButtons.length; i++) {
                //     console.log([i]);
                //
                //     let commentContainer = this.newCommentContainer[i];
                //     commentContainer.style.display = 'block';
                // }

                // Attempt 8: moves the comment button to the left side of the message div
                // for (let i=0; i < this.newCommentButtons.length; i++) {
                //     console.log([i]);
                //     if (e.target.id === this.newCommentButtons[i].id) {
                //         this.newCommentContainer.style.display = 'block';
                //     }
                // }

                // Attempt 9: Yahtzee!
                for (let i=0; i < this.newCommentButtons.length; i++) {
                    // console.log([i]);
                    if (e.target.id === this.newCommentButtons[i].id) {
                        this.newCommentContainer[i].style.display = 'block';
                    }
                }
            break;

            case "cancel-comment-button":
                for (let i=0; i < this.cancelCommentButtons.length; i++) {
                    // console.log([i]);
                    if (e.target.id === this.cancelCommentButtons[i].id) {
                        this.resetCommentFormFields()
                        this.newCommentContainer[i].style.display = 'none';
                    }
                }
            break;

            case "new-comment-submit":

                for (let i=0; i < this.newCommentSubmit.length; i++) {
                    if (e.target.id === this.newCommentSubmit[i].id) {
                        console.log("messages[i]:", this.messages[i])
                        // console.log("this.newCommentContent:", this.newCommentContent)
                        // console.log("this.newCommentContainer:", this.newCommentContainer)

                        // Attempt 3:
                        // const target = this.newCommentSubmit[i]
                        // target.addEventListener('submit', this.messages[i].createComment())

                        // Attempt 2:
                        // this.newCommentSubmit[i].addEventListener('submit', this.messages[i].createComment())

                        // Attempt 1:
                        this.messages[i].createComment() // this is being called in message.js

                        // this.resetCommentFormFields()
                        // this.renderMessages()
                    }
                }

            break;

            default:
            return
        }
    }

    createMessage(e) {
        e.preventDefault()

        const messageObj = {
            id: this.id,
            content: this.newMessageContent.value,
            creator: this.newMessageCreator.value
        }

        this.adapter.postMessage(messageObj)
        .then(message => {
            this.messages.push(new Message(message))
            this.resetMessageFormFields()
            this.renderMessages()
        })
    }

    // createComment(e) {
    //     e.preventDefault()
    //
    //     // debugger
    //     const commentObj = {
    //         message_id: this.id,
    //         content: this.newCommentContent.value,
    //         creator: this.newCommentCreator.value
    //     }
    //
    //     this.adapter.postComment(commentObj)
    //     .then(comment => {
    //         console.log('comment:', comment)
    //         // this.comments.push(new Comment(comment))
    //         // this.resetCommentFormFields()
    //         // this.renderMessages()
    //     })
    //
    //     // fetch(`http://localhost:3000/api/v1/comments`, {
    //     //     method: 'POST',
    //     //     headers: {
    //     //         "Content-Type": "application/json",
    //     //         "Accept": "application/json"
    //     //     },
    //     //     body: JSON.stringify({commentObj})
    //     // })
    //     // .then(resp => resp.json())
    //     // .then(comment => {
    //     //     console.log("L228:", comment)
    //     //     this.resetCommentFormFields()
    //     //     this.renderMessages()
    //     // })
    //     // .catch(error => console.log(error))
    // }

    fetchAndLoadMessages() {
        this.adapter.getMessages()
        .then(messages => {
            // debugger
            messages.forEach(message => {
                console.log("message.comments", message.comments)
                this.messages.push(new Message(message))
            })
        })
        .then(() => {
            this.renderMessages()
        })
        .catch(error => console.log("error", error))
    }

    resetMessageFormFields() {
        this.newMessageContent.value = '';
        this.newMessageCreator.value = '';
    }

    resetCommentFormFields() {
        this.newCommentContent.value = '';
        this.newCommentCreator.value = '';
    }

    renderMessages() {
        this.messagesContainer.innerHTML = this.messages.map(message => message.renderMessage()).join('')
    }

}

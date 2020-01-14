class Messages {
    constructor() {
        this.messages = []
        this.adapter = new MessagesAdapter()
        this.initBindings()
        this.fetchAndLoadMessages()
    }

    initBindings() {

        // new message
        this.messagesContainer = document.getElementById('messages-container')
        this.newMessageContainer = document.getElementById('new-message-container')
        this.newMessageContent = document.getElementById('new-message-content')
        this.newMessageCreator = document.getElementById('new-message-creator')
        this.newMessageForm = document.getElementById('new-message-form')

        // messages
        this.messageContainer = document.getElementsByClassName('message-container')
        this.newCommentButtons = document.getElementsByClassName('new-comment-button')

        // comments
        this.commentsContainer = document.getElementsByClassName('comments-container')

        // new comment
        this.newCommentContainer = document.getElementsByClassName('new-comment-container')
        this.newCommentForm = document.getElementsByClassName('new-comment-form')
        this.newCommentContent = document.getElementsByClassName('new-comment-content')
        this.newCommentCreator = document.getElementsByClassName('new-comment-creator')
        this.newCommentSubmit = document.getElementsByClassName('new-comment-submit')
        this.cancelCommentButtons = document.getElementsByClassName('cancel-comment-button')

        // delete message
        this.deleteMessageButton = document.getElementsByClassName('delete-message-button')

        // event listeners
        this.newMessageForm.addEventListener('submit', this.createMessage.bind(this))
        this.messagesContainer.addEventListener('click', this.renderCommentForm.bind(this))

        console.log("messageContainer", this.messageContainer)
        console.log("deleteMessageButton:", this.deleteMessageButton)

    }

    renderCommentForm(e) {
        e.preventDefault();

        switch(e.target.className) {
            case "new-comment-button":

            for (let i=0; i < this.newCommentButtons.length; i++) {
                if (e.target.id === this.newCommentButtons[i].id) {
                    this.newCommentContainer[i].style.display = 'block';
                }
            }
            break;

            case "cancel-comment-button":
            for (let i=0; i < this.cancelCommentButtons.length; i++) {
                if (e.target.id === this.cancelCommentButtons[i].id) {
                    this.resetCommentFormFields()
                    this.newCommentContainer[i].style.display = 'none';
                }
            }
            break;

            case "new-comment-submit":
            for (let i=0; i < this.newCommentSubmit.length; i++) {
                if (e.target.id === this.newCommentSubmit[i].id) {
                    const commentObject = {
                        content: this.newCommentContent[i].value,
                        creator: this.newCommentCreator[i].value
                    }

                    this.newCommentForm[i].addEventListener('submit', this.messages[i].createComment(commentObject))

                    this.resetCommentFormFields()
                    this.renderMessages()

                }
            }
            break;

            case "delete-message-button":
            for (let i=0; i < this.deleteMessageButton.length; i++) {
                console.log("this.messages[i]:", this.messages[i])
                if (e.target.id === this.deleteMessageButton[i].id) {

                    console.log("this.messages[i]:", this.messages[i])
                    console.log("this.deleteMessageButton[i]:", this.deleteMessageButton[i])
                    console.log("this.deleteMessageButton[i].id:", this.deleteMessageButton[i].id)

                    this.deleteMessageButton[i].addEventListener('click', this.messages[i].destroyMessage(e.target.id))
                    this.messageContainer[i].remove()
                    this.messages.splice(this.messages.indexOf(`${e.target.id}`, 1))
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

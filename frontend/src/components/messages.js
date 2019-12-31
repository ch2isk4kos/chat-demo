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
        // debugger
        // new message
        this.newMessageContainer = document.getElementById('new-message-container')
        this.newMessageContent = document.getElementById('new-message-content')
        this.newMessageCreator = document.getElementById('new-message-creator')
        this.newMessageForm = document.getElementById('new-message-form')

        // messages
        // this.messageContainer = document.getElementsByClassName('message-container')
        this.messagesContainer = document.getElementById('messages-container')
        // this.newCommentButtons = document.getElementsByClassName('new-comment-button')

        // new comment
        // this.newCommentContainer = document.getElementsByClassName('new-comment-container')
        this.newCommentForm = document.getElementById('new-comment-form')
        this.newCommentContent = document.getElementById('new-comment-content')
        this.newCommentCreator = document.getElementById('new-comment-creator')

        // new like

        // event listeners
        this.newMessageForm.addEventListener('submit', this.createMessage.bind(this))
        this.messagesContainer.addEventListener('click', this.renderCommentForm.bind(this))

        // this.messages.forEach(message => message.addEventListener('click', this.renderCommentForm.bind(this)))

        // this.newCommentButtons.addEventListener('click', this.renderCommentForm.bind(this))
        // this.newCommentForm.addEventListener('submit', this.createComment.bind(this))
    }

    // initEventHandlers() {
    //     this.newMessageSubmitButton.addEventListener('submit', this.createMessage.bind(this));
    // }

    renderCommentForm(e) {
        // e.preventDefault();

        switch(e.target.className) {
            case "new-comment-button":
                this.newCommentContainer = document.getElementsByClassName('new-comment-container')


                console.log("e.target:", e.target)
                console.log("e.target.dataset.id:", e.target.dataset.id)
                console.log("this.messages Array:", this.messages)
                console.log("message container:", this.messageContainer)
                // console.log(this.messageContainer.children)
                // console.log(this.messageContainer.childNodes)
                console.log("messages container:", this.messagesContainer)
                console.log("new comment container:", this.newCommentContainer)

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
                //     if (e.target.style.display === 'none') {
                //         e.target.style.display = 'block'
                //     } else {
                //         return;
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
                //     this.messageContainer.style.display = 'block';
                // })
            break

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
            this.resetFormFields()
            this.renderMessages()
        })
    }

    fetchAndLoadMessages() {
        // debugger
        this.adapter.getMessages()
        .then(messages => {
            messages.forEach(message => this.messages.push(new Message(message)))
        })
        .then(() =>
            this.renderMessages()
        )
        // .catch(error => console.log("error", error))
    }

    resetFormFields() {
        this.newMessageContent.value = ''
        this.newMessageCreator.value = ''
    }

    renderMessages() {
        this.messagesContainer.innerHTML = this.messages.map(message => message.renderMessage()).join('')
    }
}

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
        this.messagesContainer = document.getElementById('messages-container')
        this.newMessageContainer = document.getElementById('new-message-container')
        this.newMessageContent = document.getElementById('new-message-content')
        this.newMessageCreator = document.getElementById('new-message-creator')
        this.newMessageForm = document.getElementById('new-message-form')

        // messages
        // this.messageContainer = document.getElementsByClassName('message-container')
        // this.newCommentButtons = document.getElementsByClassName('new-comment-button')

        // new comment
        // this.newCommentContainer = document.getElementsByClassName('new-comment-container')
        this.newCommentForm = document.getElementById('new-comment-form')
        this.newCommentContent = document.getElementById('new-comment-content')
        this.newCommentCreator = document.getElementById('new-comment-creator')
        this.cancelCommentButtons = document.getElementsByClassName('cancel-comment-button')


        // new like

        // event listeners
        this.newMessageForm.addEventListener('submit', this.createMessage.bind(this))
        this.messagesContainer.addEventListener('click', this.renderCommentForm.bind(this))
        // this.newCommentContainer.addEventListener('click', this.cancelCommentForm.bind(this))
        // this.newCommentButtons.addEventListener('click', this.renderCommentForm.bind(this))

        // this.messages.forEach(message => message.addEventListener('click', this.renderCommentForm.bind(this)))

        // this.newCommentButtons.forEach(() => {
        //     this.messagesContainer.addEventListener('click', this.renderCommentForm.bind(this))
        // })
    }

    // initEventHandlers() {
    //     this.newMessageSubmitButton.addEventListener('submit', this.createMessage.bind(this));
    // }

    // renderCommentForm(e) {
    //     // e.preventDefault();
    //
    //     this.newCommentButtons = document.getElementsByClassName('new-comment-button')
    //     this.newCommentContainer = document.getElementsByClassName('new-comment-container')
    //
    //     for (let i=0; i < this.newCommentButtons.length; i++) {
    //         // console.log([i]);
    //         if (e.target.id === this.newCommentButtons[i].id) {
    //             this.newCommentContainer[i].style.display = 'block';
    //         }
    //     }
    // }

    // cancelCommentForm(e) {
    //     console.log('hide the comment form');
    //
    //     this.cancelCommentButtons = document.getElementsByClassName('cancel-comment-button')
    //     this.newCommentContainer = document.getElementsByClassName('new-comment-container')
    //
    //     for (let i=0; i < this.cancelCommentButtons.length; i++) {
    //         // console.log([i]);
    //         if (e.target.id === this.cancelCommentButton[i].id) {
    //             this.newCommentContainer[i].style.display = 'none';
    //         }
    //     }
    // }

    renderCommentForm(e) {
        // e.preventDefault();

        switch(e.target.className) {
            case "new-comment-button":

                this.newCommentButtons = document.getElementsByClassName('new-comment-button')
                this.newCommentContainer = document.getElementsByClassName('new-comment-container')

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
                        this.newCommentContainer[i].style.display = 'none';
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
        this.newMessageContent.value = '';
        this.newMessageCreator.value = '';
    }

    renderMessages() {
        this.messagesContainer.innerHTML = this.messages.map(message => message.renderMessage()).join('')
    }
}

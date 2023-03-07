class ChatContentDOM {
  constructor() {
    this.chatContent = document.querySelector(".chat-content");
  }

  appendChat(change) {
    const data = change.data();
    const datetime = data.created_at ? new Date(data.created_at.toDate()).toLocaleString() : "unknown";
    let isUser = "";

    if (localStorage.username && localStorage.username === data.username) {
      isUser = "chat-right";
    }

    this.chatContent.innerHTML += `<div class="chat ${isUser}" data-id="${change.id}">
                                        <span class="chat-text">
                                        ${data.username}: 
                                        ${data.chat_text}
                                        </span>
                                        <span class="chat-time">${datetime}</span>
                                    </div>`;
  }

  updateChat(id) {}

  removeChat(id) {}
}

export { ChatContentDOM };

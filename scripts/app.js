import { ChatModel } from "./ChatModel.js";

const userForm = document.querySelector(".user-form");
const categories = document.querySelector(".categories ul");
const chatForm = document.querySelector(".chat-form");
const chatContent = document.querySelector(".chat-content");
const Chat = new ChatModel();

userForm.username.value = localStorage.username ?? "unknown";

alert("You're login as: " + userForm.username.value);

userForm.addEventListener("submit", (e) => {
  e.preventDefault();
  localStorage.setItem("username", userForm.username.value);
  document.location.reload();
});

categories.addEventListener("click", (e) => {
  //remove child
  chatContent.innerHTML = "";

  //delete active class first
  Array.from(categories.children).forEach((list) => {
    if (list.classList.contains("item-active")) {
      list.classList.remove("item-active");
    }
  });

  //add active class to selected element
  if (e.target.tagName === "LI") {
    e.target.classList.add("item-active");
    const target = e.target.innerHTML.replace("#", "");

    //update localstorage
    localStorage.setItem("category", target);

    // subs real-data
    Chat.subscribeFireDoc(target);
  }
});

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // set category
  if (localStorage.category) {
    const data = {
      username: localStorage.getItem("username") ?? "anonym",
      chat_text: chatForm.chat_text.value,
    };

    Chat.addFireDoc(localStorage.category, data);
  } else {
    alert("please choose category first");
  }

  chatForm.reset();
});

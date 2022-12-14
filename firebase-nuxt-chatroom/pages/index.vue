<script setup>
import firebase from "firebase/compat";
const db = firebase.firestore()

import { getDatabase, ref as fRef, set as fSet, onValue } from "firebase/database";
const rdb = getDatabase();

import {reactive, ref} from "vue";

const message = ref('')
const username = ref('')
const email = ref('')
const openSignUpWindow = ref(true)
const messageList = reactive([])
const haveUsername = ref(false)

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    haveUsername.value = true
    username.value = user.email.split('@')[0].replace(/\./g, '')
    email.value = user.email
  } else {
    haveUsername.value = false
  }
})

const sendMessagesV2 = async () => {

  const time = new Date().getTime().toString()

  await fSet(fRef(rdb, 'messages/' + time), {
    username: username.value,
    message: message.value,
    email: email.value,
    time: new Date().getTime()
  })
  message.value = ''
}

const getMessagesV2 = async () => {
  const messages = await fRef(rdb, 'messages/')
  onValue(messages, (snapshot) => {
    const data = snapshot.val()
    messageList.splice(0, messageList.length)
    for (const key in data) {
      messageList.push(data[key])
    }
  })
}

const fetchUser = (user) => {
  openSignUpWindow.value = false
}

const sendMessage = async () => {
  await db.collection("messages").add({
    username: username.value,
    message: message.value,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  })
  message.value = ''
}

const getMessages = async () => {
  const messages = await db.collection("messages").orderBy("timestamp", "asc").get()
  messageList.splice(0, messageList.length)
  messages.docs.map(doc => {
    messageList.push(doc.data())
  })
  return messages.docs.map(doc => doc.data())
}

const setUsername = (name) => {
  haveUsername.value = true
  username.value = name
}


const parseTimeV2 = (time) => {
  const date = new Date(parseInt(time))
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()
  return `${hours}:${minutes}:${seconds}`
}

setInterval(() => {
  getMessagesV2()
  console.log(messageList)
}, 1000)

</script>

<template>
  <div class="container mx-auto">
    <SignUp v-if="openSignUpWindow" @returnUser="fetchUser"/>
    <div v-else class="max-w-2xl border rounded">
      <div class="w-full">
        <div class="flex items-center p-3 border-b border-gray-300">
          <img class="object-cover w-10 h-10 rounded-full"
               src="https://media.macosicons.com/parse/files/macOSicons/8bdf3446f7274981ba7912638c1dbeb6_low_res_Messages__Catalina_.png"
               alt="username"/>
          <span class="block ml-2 font-bold text-gray-600">???? Chatroom</span>
        </div>

        <div class="flex flex-col relative w-full p-6 overflow-auto h-96">
          <ul class="space-y-2">


            <div v-for="msg in messageList">
              <ChatBubble v-if="msg.username !== username" :from="msg.username" :text="msg.message" :time="parseTimeV2(msg.time)"/>
              <MineBubble v-else :text="msg.message" :time="parseTimeV2(msg.time)"/>
            </div>


          </ul>
        </div>

        <div class="flex items-center justify-between w-full p-3 border-t border-gray-300">

          <input type="text"
                 :placeholder="'Send Message as ' + username"
                 v-if="haveUsername"
                 v-model="message"
                 v-on:keyup.enter="sendMessagesV2"
                 class="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
                 name="message"
                 required
          />

          <input type="text"
                 placeholder="Tell us your name"
                 v-else
                 v-on:keyup.enter="setUsername($event.target.value)"
                 class="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
                 name="message"
                 required
          />


          <button v-if="haveUsername" @click="sendMessagesV2" type="submit">
            <svg class="w-5 h-5 text-gray-500 origin-center transform rotate-90" xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 20 20" fill="currentColor">
              <path
                d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"/>
            </svg>
          </button>

        </div>
      </div>
    </div>
  </div>


</template>


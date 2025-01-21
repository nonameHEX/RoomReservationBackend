<script setup lang="ts">
import { ref, onMounted } from "vue"
import axios from "axios"
import config from "../config"
import {useNotificationService} from "@/composables/useNotificationService";

const notifications = ref<any[]>([])
const userId = ref<string>('')
const newNotification = ref<string>('')

const notificationService = useNotificationService()

async function fetchNotifications() {
  try {
    console.log("pre notification fetch")
    const response = await axios.get(`${config.notificationBackendUrl}/notifications`)
    notifications.value = response.data
    console.log("post notification fetch")
  } catch (error) {
    console.error("Error fetching notifications:", error)
  }
}

async function createNotification() {
  if (newNotification.value.trim() === '') return; // Prevent empty notifications
  if (!userId.value) {
    console.error('User ID is required');
    return;
  }
  try {
    const response = await axios.post(`${config.notificationBackendUrl}/notifications`, {
      userId: userId.value,
      message: newNotification.value
    })
    notifications.value.push(response.data)
    newNotification.value = ''
  } catch (error) {
    console.error("Error creating notification:", error)
  }
}

onMounted(() => {
  fetchNotifications()
  notificationService.init()
  userId.value = "c10000000000000000000000"
})
</script>

<template>
  <div>
    <div>
      <input v-model="newNotification" placeholder="Zadejte novou notifikaci" />
      <button @click="createNotification">Vytvořit notifikaci</button>
    </div>

    <h1>Notifikace</h1>
    <ul>
      <li v-for="notification in notifications" :key="notification.notificationId">
        <strong>{{ notification.message }}</strong> - Vytvořeno: {{ notification.created }}
        <button @click="notificationService.reBroadcast(notification.message)">Odeslat znovu</button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 10px 0;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

input {
  padding: 5px;
  margin-right: 10px;
}

button {
  padding: 5px 10px;
}
</style>
<script setup lang="ts">
import {onMounted, ref} from "vue"
import {Room} from "@/model/Room"
import {useRoomService} from "@/composables/useRoomService"

const rooms = ref<Room[]>([])

const newRoom = ref({
  name: '',
  capacity: 0,
  location: '',
  pricePerHour: 0,
  equipment: [],
})

async function fetchRooms() {
  try {
    console.log("Fetching rooms...")
    rooms.value = await useRoomService.getAllRooms()
  } catch (error) {
    console.error("Error fetching rooms:", error)
  }
}

async function deleteRoom(roomId: string) {
  try {
    console.log(`Deleting room with ID: ${roomId}`)
    const response = await useRoomService.deleteRoom(roomId)
    if (response === 204) {
      rooms.value = rooms.value.filter(room => room.id !== roomId)
      console.log("Room deleted successfully")
    } else {
      console.error("Failed to delete room")
    }
  } catch (error) {
    console.error("Error deleting room:", error)
  }
}

async function createRoom() {
  try {
    const roomData = {
      name: newRoom.value.name,
      capacity: newRoom.value.capacity,
      location: newRoom.value.location,
      pricePerHour: newRoom.value.pricePerHour,
      equipment: newRoom.value.equipment.split(',').map(item => item.trim()),
      ownerId: 'b00000000000000000000002' // bude se poté brát z jwt tokenu až bude auth
    }

    const response = await useRoomService.createRoom(roomData)
    console.log('Room created successfully', response)

    newRoom.value = { name: '', capacity: 0, equipment: [], location: '', pricePerHour: 0 }
    await fetchRooms()
  } catch (error) {
    console.error('Error creating room:', error)
  }
}

onMounted(() => {
  fetchRooms()
})
</script>

<template>
  <div style="display: flex; justify-content: space-between;">

    <!-- List of Rooms -->
    <div style="flex: 1;">
      <h1>Seznam místností</h1>
      <ul>
        <li v-for="room in rooms" :key="room.id">
          <router-link :to="{ name: 'room-detail', params: { roomId: room.id } }">
            <strong>{{ room.name }}</strong>
          </router-link>
          - Kapacita: {{ room.capacity }} - Cena: {{ room.pricePerHour }} CZK/h
          <button @click="deleteRoom(room.id)">Smazat</button>
        </li>
      </ul>
    </div>

    <!-- Room Creation Form -->
    <div style="width: 300px; padding: 20px; background-color: #000000; border-radius: 8px;">
      <h2>Přidat místnost</h2>
      <form @submit.prevent="createRoom">
        <div>
          <label for="name">Název místnosti</label>
          <input v-model="newRoom.name" type="text" id="name" required />
        </div>
        <div>
          <label for="capacity">Kapacita</label>
          <input v-model="newRoom.capacity" type="number" id="capacity" required />
        </div>
        <div>
          <label for="location">Lokalita</label>
          <input v-model="newRoom.location" type="text" id="location" required />
        </div>
        <div>
          <label for="pricePerHour">Cena za hodinu</label>
          <input v-model="newRoom.pricePerHour" type="number" id="pricePerHour" required />
        </div>
        <div>
          <label for="equipment">Vybavení (seznam)</label>
          <input v-model="newRoom.equipment" type="text" id="equipment" placeholder="seznam, oddělený čárkou" />
        </div>
        <button type="submit">Přidat místnost</button>
      </form>
    </div>

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

button {
  background-color: red;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  margin-left: 10px;
}

form {
  display: flex;
  flex-direction: column;
}

form div {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}

button[type="submit"] {
  margin-top: 10px;
}

button:hover {
  background-color: #45a049;
}
</style>
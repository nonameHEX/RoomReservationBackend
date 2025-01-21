<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useRoute } from "vue-router"
import {Room} from "@/model/Room"
import {useRoomService} from "@/composables/useRoomService"
import {useReservationService} from "@/composables/useReservationService";

const room = ref<Room | null>(null)
const route = useRoute()

const isEditing = ref(false)

const newReservation = ref({
  userId: '',
  roomId: '',
  from: new Date().toISOString().slice(0, 16),
  to: new Date(new Date().getTime() + 60 * 60 * 1000).toISOString().slice(0, 16),
  status: 'unconfirmed',
  totalPrice: 0
})

async function fetchRoomData() {
  const roomId = route.params.roomId as string
  newReservation.value.roomId = roomId
  console.log("Fetching room with id " + roomId)
  try {
    room.value = await useRoomService.getRoomById(roomId)
  } catch (error) {
    console.error("Error fetching room detail:", error)
  }
}

async function saveChanges() {
  if (room.value) {
    console.log(`Updating room with ID: ${room.value.id}`)
    try {
      await useRoomService.updateRoom(room.value.id, room.value)
      isEditing.value = false
    } catch (error) {
      console.error("Error updating room:", error)
    }
  }
}

async function createReservation() {
  try {
    const newReservationData = await useReservationService.createReservation(newReservation.value)

    if (newReservationData) {
      console.log('Reservation created successfully', newReservationData)
      await fetchRoomData()
    } else {
      console.error('Failed to create reservation, no reservation data returned')
    }
  } catch (error) {
    console.error('Error creating reservation:', error)
  }
}

onMounted(() => {
  fetchRoomData()
})
</script>

<template>
  <div v-if="room">
    <h1>{{ room.name }}</h1>
    <div v-if="isEditing">
      <label for="name">Název:</label>
      <input v-model="room.name" id="name" type="text" />

      <label for="capacity">Kapacita:</label>
      <input v-model="room.capacity" id="capacity" type="number" />

      <label for="location">Lokalita:</label>
      <input v-model="room.location" id="location" type="text" />

      <label for="pricePerHour">Cena za hodinu:</label>
      <input v-model="room.pricePerHour" id="pricePerHour" type="number" />

      <label for="equipment">Zařízení:</label>
      <input v-model="room.equipment" id="equipment" type="text" />
    </div>
    <div v-else>
      <p><strong>Kapacita:</strong> {{ room.capacity }}</p>
      <p><strong>Lokalita:</strong> {{ room.location }}</p>
      <p><strong>Za hodinu:</strong> {{ room.pricePerHour }} CZK</p>
      <p><strong>Zařízení:</strong> {{ room.equipment.join(", ") }}</p>
      <!-- Seznam rezervací pro místnost -->
      <h3>Rezervace:</h3>
      <table v-if="room.reservations && room.reservations.length">
        <thead>
        <tr>
          <th>ID Uživatel</th>
          <th>Od</th>
          <th>Do</th>
          <th>Cena</th>
          <th>Status</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="reservation in room.reservations" :key="reservation.id">
          <td>{{ reservation.userId }}</td>
          <td>{{ new Date(reservation.from).toLocaleString() }}</td>
          <td>{{ new Date(reservation.to).toLocaleString() }}</td>
          <td>{{ reservation.totalPrice }} CZK</td>
          <td>{{ reservation.status }}</td>
        </tr>
        </tbody>
      </table>
      <p v-else>Žádné rezervace k zobrazení.</p>
    </div>
    <div>
      <button @click="isEditing = !isEditing">
        {{ isEditing ? "Zrušit" : "Upravit" }}
      </button>
      <button v-if="isEditing" @click="saveChanges">Uložit změny</button>
    </div>

    <!-- Reservation Form -->
    <div>
      <h2>Rezervovat tuto místnost</h2>
      <form @submit.prevent="createReservation">
        <div>
          <label for="userId">Uživatelské ID</label>
          <input v-model="newReservation.userId" type="text" id="userId" required />
        </div>
        <div>
          <label for="from">Od (datum a čas)</label>
          <input v-model="newReservation.from" type="datetime-local" id="from" required />
        </div>
        <div>
          <label for="to">Do (datum a čas)</label>
          <input v-model="newReservation.to" type="datetime-local" id="to" required />
        </div>
        <div>
          <label for="totalPrice">Celková cena</label>
          <input v-model="newReservation.totalPrice" type="number" id="totalPrice" required />
        </div>
        <button type="submit">Přidat rezervaci</button>
      </form>
    </div>

  </div>
  <div v-else>
    <p>Načítání detailů místnosti...</p>
  </div>
</template>

<style scoped>
h1 {
  text-align: center;
  margin-bottom: 20px;
}
input {
  margin-bottom: 10px;
  display: block;
}
button {
  margin-top: 10px;
}
form {
  margin-top: 20px;
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
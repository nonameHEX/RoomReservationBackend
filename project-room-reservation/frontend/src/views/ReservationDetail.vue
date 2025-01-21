<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useRoute } from "vue-router"
import {Reservation} from "@/model/Reservation"
import {useReservationService} from "@/composables/useReservationService"

const reservation = ref<Reservation | null>(null)
const route = useRoute()

const isEditing = ref(false)

async function fetchReservationData() {
  const reservationId = route.params.reservationId as string
  console.log("Fetching reservation with id " + reservationId)
  try {
    reservation.value = await useReservationService.getReservationById(reservationId)
  } catch (error) {
    console.error("Error fetching reservation detail:", error)
  }
}

async function saveChanges() {
  if (reservation.value) {
    console.log(`Updating reservation with ID: ${reservation.value.id}`)
    try {
      await useReservationService.updateReservation(reservation.value.id, reservation.value)
      isEditing.value = false
    } catch (error) {
      console.error("Error updating reservation:", error)
    }
  }
}

onMounted(() => {
  fetchReservationData()
})
</script>

<template>
  <div v-if="reservation">
    <h1>Detail rezervace</h1>
    <div v-if="isEditing">
      <label for="from">Od:</label>
      <input
          v-model="reservation.from"
          id="from"
          type="datetime-local"
          :value="reservation.from ? reservation.from.slice(0, 16) : ''"
      />

      <label for="to">Do:</label>
      <input
          v-model="reservation.to"
          id="to"
          type="datetime-local"
          :value="reservation.to ? reservation.to.slice(0, 16) : ''"
      />

      <label for="totalPrice">Celková cena:</label>
      <input v-model="reservation.totalPrice" id="totalPrice" type="number" />

      <label for="status">Status:</label>
      <input v-model="reservation.status" id="status" type="text" />
    </div>
    <div v-else>
      <p><strong>Místnost:</strong> {{ reservation.roomId }}</p>
      <p><strong>Od:</strong> {{ reservation.from }}</p>
      <p><strong>Do:</strong> {{ reservation.to }}</p>
      <p><strong>Celková cena:</strong> {{ reservation.totalPrice }} CZK</p>
      <p><strong>Status:</strong> {{ reservation.status }}</p>
    </div>

    <div>
      <button @click="isEditing = !isEditing">
        {{ isEditing ? "Zrušit" : "Upravit" }}
      </button>
      <button v-if="isEditing" @click="saveChanges">Uložit změny</button>
    </div>
  </div>
  <div v-else>
    <p>Načítání detailů rezervace...</p>
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
</style>
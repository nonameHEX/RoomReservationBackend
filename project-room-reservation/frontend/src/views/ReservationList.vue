<script setup lang="ts">
import {onMounted, ref} from "vue"
import {Reservation} from "@/model/Reservation"
import {useReservationService} from "@/composables/useReservationService";

const reservations = ref<Reservation[]>([])

async function fetchReservations() {
  try {
    console.log("Fetching reservations...");
    reservations.value = await useReservationService.getAllReservations();
  } catch (error) {
    console.error("Error fetching reservations:", error);
  }
}

async function deleteReservation(reservationId: string) {
  try {
    console.log(`Deleting reservation with ID: ${reservationId}`);
    const response = await useReservationService.deleteReservation(reservationId);
    if (response === 204) {
      reservations.value = reservations.value.filter(reservation => reservation.id !== reservationId);
      console.log("Reservation deleted successfully");
    } else {
      console.error("Failed to delete reservation");
    }
  } catch (error) {
    console.error("Error deleting reservation:", error);
  }
}

onMounted(() => {
  fetchReservations()
})
</script>

<template>
  <div>
    <h1>Seznam rezervací</h1>
    <ul>
      <li v-for="reservation in reservations" :key="reservation.id">
        <router-link :to="{ name: 'reservation-detail', params: { reservationId: reservation.id } }">
          Místnost: {{ reservation.roomId }}
        </router-link>
        | Datum: {{ reservation.from }} - {{ reservation.to }} | Cena: {{ reservation.totalPrice }} CZK
        <button @click="deleteReservation(reservation.id)">Smazat</button>
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
</style>
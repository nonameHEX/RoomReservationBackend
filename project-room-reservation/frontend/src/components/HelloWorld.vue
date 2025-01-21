<script setup>
import {onMounted, ref} from "vue";
import {useAuth} from "@/composables/useAuth";

let loading = ref(true)

const auth = useAuth()

onMounted(async () => {
  await auth.init()
  loading.value = false
})
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>
      You’ve successfully created a project with
      <a href="https://vite.dev/" target="_blank" rel="noopener">Vite</a> +
      <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>.

      <p v-if="auth.state.authenticated">Welcome, {{ auth.getUsername() }}!</p>
      <button v-else @click="auth.login()">Log in</button>
      <button @click="auth.logout()">Log out</button>

    </h3>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>

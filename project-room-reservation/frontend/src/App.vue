<script setup>
import {onMounted, ref} from "vue";
import {useNotificationService} from "@/composables/useNotificationService";

const notificationService = useNotificationService()

let loading = ref(true)

onMounted(async () => {
  await notificationService.init()
  loading.value = false
})
</script>

<template>
  <div v-if="loading">Loading...</div>
  <div v-else>
    <header>
      <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/rooms">Místnosti</RouterLink>
        <RouterLink to="/reservations">Rezervace</RouterLink>
        <RouterLink to="/notifications">Notifikace</RouterLink>
      </nav>
    </header>
    <RouterView />
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}
</style>

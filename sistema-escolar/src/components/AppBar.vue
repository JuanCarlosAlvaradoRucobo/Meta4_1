<!-- NavBar.vue -->
<template>
  <div>
    <v-app-bar color="dark" elevation="1">
      <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="text-white">Dashboard</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" temporary>
      <v-list>
        <v-list-item
          v-for="(item, i) in menuItems"
          :key="i"
          :to="item.path"
          :prepend-icon="item.icon"
          :title="item.title"
          @click="drawer = false"
        >
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const drawer = ref(false)
const menuItems = ref([
  {
    title: 'Dashboard',
    icon: 'mdi-view-dashboard',
    path: '/'
  },
  {
    title: 'Estudiantes',
    icon: 'mdi-account-group',
    path: '/estudiantes'
  },
  {
    title: 'Cursos',
    icon: 'mdi-book-open-variant',
    path: '/cursos'
  },
  {
    title: 'Maestros',
    icon: 'mdi-clipboard-text',
    path: '/maestros'
  }
])

const toggleDrawer = () => {
  drawer.value = !drawer.value
}
</script>
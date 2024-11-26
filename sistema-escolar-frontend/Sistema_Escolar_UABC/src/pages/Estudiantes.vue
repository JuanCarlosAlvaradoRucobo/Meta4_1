<script setup>
import AppBar from '@/components/AppBar.vue'
import UserListScroll from '@/components/UserListScroll.vue';
import addStudent from '@/components/addStudent.vue';
</script>
<template>
<v-app>
    <!-- Componente de Navegación -->
    <AppBar />
    
    <!-- Contenido Principal -->
    <v-main class="pa-0">
      <UserListScroll />
    </v-main>
   <addStudent/>
  </v-app>
</template>
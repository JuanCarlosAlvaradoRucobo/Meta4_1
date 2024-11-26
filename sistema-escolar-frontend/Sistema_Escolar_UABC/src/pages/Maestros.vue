<script setup>
import AppBar from '@/components/AppBar.vue'
import UserListTeachers from '@/components/UserListTeachers.vue';
import addMaestro from '@/components/addTeacher.vue';
</script>
<template>
<v-app>
    <!-- Componente de Navegación -->
    <AppBar />
    
    <!-- Contenido Principal -->
    <v-main class="pa-0">
      <UserListTeachers />
    </v-main>
   <addMaestro/>

  </v-app>
</template>
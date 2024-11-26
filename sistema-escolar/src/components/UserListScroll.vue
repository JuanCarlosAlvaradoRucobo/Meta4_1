<!-- UserList.vue -->
<template>
  <div class="user-list-container">
    <v-list class="grey-darken-4">
      <v-list-item
        v-for="user in users"
        :key="user.id"
        class="mt-2"
      >
        <template v-slot:prepend>
          <v-avatar color="blue" size="40">
            <v-icon color="white">mdi-account</v-icon>
          </v-avatar>
        </template>

        <v-list-item-title class="text-white">{{ user.name }}</v-list-item-title>
        <v-list-item-subtitle class="text-grey">{{ user.role }}</v-list-item-subtitle>

        <template v-slot:append>
          <v-btn
            icon="mdi-pencil"
            variant="text"
            size="small"
            color="white"
            class="mr-2"
            @click="editItem(user)"
          ></v-btn>
          <v-btn
            icon="mdi-delete"
            variant="text"
            size="small"
            color="red"
            @click="deleteItem(user)"
          ></v-btn>
        </template>
      </v-list-item>
    </v-list>
  </div>

  <add/>
</template>

<script setup>
import { ref } from 'vue';
import add from '@/components/addStudent.vue';
const alumnos = ref([]);
const overlay = ref(false); // Controlador del overlay
  const fetchalumnos = async () => {
    overlay.value = true; // Mostrar overlay al iniciar la carga
    try {
      const response = await axios.get('http://localhost:3001/api/alumnos'); // URL de tu API
      alumnos.value = response.data; // Asignar los datos obtenidos
    } catch (error) {
      console.error('Error al obtener cursos:', error);
      alumnos.value = [];
    } finally {
      overlay.value = false; // Ocultar overlay al terminar la carga
    }
  };
const editItem = (item) => {
  console.log('Editar:', item)
}

const deleteItem = (item) => {
  console.log('Eliminar:', item)
}
</script>

<style scoped>
.user-list-container {
  margin-top: 64px; /* Altura del v-app-bar */
  height: calc(100vh - 64px);
  overflow-y: auto;
}

.v-list-item {
  transition: background-color 0.2s;
}

.v-list-item:hover {
  background-color: rgba(255, 255, 255, 0.05);
}
</style>
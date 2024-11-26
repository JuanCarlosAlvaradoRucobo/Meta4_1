<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import axios from 'axios';

export default {
  name: "App",
  mounted() {
    this.verificarServidor();
  },
  methods: {
    async verificarServidor() {
      try {
        const response = await axios.get('http://localhost:3001');
        console.log(response.data); // Debería mostrar "Servidor activo"
      } catch (error) {
        console.error('Error conectando con el servidor:', error.message);
      }
    }
  }
};
</script>
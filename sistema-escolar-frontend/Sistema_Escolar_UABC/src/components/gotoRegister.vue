<template>
    <v-app>
      <v-container>
        <!-- Contenido de tu página -->
  
        <!-- Botón abajo a la izquierda -->
        <v-btn
          :to="'/register'"
          class="boton-registrar"
          color="dark-blue"
          dark
          absolute
          bottom
          left
        >
          Registrate
        </v-btn>
      </v-container>
    </v-app>
  </template>
  
  <script>
  export default {
    // Tu configuración de script si es necesario
  };
  </script>
  
  <style scoped>
  .boton-registrar {
    position: fixed;
    right: 600px;
    background-color: #003366; /* Azul oscuro personalizado */
    color: #ffffff; /* Letras claras */
  }
  </style>
  
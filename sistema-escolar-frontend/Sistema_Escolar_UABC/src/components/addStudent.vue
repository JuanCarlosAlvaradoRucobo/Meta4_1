<template>
    <v-app>
      <v-container>
        <!-- Botón para agregar -->
        <v-btn
          class="boton-anadir"
          color="dark-blue"
          dark
          fixed
          bottom
          left
          :to="'/anadirEstudiante'"
        >
          Añadir
        </v-btn>
      </v-container>
    </v-app>
  </template>
  
  <script>
  export default {
    methods: {

    }
  };
  </script>
  
  <style scoped>
  .boton-anadir {
    position: fixed;
    bottom: 20px;
    left: 20px;
    background-color: #003366; /* Azul oscuro */
    color: #ffffff; /* Letras claras */
  }
  </style>
  
<template>
     <v-app>
        <v-container>
    <v-btn :to="'/'" class="return" color="dark-blue"
          dark
          absolute
          bottom
          left>Home</v-btn>
     </v-container>
    </v-app>   
</template>

<style scoped>
.return {
  position: fixed;
  right: 600px;
  background-color: #003366; /* Azul oscuro personalizado */
  color: #ffffff; /* Letras claras */
}
</style>
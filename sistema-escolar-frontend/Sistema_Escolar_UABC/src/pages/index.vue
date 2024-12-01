<template>

  <v-main class="pa-0">
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <v-img    
            src="https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            cover
          ></v-img>
        </v-col>
        <v-col cols="12" md="6">
          <v-card class="mx-auto pa-4" max-width="800">
            <v-card-title class="text-h5 mb-4">
              Portal de Alumnos
            </v-card-title>
            <v-card-text> 
              <p class="text-body-1">
               Favor de registrarse.             
              </p>              
            </v-card-text>
            <v-card-actions>
              <BtnGoogleLogin> </BtnGoogleLogin>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>   
  
</template>

<script setup>
import BtnGoogleLogin from '@/components/BtnGoogleLogin.vue';
  
</script>

<template>
    <div>
      <div ref="googleLoginBtn" class="btn_google"></div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  const googleLoginBtn = ref(null);
  
  async function handleGoogleResponse(credential) {
    try {
      const response = await fetch('http://localhost:3000/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${credential}`
        },
        credentials: 'include'
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      // Guardar el token o manejar la sesión
      // Por ejemplo:
      localStorage.setItem('user', JSON.stringify(data));
      router.push('/dashboard'); // o donde quieras redirigir después del login
    } catch (error) {
      console.error('Error durante el login:', error);
    }
  }
  
  function onSuccess(response) {
    console.log(response.credential);
    handleGoogleResponse(response.credential);
  }
  
  onMounted(() => {
    // Asegurar que el script de Google está cargado
    if (typeof google === 'undefined') {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
      script.onload = initializeGoogle;
    } else {
      initializeGoogle();
    }
  });
  
  function initializeGoogle() {
    window.google.accounts.id.initialize({
      client_id: "453365147539-lu4djoosnqbm62vtjtgq9cgbgve7q1cb.apps.googleusercontent.com",
      callback: onSuccess,
      context: 'signin',
      auto_select: false,
      referrerPolicy: 'strict-origin-when-cross-origin'
    });
  
    window.google.accounts.id.renderButton(
      googleLoginBtn.value, 
      {
        text: 'signin_with',
        size: 'large',
        width: '366',
        theme: 'outline',
        logo_alignment: 'center'
      }
    );
  }
  </script>
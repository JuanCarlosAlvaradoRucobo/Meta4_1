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
    console.log('Enviando credencial a backend:', credential);
    
    const response = await fetch('http://localhost:3001/api/auth/google', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${credential}`
      },
      body: JSON.stringify({ token: credential }),
      credentials: 'include',
      mode: 'cors'
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    const data = await response.json();
    console.log('Respuesta del servidor:', data);

    if (data.success) {
      // Guardar el token y la información del usuario
      localStorage.setItem('authToken', credential);
      localStorage.setItem('userData', JSON.stringify(data.user));
      
      // Redireccionar al usuario
      router.push('/inicio');
    } else {
      throw new Error(data.message || 'Error en la autenticación');
    }
  } catch (error) {
    console.error('Error en la autenticación:', error);
    router.push('/inicio');
    // Aquí puedes manejar el error como prefieras (mostrar un mensaje, etc.)
  }
}

function onSuccess(response) {
  if (response.credential) {
    console.log('Google Sign-In exitoso');
    handleGoogleResponse(response.credential);
  } else {
    console.error('No se recibió credencial de Google');
  }
}

function initializeGoogle() {
  if (!window.google) {
    console.error('Google API no está disponible');
    return;
  }

  window.google.accounts.id.initialize({
    client_id: "453365147539-lu4djoosnqbm62vtjtgq9cgbgve7q1cb.apps.googleusercontent.com",
    callback: onSuccess,
    context: 'signin',
    auto_select: false,
    ux_mode: 'popup',
    referrerPolicy: 'strict-origin-when-cross-origin'
  });

  if (googleLoginBtn.value) {
    window.google.accounts.id.renderButton(
      googleLoginBtn.value,
      {
        type: 'standard',
        theme: 'outline',
        size: 'large',
        text: 'signin_with',
        shape: 'rectangular',
        logo_alignment: 'center',
        width: 366
      }
    );
  }
}

onMounted(() => {
  const script = document.createElement('script');
  script.src = 'https://accounts.google.com/gsi/client';
  script.async = true;
  script.defer = true;
  
  script.onload = () => {
    console.log('Script de Google cargado');
    initializeGoogle();
  };
  
  script.onerror = () => {
    console.error('Error al cargar el script de Google');
  };

  document.head.appendChild(script);
});
</script>

<style scoped>
.btn_google {
  display: flex;
  justify-content: center;
  margin: 1rem 0;
}
</style>
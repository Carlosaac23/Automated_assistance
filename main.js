// Función para detectar el IMEI
async function detectIMEI() {
  try {
    // Para dispositivos móviles, podemos intentar acceder al IMEI a través de la API de navegación
    if (navigator && navigator.IMEI) {
      const imei = await navigator.IMEI.request();
      document.getElementById('imei-info').innerText = `Tu IMEI: ${imei}`;
    } else {
      document.getElementById('imei-info').innerText = 'No se pudo detectar el IMEI en este dispositivo';
    }
  } catch (error) {
    console.error('Error detectando el IMEI:', error);
    document.getElementById('imei-info').innerText = 'Ocurrió un error al intentar detectar el IMEI';
  }
}

// Ejecutar la función al cargar la página
window.onload = detectIMEI;

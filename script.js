const workers = [
  { id: 'device1', name: 'Carlos Acosta' },
  { id: 'device2', name: 'Mafe Cespedes' },
  { id: 'device3', name: 'Pepito Perez' },
];

const urlParams = new URLSearchParams(window.location.search);
const deviceId = urlParams.get('id');

const worker = workers.find(w => w.id === deviceId);

if (worker) {
  document.getElementById('workerInfo').innerText = `Hola, ${worker.name}`;
  document.getElementById('attendanceForm').onsubmit = e => {
    e.preventDefault();
    const attendanceData = {
      name: worker.name,
      time: new Date().toLocaleString(),
    };

    // URL web del App Script de Google
    const webAppUrl = 'https://script.google.com/macros/s/AKfycbyPbPPCfDnYaiXovG69YJo-hJFSVWBgWh9xgENiEfrEmf046NiGgt0wo-zY3FfZ184m/exec';

    fetch(webAppUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(attendanceData),
    })
      .then(response => {
        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
        return response.json();
      })
      .then(data => {
        alert(data.message);
      })
      .catch(error => {
        console.error('Error: ', error);
        alert('Hubo un problema al registrar la asistencia.');
      });
  };
}

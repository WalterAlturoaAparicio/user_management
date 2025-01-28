const { Kafka } = require('kafkajs');

// Configuración del cliente Kafka
const kafka = new Kafka({
  clientId: 'test-producer',
  brokers: ['0.0.0.0:9092'], // Cambia esto por la IP de tu contenedor si no funciona localhost
});

async function sendMessage() {
  const producer = kafka.producer(); // Crea un productor

  try {
    console.log('Conectando al productor...');
    await producer.connect();
    console.log('Productor conectado.');

    // Envía un mensaje a un tópico
    const topic = 'log_topic'; // Cambia esto al nombre de tu tópico
    const message = { value: 'Hola Kafka desde Node.js!' };

    await producer.send({
      topic,
      messages: [message],
    });

    console.log(`Mensaje enviado a "${topic}": ${message.value}`);
  } catch (error) {
    console.error('Error al enviar el mensaje:', error);
  } finally {
    await producer.disconnect();
    console.log('Productor desconectado.');
  }
}

sendMessage();

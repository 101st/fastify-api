const timeout = (ms) => new Promise(res => {
  setTimeout(res, ms)
})
// ESM
import axios from 'axios';
import Fastify from 'fastify';
const fastify = Fastify({
  logger: true
})

fastify.register(require('@fastify/cors'), {
  // put your options here
})

// Declare a route
fastify.get('/:id', async function ({ params: { id } }, reply) {
  const ms = Math.floor(Math.random() * 10000)
  await timeout(ms);
  const { status, data } = await axios.get(`https://jsonplaceholder.typicode.com/photos/${id}`);
  if (status === 200) {
    reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send(Object.assign({ ms, data }));
  }
})

// Run the server!
fastify.listen(8080, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  // Server is now listening on ${address}
})
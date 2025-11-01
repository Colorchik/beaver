import { PrismaClient } from './generated/prisma/index.js'
import fastify from 'fastify'
dotenv.config()


const prisma = new PrismaClient()
const app = fastify()

const PORT = process.env.PORT || 3000


app.get('/', (req, res) => {
  res.send('Hello World')
})

const start = async () => {
    try {
      await app.listen({ port: PORT, host: '0.0.0.0' })
      console.log(`🚀 Сервер запущен на http://localhost:${PORT}`)
          } catch (err) {
      app.log.error(err)
      process.exit(1)
    }
  }
  
  start()


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

export default prisma
import http from "http"
const processId = process.pid

const server = http.createServer((request, response) => {
    for(let index = 0; index < 1e7; index++)
    response.end(`handle by pid: ${processId}`)
})

server.listen(3000)
.once("listening", () => {
    console.log("Server started in process", processId)
})

// aguardar as conexoes serem encerradas para só então encerrar o programa.

process.on("SIGTERM", () => {
    console.log(">>>> Server ending ~\n\n", new Intl.DateTimeFormat('pt-br', { dateStyle: 'full', timeStyle: 'long' }).format(Date.now()))
    server.close(() => process.exit())
})
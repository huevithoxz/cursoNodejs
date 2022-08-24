const http = require('http')
const PORT =  process.env.PORT
const server = http.createServer((req,res)=>{
    console.log('method',req.method)
    console.log('method',req.url)

    if(req.method === 'GET')
    {
        res.setHeader('Content-Type', 'application/json')
        res.writeHead(200)
       return res.end(JSON.stringify({message:`You have used GET method with the url: ${req.url}`}))
    }
 
    res.end()
})

server.listen(PORT,()=>{

    console.log(`server running at port :${PORT}`)
})
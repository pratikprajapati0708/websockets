import WebSocket,{WebSocketServer} from "ws";
import http from 'http'

//creating an https Server in ws

const server  = http.createServer(function(req,res){
    console.log((new Date()) + 'Received Request for '+ req.url);
    res.end('Hi there');
})

//creating instamce of websocket server

const wss = new WebSocketServer({server});

wss.on('connection',function connection(ws){
    ws.on('error',console.error);

    ws.on('message',function message(data,isBinary){
        wss.clients.forEach(function each(client){
            if(client.readyState === WebSocket.OPEN){
                client.send(data,{binary : isBinary});
            }
        });
    });
    ws.send('Hello ! Message from Server');
});
server.listen(8080,function(){
    console.log((new Date()) + 'Server is listening on port 8080');    
})

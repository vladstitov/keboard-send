import {SerialPort} from 'serialport';
import { WebSocketServer } from 'ws';
import * as https from 'https';
import * as  fs from 'fs';
import * as path from 'path';


const serverListener = function(req, resp) {
    resp.setHeader("Content-Type", "text/html");
    resp.writeHead(200);
    resp.end('Welcome');
}

const server = https.createServer({
    cert: fs.readFileSync(path.resolve('data/cert.pem')),
    key: fs.readFileSync(path.resolve('data/key.pem'))
}, serverListener);

const wss = new WebSocketServer({server});

const host = null
const port  = 8081;

server.listen(port,host, () => {
    console.log(`Server is running on https://${host}:${port}`);
});

  


SerialPort.list().then(res => {
    console.log('list', res);
    // serialPort.write('ROBOT POWER ON')
});

const serialPort: SerialPort= new SerialPort( {
    path:'COM5',
    baudRate: 115200
});

let serialdata = '';
let lastSocket: WebSocket;
serialPort.addListener('data', function(data) {
    let str: string = data.toString();
    console.log('com:' + str);
    serialdata += str;
    if(str.includes('\n')) {
        if(lastSocket) lastSocket.send(serialdata);
        serialdata = '';
    }


})

wss.on('connection', function connection(ws:WebSocket) {
    setTimeout(() => {
        console.log('connected state :', ws.readyState);
        ws.send('Welcome')
        lastSocket = ws;
    },1000);
    ws.addEventListener('message', function (evt: MessageEvent) {    
        const str = evt.data.toString();
        ws.send(str);
      //  if(str === 'tick') ws.send('alive');
       // else  serialPort.write(str + '\n');
    });  
    ws.addEventListener('close', function (evt: CloseEvent) {
          console.log('closed ', evt.code); 
          if(lastSocket === ws)  lastSocket = null;    
      }); 

      ws.addEventListener('error', function (evt: Event) {
        console.log('error ', evt);
      
       
    });
});


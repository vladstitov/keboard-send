import {SerialPort} from 'serialport';
import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8081, path: '/stream' });

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
    serialdata += str;
    if(str.includes('\n')) {
        if(lastSocket) lastSocket.send(serialdata);
        serialdata = '';
    }
console.log(data);

})

wss.on('connection', function connection(ws:WebSocket) {
    setTimeout(() => {
        console.log('connected state :', ws.readyState);
        ws.send('Welcome')
        lastSocket = ws;
    },1000);
    ws.addEventListener('message', function (evt: MessageEvent) {       
       
        serialPort.write(evt.data.toString() + '\n');
    });  
    ws.addEventListener('close', function (evt: CloseEvent) {
          console.log('closed ', evt.code); 
          if(lastSocket === ws)  lastSocket = null;    
      }); 

      ws.addEventListener('error', function (evt: Event) {
        console.log('error ', evt);
      
       
    });
});

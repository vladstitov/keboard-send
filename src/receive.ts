import {SerialPort} from 'serialport';
import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8081, path: '/stream' });

SerialPort.list().then(res => {
    console.log('list', res);
    // serialPort.write('ROBOT POWER ON')
});

const serialPort= new SerialPort( {
    path:'COM5',
    baudRate: 9600
});


wss.on('connection', function connection(ws:WebSocket) {
    setTimeout(() => {
        console.log('connected state :', ws.readyState);
        ws.send('Welcome')
    },1000);
    ws.addEventListener('message', function (data: MessageEvent) { 
        const v = data.data.toString();
        console.log(v);
        serialPort.write(v + '\n');
    });  
    ws.addEventListener('closed', function (data) {
          console.log('closed ', data);
        
         
      }); 
      ws.addEventListener('error', function (data) {
        console.log('error ', data);
      
       
    });
});

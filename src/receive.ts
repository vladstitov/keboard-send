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


wss.on('connection', function connection(ws) {
    ws.on('message', function message(data) {
      //  console.log('received ', data + '');
      
        serialPort.write(data + '\n');
    });

    ws.send('something');
});

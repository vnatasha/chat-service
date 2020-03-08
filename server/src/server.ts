import express from 'express';
import cors from 'cors';
import { Events } from './constant';
import { Message } from './model';
import * as http from 'http';
import SocketIO, {Socket} from 'socket.io';

export class ChatServer {
    public static readonly PORT:number = 3001;
    private readonly app: express.Application;
    private readonly server: http.Server;
    private io: SocketIO.Server;
    private readonly port: string | number;

    constructor() {
        this.app = express();
        this.app.use(cors());
        this.server = http.createServer(this.app);
        this.port = process.env.PORT || ChatServer.PORT;
        this.io = SocketIO.listen(this.server);
        this.run();
    }

    private run():void {
        this.server.listen(this.port, () => {
            console.log('Running server on port ', this.port);
        });

        this.io.on(Events.CONNECT, (socket: Socket) => {
            console.log('Client is connected');
            socket.on(Events.MESSAGE, (m: Message) => {
                console.log('server get the message: ', JSON.stringify(m));
                socket.broadcast.emit(Events.MESSAGE, m);
            });

            socket.on(Events.DISCONNECT, () => {
                console.log('Client is disconnected');
            });
        });
    }

    public getApp(): express.Application {
        return this.app;
    }
}
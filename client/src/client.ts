import io from 'socket.io-client'
import { Message } from './model'
import { Events } from './constants'

export class ChatClient {
    private socket: SocketIOClient.Socket = {} as SocketIOClient.Socket;

    public init(): void {
        console.log('Client initialization');
        this.socket = io('localhost:3001');
    }

    public send(message: Message): void {
        console.log('client emits the message: ', JSON.stringify(message));
        this.socket.emit(Events.MESSAGE, message)
    }

    public onOtherMessage(callback: (m: Message) => void) {
        this.socket.on(Events.MESSAGE, (data: Message) => {
            console.log("on other messages", data);
            callback(data)
        })
    }

    public disconnect(): void {
        this.socket.disconnect()
    }
}
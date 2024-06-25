import React, { useState, useEffect } from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import WaitingRoom from './WaitingRoom';
import ChatRoom from './ChatRoom';

function App() {
    const [conn, setConnection] = useState(null);
    const [messages, setMessages] = useState([]);
    const [currentUser, setCurrentUser] = useState('');

    const joinChatRoom = async (username) => {
        try {
            setCurrentUser(username);

            const connection = new HubConnectionBuilder()
                .withUrl("https://localhost:7148/chat")
                .configureLogging(LogLevel.Information)
                .build();

            connection.on("ReceiveMessage", (username, msg) => {
                console.log("msg: ", msg);
            });

            connection.on("ReceiveSpecificMessage", (username, msg) => {
                setMessages(messages => [...messages, { username, msg }]);
            });

            connection.on("ReceiveChatHistory", (history) => {
                setMessages(history);
            });

            connection.on("NotifyNewMessage", (chatRoom, message) => {
                console.log(`New message in chat room ${chatRoom}: ${message}`);
            });

            await connection.start().catch(err => console.error("Error starting connection:", err));

            const chatroom = '';
            await connection.invoke("JoinSpecificChatRoom", { username, chatroom }).catch(err => console.error("Error invoking method:", err));

            setConnection(connection);
        } catch (e) {
            console.error(e);
        }
    };

    const sendMessage = async (message) => {
        try {
            await conn.invoke("SendMessage", message).catch(err => console.error("Error sending message:", err));
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div>
            <main>
                <Container>
                    {!conn
                        ? <WaitingRoom joinChatRoom={joinChatRoom} />
                        : <ChatRoom messages={messages} sendMessage={sendMessage} currentUser={currentUser} username={currentUser} />}
                </Container>
            </main>
        </div>
    );
}

export default App;

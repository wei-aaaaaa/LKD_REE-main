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
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch("https://localhost:7148/api/LoginJWT/get-current-user", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: localStorage.getItem("token"),
                    },
                });

                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }

                const data = await response.json();
                setCurrentUser(data.username);
                setUserId(data.userId);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []);

    const joinChatRoom = async () => {
        try {
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

            const chatroom = ''; // This should be set to the specific chat room ID if needed
            await connection.invoke("JoinSpecificChatRoom", { userId, username: currentUser, chatroom }).catch(err => console.error("Error invoking method:", err));

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
                        ? <WaitingRoom joinChatRoom={joinChatRoom} currentUser={currentUser} />
                        : <ChatRoom messages={messages} sendMessage={sendMessage} currentUser={currentUser} userId={userId} />}
                </Container>
            </main>
        </div>
    );
}

export default App;

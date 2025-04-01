import React, { useState, useEffect, useRef } from 'react';
import { useKeycloak } from "@react-keycloak/web";
import SockJS from 'sockjs-client';
import { Stomp } from "@stomp/stompjs";
import {getToken} from "../../helpers/keycloak";

const Chat = () => {
    const { keycloak } = useKeycloak();
    const [connected, setConnected] = useState(false);
    const [messages, setMessages] = useState([]);
    const [nickname, setNickname] = useState('');
    const [messageText, setMessageText] = useState('');
    const stompClientRef = useRef(null);

    useEffect(() => {
        return () => {
            if (stompClientRef.current && stompClientRef.current.connected) {
                stompClientRef.current.disconnect();
            }
        };
    }, []);

    const connect = () => {
        if (!keycloak.authenticated) {
            keycloak.login();
            return;
        }

        const socket = new SockJS('http://localhost:8090/ws-chat');
        stompClientRef.current = Stomp.over(socket);

        // Добавляем токен в заголовки подключения
        const headers = {
            'Authorization': `Bearer ${getToken()}`
        };

        stompClientRef.current.connect(headers, (frame) => {
            setConnected(true);
            console.log('Connected: ' + frame);

            stompClientRef.current.subscribe('/topic/messages', (messageOutput) => {
                showMessageOutput(JSON.parse(messageOutput.body));
            });
        }, (error) => {
            console.error('Connection error:', error);
        });
    };

    const disconnect = () => {
        if (stompClientRef.current && stompClientRef.current.connected) {
            stompClientRef.current.disconnect();
        }
        setConnected(false);
        console.log("Disconnected");
    };

    const sendMessage = () => {
        if (stompClientRef.current?.connected && nickname && messageText) {
            // Добавляем токен в заголовки сообщения
            const headers = {
                'Authorization': `Bearer ${getToken()}`
            };

            stompClientRef.current.send(
                "/app/chat",
                headers,
                JSON.stringify({
                    'from': nickname,
                    'text': messageText,
                    'sender': keycloak.tokenParsed?.preferred_username || 'anonymous'
                })
            );
            setMessageText('');
        }
    };

    const showMessageOutput = (messageOutput) => {
        setMessages(prevMessages => [...prevMessages, messageOutput]);
    };


    return (
        <div>
            <div>
                <input
                    type="text"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    placeholder="Choose a nickname"
                    disabled={connected}
                />
            </div>
            <br />
            <div>
                <button
                    onClick={connect}
                    disabled={connected || !nickname  || !keycloak.authenticated}
                >
                    Connect
                </button>
                <button onClick={disconnect} disabled={!connected}>
                    Disconnect
                </button>
            </div>
            <br />
            {connected && (
                <div>
                    <input
                        type="text"
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        placeholder="Write a message..."
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    />
                    <button onClick={sendMessage} disabled={!messageText}>
                        Send
                    </button>
                    <div>
                        {messages.map((msg, index) => (
                            <p key={index} style={{ wordWrap: 'break-word' }}>
                                {msg.from}: {msg.text} ({msg.time})
                            </p>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chat;
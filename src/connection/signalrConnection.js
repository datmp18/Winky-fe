// src/signalrConnection.js
import * as signalR from "@microsoft/signalr";

const connection = new signalR.HubConnectionBuilder()
    .withUrl("http://localhost:5000/chatHub") // URL backend .NET
    .withAutomaticReconnect()
    .build();

export default connection;

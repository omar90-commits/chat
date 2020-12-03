import { notification } from './aseets/icons/notification';

import { Ui } from './ui';
import { User, DrawMessage, DrawMessageAdministrador, sendMessage } from './helper/types_object';

const socket = io();
const searchParams = new URLSearchParams( window.location.search );
const name:string = searchParams.get('nombre');
const room:string = searchParams.get('sala');

const formMessage:any = document.querySelector('#form');
const writeMessage:any = document.querySelector('#writeMessage');

const ui:Ui = new Ui();
const mapMessages = new Map();

let arrMessagePrivate:sendMessage[] = [];

ui.nameRoomAndOwner_chat(room, name); // Pinta por pantalla el nombre de la sala y el nombre del usuario.

//Pinta los usuarios conectados la primera vez.
socket.emit('userConnect', {name, room}, (res:User[]):void => {
	
	const filterRoom:User[] = res.filter(el => el.room === room);

	filterRoom.forEach(user => ui.drawUser(user) );
});

//Pinta los usuarios cada vez que se conectan o desconectan.
socket.on('userConnectOrDisconnected', (res:User[]):void => {
	
	const filterRoom:User[] = res.filter(el => el.room === room);
	
	ui.clearTempleteUseronline();
	filterRoom.forEach(user => ui.drawUser(user) );
} );

// El administrador da una alerta de que el usuario ingreso al chat
socket.on('enterChat', (res:DrawMessageAdministrador) => ui.enterOrLeaveChat(res, 'success'));

// El administrador da una alerta de que el usuario abandono al chat
socket.on('leaveChat', (res:DrawMessageAdministrador) => ui.enterOrLeaveChat(res, 'danger'));

socket.on('receivedMessage', (res:DrawMessage) => ui.drawMessageReceived(res));

socket.emit('connectChatPrivate', name, (res:sendMessage) => console.log("recibido", res));

socket.on('receivedMessagePrivate', (res:sendMessage) => {

	const key = res.nameOwnerSendChat;
	const counterSVG = ui.getATag.children.length;

	// Guardando mensajes enviados desde el chat privado
	!mapMessages.get(key) ? arrMessagePrivate.push(res) 
	: arrMessagePrivate.push(...mapMessages.get(key), res);

	mapMessages.set(key, arrMessagePrivate);

	arrMessagePrivate = [];
	window.localStorage.setItem('messages-chat', JSON.stringify([...Array.from(mapMessages)]));

	// Agregando svg
	if (counterSVG) return;

	const svg:any = ui.createSVG( notification );

	ui.getATag.appendChild(svg);
});

formMessage.addEventListener('submit', (e:any) => {
	
	e.preventDefault();
	writeMessage.focus();

	if (writeMessage.value === '') return;

	socket.emit('sendMessage', writeMessage.value, (res:DrawMessage) => ui.drawMessageSend(res));

	writeMessage.value = '';
});
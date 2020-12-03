import { Ui } from './ui';
import { User, sendMessage } from './helper/types_object';
import { convertArrayToObject } from './helper/helper';
import { chatIcon } from './aseets/icons/charla';

const socket:any = io();
const ui = new Ui();

const searchParams = new URLSearchParams( window.location.search );
const nameOwnerSendChat:string = searchParams.get('nombre');
const nameUser = JSON.parse(window.localStorage.getItem('nameUser')) || '';

const formMessage:any = document.querySelector('#form');
const writeMessage:any = document.querySelector('#writeMessage');

socket.emit('connectChatPrivate', nameUser);
socket.emit('connectChatPrivate', nameOwnerSendChat);

socket.on('receivedMessagePrivate', (res:any) => {

	const data:User = {
		id: res.id,
		name: res.nameOwnerSendChat,
		room: res.nameUser
	}

	if (!nameOwnerSendChat) {

		console.log("recibido", res);
		const arrUsers = Array.from(ui.getContainerAvatares.children);
		const isUser = arrUsers.some((el:any) => el.getAttribute('data-value') === data.id);

		if ( ui.getSVG(`#icon-message-received-${data.id}`) ) return;

		isUser ? null : ui.drawUser(data, true);

		const svg:any = ui.createSVG( chatIcon );
		svg.id = 'icon-message-received-' + data.id;
		svg.dataset.value = data.id;

		console.log(document.querySelector(`#icon-chatPrivate-${data.id}`))
		document.querySelector(`#icon-chatPrivate-${data.id}`).appendChild(svg);
	} 
	// else if (res.nameUser === nameOwnerSendChat) console.log("recibido nameOwnerSendChat", res);
});

(convertArrayToObject && !nameOwnerSendChat) && Object.values(convertArrayToObject).forEach((el:any) => {

	const { id, nameOwnerSendChat } = el[0];

	const data:User = {
		id,
		name: nameOwnerSendChat,
		room: null,
	}

	ui.drawUser(data, true);

	const svg:any = ui.createSVG( chatIcon );
	svg.id = 'icon-message-received-' + data.id;
	svg.dataset.value = data.id;

	document.querySelector(`#icon-chatPrivate-${data.id}`).appendChild(svg);	
});

formMessage.addEventListener('submit', (e:any) => {

	e.preventDefault();
	writeMessage.focus();

	if (!writeMessage.value || !nameUser) return;

	const data = {
		nameUser,
		nameOwnerSendChat,
		message: writeMessage.value,
	};

	socket.emit('sendMessagePrivate', data, (res:any) => console.log("enviado", res));

	writeMessage.value = '';
});
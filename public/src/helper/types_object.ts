export type User = {
	id:string,
	name:string,
	room:string,
}

export type sendMessage = {
	id:string,
	message?:string,
	nameOwnerSendChat:string,
	nameUser:string,
}

export type DrawMessage = {
	message:string,
	user:User,
}

export type DrawMessageAdministrador = {
	administrador:string,
	user:string,
}
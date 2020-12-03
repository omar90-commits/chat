const { io } = require('../server');
const { User } = require('../classes/users');

const usersClass = new User();

io.on('connection', client => {
	
	//Cuando un usuario se conecta, se guarda su informacion en un array.
	client.on('userConnect', (data, callback) => {
		
		client.join(data.room);//Lo conecta a la sala seleccionada.

		data.id = client.id;
		usersClass.saveUser(data);

		const enterChat = { administrador: 'Administrador',  user: `${data.name} se unio al chat.`};
		
		client.broadcast.to(data.room).emit('userConnectOrDisconnected', usersClass.getUsers);
		client.broadcast.to(data.room).emit('enterChat', enterChat);

		callback(usersClass.getUsers);

	});
	
	//Cada vez que el usuario se desconecte, se borra del array para evitar tener duplicados.
	client.on('disconnect', () => {
		
		const user = usersClass.getUserId(client.id);

		if (!user) return;
		usersClass.deleteUser(user.id);

		const leaveChat = { administrador: 'Administrador',  user: `${user.name} abandono el chat.`};

		client.broadcast.to(user.room).emit('userConnectOrDisconnected', usersClass.getUsers);
		client.broadcast.to(user.room).emit('leaveChat', leaveChat);
	});
	
	//Enviar mensaje a las personas en la sala.
	client.on('sendMessage', (message, callback) => {

		const user = usersClass.getUserId(client.id);

		if (!user) return;
		
		//Cuando recive un mensaje.
		client.broadcast.to(user.room).emit('receivedMessage', { message, user });
		
		//Cuando se envia un mensaje.
		callback({ message, user });
	});

	//Enviar mensaje privado a una persona.
	client.on('connectChatPrivate', (data) => client.join(data));

	client.on('sendMessagePrivate', (data, callback) => {
		
		const { nameUser, message } = data;

		data.id = client.id;

		usersClass.lastMessagesPrivate(message);

		client.join(nameUser);
		client.broadcast.to(nameUser).emit('receivedMessagePrivate', data);

		callback(data);
	});

});
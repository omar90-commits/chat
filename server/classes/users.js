class User {

	constructor() {

		this.users = [];
		this.lastMessages = [];
	}

	get getUsers() {

		return this.users;
	}

	get getLastMessages() {

		return this.lastMessages;
	}

	saveUser(data) {

		this.users.push(data);
	}

	getUserId(id) {
		
		const user = this.users.find(el => el.id === id);
		
		return user; 
	}

	deleteUser(id) {
		
		const users = this.users.filter(el => el.id !== id);

		this.users = users;
	}

	lastMessagesPrivate(message) {

		this.lastMessages.push(message);
	}
}

module.exports = {
	User,
}
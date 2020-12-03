import { Ui } from './ui';
import { User } from './helper/types_object';

const ui:Ui = new Ui();

export class SearchUser {

	private searchContact:any;

	constructor() {
		this.searchContact = document.getElementById('search_contact');
	}

	public get getSearchContact():any {

		return this.searchContact;
	}

	public search(users:object, valueSearch:string):User[] {

		const arrUsers:User[] = Object.entries(users).map(arr => arr[1]);

		const searchFilter = arrUsers.filter(user => user.name.indexOf(valueSearch.toLowerCase()) === 0);

		return searchFilter.length === 0 ? arrUsers : searchFilter;
	}

	public drawUsersSearch(valueSearch:string) {

		const usersConnect:object = Ui.usersOnline.reduce((acc:any, el:User) => (acc[el.name] =el,acc),{});
		const findUsers:User[] = this.search(usersConnect, valueSearch);

		ui.clearTempleteUseronline();
		findUsers.forEach(user => ui.drawUser(user) );
	}
}
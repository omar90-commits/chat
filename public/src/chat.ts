import './aseets/styles/bootstrap.min.css';
import './aseets/styles/sass/chat.scss';
import './aseets/styles/effect-border.ts';

import './chat.socket.ts';

import { Ui } from './ui';
import { SearchUser } from './searchUser';
import { UiPopover } from './uiPopover';

const ui:Ui = new Ui();
const uiSearch:SearchUser = new SearchUser();
const uiPopover = new UiPopover();

//Filtro
uiSearch.getSearchContact.addEventListener('keydown', (e:any) => {

	if (e.key === 'Enter') {

		const valueSearch:string = uiSearch.getSearchContact.value;
		uiSearch.drawUsersSearch(valueSearch);
	
	} else if (e.key === 'Backspace') uiSearch.drawUsersSearch('');
});

// Para quitar el popover
document.querySelector('body').addEventListener('click', (e:any) => {

	const target = e.target;
	const dataset = target.dataset;
	const value = dataset.value;

	uiPopover.setPopoverBox(document.querySelector('.popover-box'));

	if (value || !uiPopover.getPopoverBox) return;

	uiPopover.removePopover();
});

// Para agregar el popover
ui.getContainerAvatares.addEventListener('click', (e:any) => {

	const target = e.target;
	const dataset = target.dataset;
	const value = dataset.value;

	uiPopover.setUserTag(document.querySelector(`#userOnline-${value}`));
	uiPopover.setPopoverBox(document.querySelector('.popover-box'));

	if(uiPopover.getPopoverBox) uiPopover.getContainerChat.removeChild(uiPopover.getPopoverBox);

	if (!value) return;

	uiPopover.createPopover(ui.getNameChat);
});
import './aseets/styles/bootstrap.min.css';
import './aseets/styles/sass/chat.scss';
import './aseets/styles/effect-border.ts';

import './chatPrivate.socket.ts';

import { Ui } from './ui';

const ui:Ui = new Ui();

ui.getContainerAvatares.addEventListener('click', (e:any) => {

	const target = e.target;
	const dataset = target.dataset;
	const value = dataset.value;

	if (!value) return;

	ui.getSVG(`#icon-message-received-${value}`)?.remove();
});
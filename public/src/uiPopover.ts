export class UiPopover {

	private userTag:any;
	private popoverBox:any;
	private containerChat:any;
	private peopleConnect:any;

	constructor() {

		this.containerChat = document.querySelector('.container-chat');
		this.peopleConnect = document.querySelector('#peopleConnect');
	}

	public get getPopoverBox() {

		return this.popoverBox;
	}

	public get getContainerChat() {

		return this.containerChat;
	}

	public get getNameUser() {

		const nameUser:string = this.userTag.children[1].firstChild.nextSibling.textContent;

		return nameUser;
	}

	public setUserTag(userTag:any):void {

		this.userTag = userTag;
	}

	public setPopoverBox(popover:any):void {

		this.popoverBox = popover;
	}

	public removePopover() {

		setTimeout(() => this.getPopoverBox.style.opacity = '0', 0);
		setTimeout(() => this.getContainerChat.removeChild(this.getPopoverBox), 300);
	}

	public createPopover(nameOwnerChat:string):void {

		let templetePopover:string = '';

		window.localStorage.setItem('nameUser', JSON.stringify(this.getNameUser));

		if (this.getNameUser !== nameOwnerChat) {

			templetePopover = `
				<a class="popover-box__text my-1 py-1 d-flex align-items-center" data-value="popover-box"
					href="./chatPrivate.html?nombre=${nameOwnerChat}"
				>
					Escribir a <span class="ml-1" 
					data-value="popover-box">${this.getNameUser}</span> 
					<img 
						class="popover-box__img" src="./img/icons/correo.svg" 
						alt="mensaje"
						data-value="popover-box"
					>
				</a>
				<div class="divider" data-value="popover-box"></div>
			`;
		}

		templetePopover += `
			<p class="popover-box__text py-1 my-1 d-flex align-items-center" data-value="popover-box">
				Perfil de <span class="ml-1" data-value="popover-box">${this.getNameUser}</span> 
				<img 
					class="popover-box__img" 
					src="./img/icons/usuario.svg" 
					alt="usuario"
					data-value="popover-box"
				>
			</p>
			<div class="divider" data-value="popover-box"></div>

			<p class="popover-box__text py-1 my-1 d-flex align-items-center" data-value="popover-box">
				Ver personas conectadas. 
				<img 
					class="popover-box__img" 
					src="./img/icons/usuarios.svg" 
					alt="usuarios"
					data-value="popover-box"
				>
			</p>
			<div class="divider" data-value="popover-box"></div>
		`;

		this.createTagPopover(templetePopover);
	}

	private createTagPopover(templetePopover:string):void {

		const containerPopover = document.createElement('div');
		containerPopover.classList.add('popover-box', 'px-3', 'py-2');
		containerPopover.dataset.value = 'popover-box';

		if (this.mediaQuey()) {

			containerPopover.style.top = this.peopleConnect.clientHeight + 25 + 'px';

		} else {

			containerPopover.style.left = this.peopleConnect.clientWidth + 20 + 'px';
			containerPopover.style.top = this.userTag.getBoundingClientRect().top - 65 + 'px';
		}

		containerPopover.innerHTML = templetePopover;
		this.containerChat.appendChild(containerPopover);
		setTimeout(() => containerPopover.style.opacity = '1', 0);
	}

	private mediaQuey():boolean {

		return matchMedia('(max-width: 767px)').matches;
	}
}
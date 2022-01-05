console.log('Скрипт подключен');

/* const columnName = document.querySelectorAll('.column-name');

const getData = (currentElementsId, order) => {
	fetch('db/db.json')
		.then((res) => res.json())
		.then((data) => {
			const array = [];
			// console.log(currentElementsId);
			for (let keyId of currentElementsId) {
				for (let keyDataDb of data.db) {
					if (keyDataDb.id === keyId) {
						array.push(keyDataDb);
					}
				}
			}
			if (order === 'current') {
				renderCurrentElements(array);
				// console.log(array);
			}
			if (order === 'next') {
				renderNextElements(array);
			}
			// localStorage.setItem("goods", JSON.stringify(array)); // Записываем в localStorage
			// window.location.href = "/goods.html"; // Переходим на страницу для отображения товаров
			// renderGoods(array); // Рендерим товары
		});
};

const renderCurrentElements = (array) => {
	const currentColumn = document.querySelector('.current-column > .element-column');
	array.forEach(({ id, elementName, nextElements }) => {
		const element = document.createElement('div');
		element.classList.add('current-element');

		let btnClass, colorMain, colorEnter;
		if (id.substring(3) === '01') {
			btnClass = 'current-element-btn';
			colorMain = '#A0DCBE';
			colorEnter = '#6edfa6';
		} else {
			btnClass = 'current-element-variant-btn';
			colorMain = '#FAFABE';
			colorEnter = '#f5f591';
		}
		element.innerHTML = `<button class=${btnClass}>${elementName}</button>`;
		element.querySelector(`.${btnClass}`).addEventListener('click', () => showCurrentElement(elementName, id));
		btnMouseEnterLeave.bind(element)(btnClass, colorMain, colorEnter);
		currentColumn.append(element);

		if (id.substring(3) === '01') {
			getChildren(id);
		}
		if (nextElements) {
			getData(nextElements, 'next');
		}
	});
};

const restart = () => {
	clearColumns();
	showCurrentElement('Базовый шаг', '01001');
	getData(['01001'], 'current');
};

restart(); */

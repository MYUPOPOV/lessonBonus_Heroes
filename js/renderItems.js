/*jshint esversion: 6 */

const allCards = document.querySelector('.all-cards');
const selectMovies = document.querySelector('.select-movies');
const selectSort = document.querySelector('.sort');
const sortResult = document.querySelector('.sort-result');
const input = document.querySelector('.input');
const searchBtn = document.querySelector('.button-search');

const resetSortBlock = () => {
	selectSort.value = 'Sort';
	sortResult.style.display = 'none';
	input.setAttribute('disabled', '');
	searchBtn.setAttribute('disabled', '');
	input.value = '';
};

const enableSortBlock = () => {
	input.removeAttribute('disabled');
	searchBtn.removeAttribute('disabled');
};

const getSortData = (movie, sort) => {
	fetch('dbHeroes.json')
		.then((res) => res.json())
		.then((data) => {
			const array = [];
			if (movie === 'All Movies') {
				data.forEach((item) => {
					array.push(item);
				});
			} else {
				data.forEach((item) => {
					if (item.movies.find((item) => item === movie)) {
						array.push(item);
					}
				});
			}
			const sortedArray = [];
			if (sort !== 'Sort') {
				array.forEach((item) => {
					if (!sortedArray.find((itemArray) => itemArray === item[sort])) {
						sortedArray.push(item[sort]);
					}
				});
				renderSortButtons(sortedArray);
			}
		});
};

const getRenderData = (movie = 'All Movies', sort = 'Sort', value = ['undefined']) => {
	fetch('dbHeroes.json')
		.then((res) => res.json())
		.then((data) => {
			const array = [];
			if (movie === 'All Movies') {
				data.forEach((item) => {
					array.push(item);
				});
			} else {
				data.forEach((item) => {
					if (item.movies.find((item) => item === movie)) {
						array.push(item);
					}
				});
			}
			let sortedArray = [];
			if (sort !== 'Sort') {
				for (let key of value) {
					array.forEach((item) => {
						if (item[sort] === key) {
							sortedArray.push(item);
						}
					});
				}
			} else {
				// Для каждого элемента массива value при совпадении запушить в sortArray
				// sortedArray = array.filter((item) => item[sort] === value);

				sortedArray = array;
			}
			renderCards(sortedArray);
		});
};

const renderSortButtons = (array) => {
	sortResult.innerHTML = '';
	array.forEach((item) => {
		const buttonSort = document.createElement('button');
		buttonSort.classList.add('button-sort');
		buttonSort.textContent = `${item}`;

		buttonSort.addEventListener('click', (e) => {
			getRenderData(selectMovies.value, selectSort.value, [e.target.textContent]);
		});

		buttonSort.addEventListener('mouseenter', (event) => {
			event.target.style.backgroundColor = 'rgba(250, 250, 250, 0.97)';
			event.target.style.border = 'solid 2px';
		});

		buttonSort.addEventListener('mouseleave', (event) => {
			event.target.style.backgroundColor = 'rgba(255, 255, 255, 0.85)';
			event.target.style.border = 'solid 1px';
		});

		sortResult.append(buttonSort);
	});
};

const renderCards = (array) => {
	allCards.innerHTML = '';
	array.forEach(({ name, realName, species, citizenship, gender, status, actors, photo, movies }) => {
		const card = document.createElement('div');
		card.classList.add('card');
		card.innerHTML = `
    <div class="picture">
      <img class='photo' src=${photo}></img>
    </div>
    <div class="row">
     <div class="column info"> 
      <div class='name'>name</div>
      <div class='realName'>realName</div>
      <div class='species'>species</div>
      <div class='citizenship'>citizenship</div>
      <div class='gender'>gender</div>
      <div class='status'>status</div>
      <div class='actors'>actors</div>
      <div class='movies'>movies</div>
     </div>
     <div class="column data"> 
      <div class='name'><b>${name}</b></div>
      <div class='realName'>${realName}</div>
      <div class='species'>${species}</div>
      <div class='citizenship'>${citizenship}</div>
      <div class='gender'>${gender}</div>
      <div class='status'>${status}</div>
      <div class='actors'>${actors}</div>
      <div class='movies'><b>${movies}</b></div>
     </div>
    </div>
    `;
		allCards.append(card);
	});
};

const start = () => {
	getRenderData();
	resetSortBlock();
};

selectMovies.addEventListener('change', () => {
	getRenderData(selectMovies.value);
	resetSortBlock();
});

selectSort.addEventListener('change', () => {
	if (selectSort.value !== 'Sort') {
		sortResult.style.display = 'block';
		getSortData(selectMovies.value, selectSort.value);
		getRenderData(selectMovies.value);
		enableSortBlock();
	} else {
		resetSortBlock();
		getRenderData(selectMovies.value);
	}
});

input.addEventListener('input', (e) => {
	e.target.value = e.target.value.replace(/[^a-zA-Z ]/, '');
	const sortBtns = document.querySelectorAll('.button-sort');
	if (e.value !== '') {
		sortBtns.forEach((item) => {
			if (item.textContent.toLowerCase().includes(input.value.toLowerCase())) {
				item.style.display = 'inline';
			} else {
				item.style.display = 'none';
			}
		});
	} else {
		sortBtns.forEach((item) => (item.style.display = 'inline'));
	}
});

searchBtn.addEventListener('click', () => {
	const sortBtns = document.querySelectorAll('.button-sort');
	let array = [];
	sortBtns.forEach((item) => {
		if (item.style.display !== 'none') {
			array.push(item.textContent);
		}
	});
	console.log('~ array', array);
	getRenderData(selectMovies.value, selectSort.value, array);
});

[selectMovies, selectSort, input, searchBtn].forEach((item) =>
	item.addEventListener('mouseenter', (event) => {
		event.target.style.backgroundColor = 'rgba(255, 255, 255, 0.97)';
		event.target.style.border = 'solid 2px';
	})
);
[selectMovies, selectSort, input, searchBtn].forEach((item) =>
	item.addEventListener('mouseleave', (event) => {
		event.target.style.backgroundColor = 'rgba(255, 255, 255, 0.85)';
		event.target.style.border = 'solid 1px';
	})
);

start();

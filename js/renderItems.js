/*jshint esversion: 6 */

const allCards = document.querySelector('.all-cards');
const selectMovies = document.querySelector('.select-movies');
const selectSort = document.querySelector('.sort');
const sortResult = document.querySelector('.sort-result');

const getSortData = (parameter, movie) => {
	console.log('~ parameter', parameter);

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

			console.log('~ array', array);

			const sortedArray = [];

			if (parameter !== 'Sort') {
				array.forEach((item) => {
					if (!sortedArray.find((itemArray) => itemArray === item[parameter])) {
						sortedArray.push(item[parameter]);
					}
				});
				renderSortButtons(sortedArray);
			}
			// console.log('~ array', array);
			// if (movie === 'All Movies') {
			//   data.forEach((item) => {
			//     array.push(item);
			//   });
			// } else {
			//   data.forEach((item) => {
			//     if (item.movies.find((item) => item === movie)) {
			//       array.push(item);
			//     }
			//   });
			// }
		});
};

const getRenderData = (movie = 'All Movies') => {
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
			renderCards(array);
		});
};

const renderSortButtons = (array) => {
	sortResult.innerHTML = '';
	array.forEach((item) => {
		const buttonSort = document.createElement('button');
		buttonSort.classList.add('button-sort');
		buttonSort.textContent = `${item}`;

		buttonSort.addEventListener('click', (e) => {
			console.log(e.target);
			// передаем значение Movie Sort и Text.Content кнопки и находим в json необходимую карточку
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
	getRenderData(selectMovies.value);
	sortResult.style.display = 'none';
};

selectMovies.addEventListener('change', () => {
	selectSort.value = 'Sort';
	getRenderData(selectMovies.value);
	sortResult.style.display = 'none';
});

selectSort.addEventListener('change', () => {
	if (selectSort.value !== 'Sort') {
		sortResult.style.display = 'block';
		getSortData(selectSort.value, selectMovies.value);
	} else {
		sortResult.style.display = 'none';
	}
});

start();

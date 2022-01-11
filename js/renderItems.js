/*jshint esversion: 6 */

const allCards = document.querySelector('.all-cards');
const selectMovies = document.querySelector('.select-movies');
const selectSort = document.querySelector('.sort');
const sortResult = document.querySelector('.sort-result');

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

const getRenderData = (movie = 'All Movies', sort = 'Sort', value = 'unknown') => {
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
				sortedArray = array.filter((item) => item[sort] === value);
			} else {
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
			console.log(e.target);
			getRenderData(selectMovies.value, selectSort.value, e.target.textContent);
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
	sortResult.style.display = 'none';
};

selectMovies.addEventListener('change', () => {
	getRenderData(selectMovies.value);
	selectSort.value = 'Sort';
	sortResult.style.display = 'none';
});

selectSort.addEventListener('change', () => {
	if (selectSort.value !== 'Sort') {
		sortResult.style.display = 'block';
		getSortData(selectMovies.value, selectSort.value);
		getRenderData(selectMovies.value);
	} else {
		sortResult.style.display = 'none';
		getRenderData(selectMovies.value);
	}
});

start();

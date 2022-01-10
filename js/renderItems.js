/*jshint esversion: 6 */

const allCards = document.querySelector('.all-cards');
const selectMovies = document.querySelector('.select-movies');

const getData = (movie = 'All Movies') => {
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
	getData(selectMovies.value);
};

selectMovies.addEventListener('change', () => {
	getData(selectMovies.value);
});

start();

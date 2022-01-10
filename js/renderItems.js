// console.log('Скрипт подключен');

const allCards = document.querySelector('.all-cards');
const selectMovies = document.querySelector('.select-movies');

const getData = (movie = 'All Movies') => {
	fetch('dbHeroes.json')
		.then((res) => res.json())
		.then((data) => {
			const array = [];
			console.log('~ movie', movie);
			// console.log(currentElementsId);
			// for (let keyId of currentElementsId) {
			// 	for (let keyDataDb of data.db) {
			// 		if (keyDataDb.id === keyId) {
			// 			array.push(keyDataDb);

			if (movie === 'All Movies') {
				data.forEach((item) => {
					// item.movies
					// console.log('~ item.movies', item.movies);
					array.push(item);
				});
			} else {
				data.forEach((item) => {
					// console.log(item.movies);
					// array.push(item);
					if (item.movies) {
						if (item.movies.find((item) => item === movie)) {
							array.push(item);
						}
					}
				});
			}
			// console.log(array);
			renderCards(array);
		});
};

const renderCards = (array) => {
	allCards.innerHTML = '';
	// const currentColumn = document.querySelector('.current-column > .element-column');
	array.forEach(({ name, realName, species, citizenship, gender, status, actors, photo, movies }) => {
		const card = document.createElement('div');
		card.classList.add('card');

		card.innerHTML = `
    <div class="picture">
      <img class='photo' src=${photo}></img>
    </div>
 
    <div class="row">

    <div class="column info"> 
      <div class='name'>
        <span class='info-title'>name</span>
        </div>
      <div class='realName'>
        <span class='info-title'>realName</span>
        </div>
      <div class='species'>
        <span class='info-title'>species</span>
      </div>
      <div class='citizenship'>
        <span class='info-title'>citizenship</span>
      </div>
      <div class='gender'>
        <span class='info-title'>gender</span>
      </div>
      <div class='status'>
        <span class='info-title'>status</span>
      </div>
      <div class='actors'>
        <span class='info-title'>actors</span>
      </div>
      <div class='movies'>
        <span class='info-title'>movies</span>
     </div>
    </div>
 
      <div class="column data"> 
        <div class='name'>
          <span class='info-value'><b>${name}</b></span>
          </div>
        <div class='realName'>
          <span class='info-value'>${realName}</span>
          </div>
        <div class='species'>
          <span class='info-value'>${species}</span>
        </div>
        <div class='citizenship'>
          <span class='info-value'>${citizenship}</span>
        </div>
        <div class='gender'>
          <span class='info-value'>${gender}</span>
        </div>
        <div class='status'>
          <span class='info-value'>${status}</span>
        </div>
        <div class='actors'>
          <span class='info-value'>${actors}</span>
        </div>
        <div class='movies'>
          <span class='info-value'><b>
          ${movies}
          </b></span>
       </div>
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

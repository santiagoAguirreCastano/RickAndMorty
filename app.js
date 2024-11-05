const URL = 'https://rickandmortyapi.com/api/character';
const URLSearch = 'https://rickandmortyapi.com/api/character/?name=';
const URLPage= 'https://rickandmortyapi.com/api/character/?page=';


// Pagina
let currentPage = 1;

//Paginas totales
let totalPages = 0;

const getCharacter = async (URL) => {
    const response = await fetch(URL);
    const data = await response.json();
    return data;
};

const displayCharacters = async (characters) => {
    const mainContainer = document.querySelector('main');
    mainContainer.innerHTML = '';

    if (characters.results && characters.results.length > 0) {
        characters.results.forEach(character => makeCard(character));
        totalPages = characters.info.pages;
        setUpPagination(totalPages);
    } else {
        mainContainer.innerHTML = '<p>No se encontraron personajes.</p>'; // Mensaje si no hay personajes
    }


};

const header = document.querySelector('header');

const input = document.createElement('input');
input.type = 'text';
input.id = 'searchInput';
input.placeholder = 'Ingresa el personaje';


const containerCheck = document.createElement('div');
containerCheck.id = 'container-check'; 


const options = [
    { value: 'Alive', text: 'Vivo' },
    { value: 'Dead', text: 'Muerto' },
    { value: 'Human', text: 'Humano' },
    { value: 'Alien', text: 'Alien' },
];


options.forEach(option => {
    
    const label = document.createElement('label');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.value = option.value; 
    checkbox.className = 'status-filter'; 
    
    label.appendChild(checkbox);
    
    label.appendChild(document.createTextNode(option.text));

    
    containerCheck.appendChild(label);
});

header.appendChild(containerCheck)

header.appendChild(input)

function makeCard(morty) {
    const container = document.createElement('div');
    container.id = 'card';
    container.classList.add('card');

    const imgCard = document.createElement('img');
    imgCard.src = morty.image;

    const contCharacter = document.createElement('div');
    contCharacter.id = 'Character';
    contCharacter.classList.add('Character');

    const name = document.createElement('h2');
    name.innerHTML = `Nombre: ${morty.name}`;
    name.classList.add('nameCard');

    const gender = document.createElement('h3');
    gender.innerHTML = `Genero: ${morty.gender}`;
    gender.classList.add('genderCard');

    const specie = document.createElement('h3');
    specie.innerHTML = `Specie: ${morty.species}`
    specie.classList.add('specieCard');

    const status = document.createElement('h3');
    status.innerHTML = `Status: ${morty.status}`
    status.classList.add('specieCard');

    container.appendChild(imgCard);
    container.appendChild(contCharacter);
    contCharacter.appendChild(name);
    contCharacter.appendChild(gender);
    contCharacter.appendChild(specie);
    contCharacter.appendChild(status);

    document.querySelector('main').appendChild(container);
}

const searchCharacters = async (query) => {
    const searchURL = `${URLSearch}${query}`; 
    const characters = await getCharacter(searchURL);
    displayCharacters(characters); 
};

const filterCharacters = async () => {
   const selectedStatuses = Array.from(document.querySelectorAll('.status-filter:checked')).map(checkbox => checkbox.value);
  
   let filterURL = URL;

   if (selectedStatuses.length > 0) {
       const statusParams = selectedStatuses.map(status => {
           if (status === 'Alive' || status === 'Dead') {
               return `status=${status}`;
           } else {
               return `species=${status}`; 
           }
       }).join('&');
       filterURL += `?${statusParams}`;
   }

   const data = await getCharacter(filterURL);
   displayCharacters(data);
};


document.querySelectorAll('.status-filter').forEach(checkbox => {
   checkbox.addEventListener('change', filterCharacters);
});

// Paginador //

const getCharacterByPage = async(page) => {
    const response = await fetch(`${URLPage}${page}`);
    const data = await response.json();
    displayCharacters(data);
};

const setUpPagination = (totalPages) => {
    const paginationContainer = document.createElement('div');
    paginationContainer.id = 'pagination';
    paginationContainer.innerHTML = ''; 

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.innerText = i;
        button.className = 'btn-page';

        if (i === currentPage) {
            button.classList.add('active');
        }

        button.addEventListener('click', () => {
            currentPage = i;
            getCharacterByPage(currentPage); 
        });

        paginationContainer.appendChild(button);
    }

    document.querySelector('main').appendChild(paginationContainer); 
};

document.getElementById('searchInput').addEventListener('input', (event) => {
    const query = event.target.value;
    if (query.length > 0) {
        searchCharacters(query);
    } else {
        getCharacterByPage(currentPage); 
    }
})


document.addEventListener('DOMContentLoaded', () => {
    getCharacterByPage(currentPage);
});


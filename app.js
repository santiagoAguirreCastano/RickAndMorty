 

 function makeCard(morty){
    const container = document.createElement('div');
    container.id='card'
    container.classList.add='card'

    const imgCard = document.createElement('img')
    imgCard.src = morty.image

    const contCharacter = document.createElement('div')
    contCharacter.id='Character'
    contCharacter.classList='Character'

    const name = document.createElement('h2')
    name.innerHTML = morty.name
    name.classList.add='nameCard'

    const status = document.createElement('h3')
    status.innerHTML = morty.status
    status.classList.add='statusCard'

    const specie = document.createElement('h3')
    specie.innerHTML = morty.species
    specie.classList.add='specieCard'

    container.appendChild(imgCard)
    container.appendChild(contCharacter)
    contCharacter.appendChild(name)
    contCharacter.appendChild(status)
    contCharacter.appendChild(specie)

    document.querySelector('main').appendChild(container);

    
 }

 fetch('https://rickandmortyapi.com/api/character')
    .then(response => response.json())
    .then(data => {

        const limit = 6;
        const characters=data.results.slice(0, limit)
        
        characters.forEach(morty => {
    
            makeCard(morty); 
        });
    })
    .catch(err => console.error('Error fetching data:', err));
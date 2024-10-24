fetch('https://rickandmortyapi.com/api/character')
  .then(response => response.json())
  .then(response => 
  {
    const limit=8
    const character=response.results.slice(0,limit)

    character.forEach(element => {
        
        CreateCards(element)
    });
    })
  .catch(err => console.error(err));

  
    function CreateCards(element){
        const container=document.createElement('div')
        container.id='card'
        container.classList.add='card'
    
        const imgCard=document.createElement('img')
        imgCard.src=element.image
    
        const container2=document.createElement('div')
         container2.id='card2'
        container2.classList.add('card2')
    
        const title=document.createElement('h2')
        title.id='H2card'
        title.innerText=element.name
    
        const status=document.createElement('h3')
        status.id='H3card'
        status.innerText=element.status
    
        const specie=document.createElement('h4')
        specie.id='H4card'
        specie.innerText=element.species

        
        container.appendChild(imgCard)
        container.appendChild(container2)
        container2.appendChild(title)
        container2.appendChild(status)
        container2.appendChild(specie)
        document.querySelector('main').appendChild(container) 

    }
  
    
    

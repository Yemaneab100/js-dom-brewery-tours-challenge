const listOfBreweries = document.querySelector('#breweries-list');

// Show by the name of a state
function showBrewByState(){
    const frmState = document.querySelector('#select-state-form');
    frmState.addEventListener('submit', (event) =>{
        event.preventDefault();
        listOfBreweries.innerHTML = " ";
    
        // getting name of state from the form
        const stateData = new FormData(frmState);
        const state = Object.fromEntries(stateData);
        //console.log(Object.keys(state));
        const uri = `https://api.openbrewerydb.org/breweries?by_state=${state['select-state']}`; 
        fetch(uri)
          .then((response) => {
            // here I got my response from the server
            // extract the JSON from the response
            // and convert into a JS object, returning this object
            return response.json();
          })
          .then((data) => {
            showBrew(data)
          });
    
    });
}


// Filter by type of brewery 
function showBrewByType(){
    const slcType = document.querySelector('#filter-by-type');
    slcType.addEventListener('change', (event) =>{
        listOfBreweries.innerHTML = " ";
        const typeBrew = slcType.value;
        const uri = `https://api.openbrewerydb.org/breweries?by_type=${typeBrew}`; 
        fetch(uri)
          .then((response) => {
            // here I got my response from the server
            // extract the JSON from the response
            // and convert into a JS object, returning this object
            return response.json();
          })
          .then((data) => {
            showBrew(data)
          });  
    })
}

// show Brewery
function showBrew(data){
    data.forEach(brewery => {
        if(brewery.brewery_type == 'micro' || brewery.brewery_type == 'regional' || brewery.brewery_type == 'brewpub' ){
            const breweryList = document.createElement('li');
            const brewName = document.createElement('h2');
            brewName.innerText = brewery.name;
        
            const brewType = document.createElement('div')
            brewType.classList.add('type');
            brewType.innerText = brewery.brewery_type;
    
            // address
            const secAddress = document.createElement('section');
            secAddress.classList.add('address');
    
            const h3Address = document.createElement('h3')
            h3Address.innerText = "Address:"
    
            const address = document.createElement('p') 
            address.innerText = brewery.street 
    
            const city = document.createElement('p');
            const strong = document.createElement('strong');
            strong.innerText = brewery.city + brewery.postal_code;
            city.appendChild(strong)
    
            // append to the Address of section 
            secAddress.innerHTML += h3Address.outerHTML +address.outerHTML + city.outerHTML;
            
            // Phone 
            const secPhone = document.createElement('section');
            secPhone.classList.add('phone');
            const h3Phone = document.createElement('h3');
            h3Phone.innerText = 'Phone';
            const phone = document.createElement('p');
            phone.innerText = brewery.phone;
    
            // append to the phone of section.
            secPhone.innerHTML +=  h3Phone.outerHTML + phone.outerHTML;
    
            // link 
            const secLink = document.createElement('section');
            secLink.classList.add('link');
            const link = document.createElement('a');
            link.setAttribute('href', brewery.website_url);
            // link.setAttribute('target', '_blank')
            link.innerText = "VISIT WEBSITE"
            secLink.appendChild(link);
            // append to list
            breweryList.innerHTML += brewName.outerHTML +  brewType.outerHTML  + secAddress.outerHTML + secPhone.outerHTML + secLink.outerHTML;
            listOfBreweries.appendChild(breweryList); 
        }
             
    });   
}

showBrewByType();
showBrewByState();

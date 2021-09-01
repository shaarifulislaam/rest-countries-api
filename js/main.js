const btn = document.getElementById('button-search');
const searchBox =document.getElementById('search-input');
const errorDiv = document.getElementById('error');
const loadSppiner = document.getElementById('sppiner');

btn.addEventListener('click',()=>{
   const searchText = searchBox.value  ;
   

   if(searchText === ''){
    errorDiv.innerText = 'Search feild cannot be empty!'
    return;
    
   }else{

    const url =`https://restcountries.eu/rest/v2/name/${searchText}`
    fetch(url)
    .then(res => res.json())
    .then(data =>getData(data))
    loadSppiner.classList.remove("d-none")
   }

   
    searchBox.value='';
})
const getData= data =>{
    //error handle
    loadSppiner.classList.add("d-none");
    if(data.status===404){
        errorDiv.innerText ="No result found";
    }
    else{
        errorDiv.innerText ='';
    }
     const divBox = document.getElementById('divContainer');
     divBox.textContent ='';
    data.forEach(countries =>{
        const div = document.createElement('div');
        div.classList.add('col-md-3','border','border-2','m-2','p-4');
        div.innerHTML =`
        <img class="img-fluid" src="${countries.flag}" alt="">
        <h1>${countries.name}</h1>
        <button class="btn btn-dark" onclick="singleCountry('${countries.alpha3Code}')">Learn more</button>
        `
        divBox.appendChild(div);
    })
    
}
const singleCountry = alpha3Code =>{
    const url= `https://restcountries.eu/rest/v2/alpha/${alpha3Code}`
    fetch(url)
    .then(res =>res.json())
    .then(data => displaySingleCountry(data))
    loadSppiner.classList.remove("d-none")
    
}
const displaySingleCountry = data =>{
    loadSppiner.classList.add("d-none")
    const country = document.getElementById('single-country');
    country.textContent='';
    const div = document.createElement('div');
    div.innerHTML= `
    <h1>${data.name}</h1>
    <h5>Capital :${data.capital}</h5>
    <h5>Region :${data.region}</h5>
    <h5>Currency :${data.currencies[0].code} ${data.currencies[0].symbol}</h5>
    `

    country.appendChild(div);
}
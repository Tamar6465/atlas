import { fetchApi } from "./functions.js";
const container = document.querySelector("#content")
const israel = document.querySelector("#ISRAEL");
const france = document.querySelector("#FRANCE");
const USA = document.querySelector("#USA");
const GB = document.querySelector("#GB");
const thailand = document.querySelector("#THAILAND");
const all = document.querySelector("#ALL")
const select = document.querySelector(".select");
const search = document.querySelector(".btnSearch");
const inSearch = document.querySelector(".inputSearch")
const home = document.querySelector("#home")

const createColCard = (obj) => {
    return `<div class=" p-1" >
    <div class=" p-2 shadow d-flex col-md-80 align-items-center country">
    <div class="m-4 w-100">
    <img class="w-100  card-img" src="${obj.flags.png}" }>
    <h1>${obj.name.common}</h1>
    <h5 class="card-body">Capitul: ${obj.capital[0]}</h5>
    <p>languages: ${obj.languages.heb}</p>
    <p>coins: ${Object.values(obj.currencies)[0]['name']}</p>
    <p>population: ${obj.population}</p>
    <p>states with borders:</p>
   <div class=" d-flex  flex-wrap">${obj.borders.map(co => {
        return `<button class="p-2 btnCode btn-success m-1 btn w-20"  id="${co}">${co}</button>`
    }).join("")}
    </div> 
   </div>
   <iframe width="100%" height="500px" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"
   src="https://maps.google.com/maps?q=${obj.latlng[0]},${obj.latlng[1]}&hl=iw&z=4&amp;output=embed">
   </iframe>
        </div>
</div>`


}
function render(data, place, func = "") {

    if (func === "home") {
        data.sort((a, b) => a.name.common.localeCompare(b.name.common));
        place.innerHTML = data.map(element => {
            return `<option value="${element.name.common}" class="option" >${element.name.common}</option>`
        })


    } else if (func === "less") {
        place.innerHTML = data.map(element => {
            return `<div class="card align-items-center m-2 col-md-2">
           <img class="p-0 card-img" src="${element.flags.png}">
            <h1 class="card-body">${element.name.common}</h1>
            <button class="btnC btn-success btn m-1" id="${element.name.official}">view more</button>
            </div>`
        }).join("")
        const btn = document.querySelectorAll(".btnC");
        btn.forEach(b => b.addEventListener("click", clickCountry));
    }
    else {
        console.log(data);
        place.innerHTML = "";
        if (data.length === undefined) {
            place.innerHTML += createColCard(data);
        } else {
            for (let index = 0; index < data.length; index++) {
                place.innerHTML += createColCard(data[index]);
            }
        }
        const btn = document.querySelectorAll(".btnCode");
        console.log(btn);
        btn.forEach(c => c.addEventListener("click", clickCountryCode))
    }


}
function callApi(country, filter, place, func) {
    fetchApi(country, filter).then(data => render(data, place, func));

}
function searchCountry(country) {
    callApi(`name/${country}`, "?fields=name,flags,latlng,population,languages,currencies,capital,borders", container);

}
function clickOption(e) {
    e.preventDefault();
    const country = e.target.value;
    searchCountry(country);
}

function clickCountry(e) {
    e.preventDefault();
    const country = e.target.id;
    searchCountry(country);

}
function clickCountryCode(e) {
    e.preventDefault();
    const code = e.target.id;
    callApi(`alpha/${code}`, "?fields=name,flags,latlng,population,languages,currencies,capital,borders", container);
}
function start() {
    callApi("all", "?fields=name", select, "home");
    callApi("alpha", "?codes=all,IL,USA,TH,FR,HG?fields=name,flags", container, "less");

}

function searchInput() {
    searchCountry(inSearch.value);
}
function allCountry() {
    callApi("all", "?fields=name,flags,latlng,population,languages,currencies,capital,borders", container, "less");
}
start();

israel.addEventListener("click", clickCountry);
france.addEventListener("click", clickCountry);
USA.addEventListener("click", clickCountry);
GB.addEventListener("click", clickCountry);
thailand.addEventListener("click", clickCountry);
search.addEventListener("click", searchInput)
select.addEventListener("change", clickOption);
all.addEventListener("click", allCountry)
home.addEventListener("click", start)

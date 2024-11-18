import { usedCars } from './usedCars.js';

function createCarCard(carInfo) {
    // destructure the car object
    const {year, make, model, mileage, price, color, gasMileage} = carInfo;

    // building the car card html
    const carTemplate = `
        <div class="card">
            <h3>${year} ${make} ${model}</h3>
            <div class="car-details">
                <h3>Mileage: ${mileage}</h3>
                <h3>Price: ${price}</h3>
                <h3>Color: ${color}</h3>
                <h3>Gas Mileage: ${gasMileage}</h3>
            </div>
        </div>
    `;
    return carTemplate;
}

// clear any content for search purposes
function clearResults() {
    result.innerHTML = "";
}

function showResults() {
    clearResults();
    let carsCardList;
    if (isFiltering == true)  {
        filterMakes();
        filterColors();
        carsFilteredList = usedCars.filter(filterCars); 
    }
    else { 
        carsFilteredList = usedCars; 
    }
    if (carsFilteredList.length != 0) {
        carsCardList = carsFilteredList.map(createCarCard).join("");
        result.innerHTML += carsCardList;
    }
    else {
        result.innerHTML += `<p id="no-result-text">No cars found. Please try again...</p>`
    }
}

function showFilteredResults(e) {
    e.preventDefault();
    isFiltering = true;
    showResults();
    isFiltering = false;
}

function filterCars(carInfo) {
    const {year, make, model, mileage, price, color, gasMileage} = carInfo;
    return year >= minYear.value 
    && year <= maxYear.value 
    && filteredMakesList.includes(make.toLowerCase()) 
    && filteredColorsList.includes(color.toLowerCase()) 
    && mileage <= (mileageTag.value || mileageTag.placeholder)
    && price <= (priceTag.value || priceTag.placeholder)
    ? carInfo : null;
}

const form = document.getElementById("filter-properties");
let isFiltering = false;
let carsFilteredList; const minYear = document.getElementById("min-year");
const minYearNumber = document.getElementById("min-year-number");
const maxYear = document.getElementById("max-year");
const maxYearNumber = document.getElementById("max-year-number");
const resetButton = document.getElementById("reset-btn");
const filterButton = document.getElementById("filter-btn");
const selectAllMakesButton = document.getElementById("select-all-makes");
const deselectAllMakesButton = document.getElementById("deselect-all-makes");
const selectAllColorsButton = document.getElementById("select-all-colors");
const deselectAllColorsButton = document.getElementById("deselect-all-colors");
const mileageTag = document.getElementById("mileage");
const priceTag = document.getElementById("price");

const allMakes = ["toyota", "honda", "ford", "nissan", "chevrolet", "volkswagen", "hyundai", "subaru", "mazda", 
    "kia", "dodge", "cadillac", "jaguar", "tesla", "porsche", "lexus", "bmw"];
let filteredMakesList;
const allColors = ["silver", "white", "black", "blue", "red", "gray", "green"];
let filteredColorsList;

function filterMakes() {
    filteredMakesList = [];
    allMakes.forEach (makeId => {
        const makeName = document.getElementById(makeId);
        if (makeName && makeName.checked) { filteredMakesList.push(makeId) }
    });
}

function selectAllMakes(e) {
    if (e) { e.preventDefault() };
    allMakes.forEach(make => document.getElementById(make).checked = true);
}

function deselectAllMakes(e) {
    e.preventDefault();
    allMakes.forEach(make => document.getElementById(make).checked = false);
}

function filterColors() {
    filteredColorsList = [];
    allColors.forEach (colorId => {
        const colorName = document.getElementById(colorId);
        if (colorName && colorName.checked) { filteredColorsList.push(colorId) }
    });
}

function selectAllColors(e) {
    if (e) { e.preventDefault() };
    allColors.forEach(color => document.getElementById(color).checked = true);
}

function deselectAllColors(e) {
    e.preventDefault();
    allColors.forEach(color => document.getElementById(color).checked = false);
}

function displayMinYear() {
    minYearNumber.textContent = minYear.value;
}

function displayMaxYear() {
    maxYearNumber.textContent = maxYear.value;
}

function onClickReset(e) {
    e.preventDefault();
    minYear.value = 2014;
    maxYear.value = 2020;
    minYearNumber.textContent = 2014;
    maxYearNumber.textContent = 2020;
    mileageTag.placeholder = 99999;
    priceTag.placeholder = 99999;
    mileageTag.value = null;
    priceTag.value = null;
    selectAllMakes();
    selectAllColors();
    isFiltering = false;
    showResults();
}

function firstLoad() {
    loadAllMakes();
    loadAllColors();
    showResults();
}

function loadAllMakes() {
    allMakes.forEach(make => document.getElementById(make).checked = true);
}

function loadAllColors() {
    allColors.forEach(color => document.getElementById(color).checked = true);
}


minYear.addEventListener("input", displayMinYear);
maxYear.addEventListener("input", displayMaxYear);
form.addEventListener("reset", onClickReset);
form.addEventListener("submit", showFilteredResults);
selectAllMakesButton.addEventListener("click", selectAllMakes);
deselectAllMakesButton.addEventListener("click", deselectAllMakes);
selectAllColorsButton.addEventListener("click", selectAllColors);
deselectAllColorsButton.addEventListener("click", deselectAllColors);

firstLoad();

// work on array functions, map, filter, and one more

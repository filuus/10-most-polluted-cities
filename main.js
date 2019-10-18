function getInfo(name, index, array) {
    let main = document.querySelector('.main_container');
    let descriptionContent = document.querySelector('.description-content');
    let descriptionModal = document.querySelector('.description-modal');

    // PREV AND NEXT BUTTONS
    let prev = document.querySelector('#prev-button');
    let next = document.querySelector('#next-button');
    let newPrev = prev.cloneNode(true);
    let newNext = next.cloneNode(true);
    prev.parentNode.replaceChild(newPrev, prev);
    next.parentNode.replaceChild(newNext, next);
    if(index != 0) {
        newPrev.classList.remove('disactive');
        newPrev.classList.add('active');
        newPrev.addEventListener('click', () => {
            getInfo(array[index - 1].name, index - 1, array);
        });
    } else {
        newPrev.classList.remove('active');
        newPrev.classList.add('disactive');
    }
    if(index != 9) {
        newNext.classList.remove('disactive');
        newNext.classList.add('active');
        newNext.addEventListener('click', () => {
            getInfo(array[index + 1].name, index + 1, array);
        });
    } else {
        newNext.classList.remove('active');
        newNext.classList.add('disactive');
    }
    // END

    main.classList.add('hidden');
    descriptionModal.classList.remove('hidden');
    fetch('http://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&explaintext&redirects=1&titles=' + name + '&origin=*&format=json')
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            if(response.query.pages[Object.keys(response.query.pages)[0]].extract !== undefined) {
                descriptionContent.innerHTML = '<h3>' + name + '</h3>' + response.query.pages[Object.keys(response.query.pages)[0]].extract;
            } else {
                descriptionContent.innerHTML = '<h3>' + name + '</h3><p>Sorry, we have technical problems, but we are still working on it :)</p>';
            }
            
        })
        .catch(function (error) {
            descriptionContent.innerHTML = '<h3>' + name + '</h3><p>Sorry, we have technical problems, but we are still working on it :)</p>';
        });
}

function autocomplete() {
    let countries = ['Poland', 'Germany', 'France', 'Spain']
    let filtered = [];
    let input = document.querySelector('input[type=text]');
    let listOfCountries = document.querySelector('#countries');
    let currentCountry = -1;
    function checkValue(elem) {
        return elem.toLowerCase().indexOf(input.value.toLowerCase()) != -1 ? true : false;
    }
    function selectCountry(country) {
        input.value = country.innerText;
        listOfCountries.innerHTML = '';
    }
    function selectCountryEvent(country) {
        country.addEventListener('click', () => {
            selectCountry(country);
        });
    }
    function changeHover(currentCountry) {
        let currentHover = document.querySelector('.hover');
        if(currentHover) {
            currentHover.classList.remove('hover');
        }
        listOfCountries.children[currentCountry].classList.add('hover');
    }

    function usingKeyboard(inputElement) {
        inputElement.addEventListener('keyup', (e) => {
            filtered = countries.filter(checkValue);
            countOfCountry = filtered.length;
            if (e.keyCode == 40) { // arrow DOWN
                currentCountry = (currentCountry + 1) % countOfCountry;
                changeHover(currentCountry);
            } else if (e.keyCode == 38) { // arrow UP
                currentCountry = (currentCountry + countOfCountry - 1) % countOfCountry;
                changeHover(currentCountry);
            } else if (e.keyCode == 13) { // ENTER
                if(listOfCountries.children.length >= 1 && currentCountry != -1) {
                    selectCountry(listOfCountries.children[currentCountry]);
                } else {
                    getCountries();
                }
            } else {
                currentCountry = -1;
                listOfCountries.innerHTML = '';
                if(input.value) {
                    filtered.forEach((elem) => {
                        let li = document.createElement('li');
                        li.innerText = elem;
                        selectCountryEvent(li);
                        listOfCountries.appendChild(li);
                    });
                }
            }
        });
    }
    
    usingKeyboard(input);
}

function writeRow(elem, index, array) {
    let table = document.querySelector('ul#cities');
    let row = document.createElement('li');
    let span = document.createElement('span');

    row.addEventListener('click', function () {
        getInfo(elem.name, index, array);
    });
    span.innerText = elem.name;

    table.appendChild(row);
    row.appendChild(span);
}

function countryNameValidate() {
    let country = document.querySelector("input[type=text]").value.toLowerCase();
    let shortName = '';
    if (country == 'poland' || country == 'germany' || country == 'spain' || country == 'france') {
        switch (country) {
            case 'poland':
                shortName = 'PL';
                break;
            case 'germany':
                shortName = 'DE';
                break;
            case 'spain':
                shortName = 'ES';
                break;
            case 'france':
                shortName = 'FR';
                break;
        }
        return {"value": country, "shortName": shortName};
    } else {
        return false;
    }
}

function getCountries() {
    let alert = document.querySelector('.message');
    if(countryNameValidate()) {
        alert.classList.add('hidden');
        let modal = document.querySelector('.search-modal');
        modal.style.display = 'none';
        sessionStorage.setItem('inputValue', countryNameValidate().value)
        let url = 'https://api.openaq.org/v1/cities?country=' + countryNameValidate().shortName + '&sort=desc&order_by=count&limit=10';
        fetch(url)
            .then(resp => {
                return resp.json();
            })
            .then(resp => {
                let table = document.querySelector('ul#cities');
                table.innerHTML = '';
                resp.results.forEach(writeRow);
            })
    } else {
        alert.classList.remove('hidden');
    }
}

function search(button) {
    button.addEventListener('click', () => {
        getCountries();
    });
}

function showSearchModal(button) {
    button.addEventListener('click', () => {
        let table = document.querySelector('ul#cities');
        table.innerHTML = '';
        let modal = document.querySelector('.search-modal');
        modal.style.display = 'grid';
    });
}

function goToBack(button) {
    button.addEventListener('click', () => {
        let main = document.querySelector('.main_container');
        let descriptionModal = document.querySelector('.description-modal');
        let descriptionContent = document.querySelector('.description-content');
        descriptionModal.classList.add('hidden');
        descriptionContent.innerHTML = '';
        main.classList.remove('hidden');
    });
}

let init = function initialize() {
    document.addEventListener('DOMContentLoaded', (event) => {
        document.querySelector('input[type=text]').value = sessionStorage.getItem('inputValue');
        search(document.querySelector("#modal-search-button"));
        showSearchModal(document.querySelector("#corner-search-button"));
        goToBack(document.querySelector("#corner-back-button"));
        autocomplete();
    })
}

init();
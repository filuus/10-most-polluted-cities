import Country from './country.js';

class Navi {
    constructor(countries) {
        this.countries = countries;
        this.filtered = [];
        this.listOfCountries = document.querySelector('#countries');
        this.input = document.querySelector('input[type=text]');
        this.currentCountry = -1;
    }

    checkValue(elem) {
        console.log(this);
        return elem.toLowerCase().indexOf(document.querySelector('input[type=text]').value.toLowerCase()) != -1 ? true : false;
    }
    selectCountry(country) {
        this.input.value = country.innerText;
        this.listOfCountries.innerHTML = '';
    }
    selectCountryEvent(country) {
        country.addEventListener('click', () => {
            this.selectCountry(country);
        });
    }
    changeHover(currentCountry) {
        let currentHover = document.querySelector('.hover');
        if (currentHover) {
            currentHover.classList.remove('hover');
        }
        this.listOfCountries.children[currentCountry].classList.add('hover');
    }

    usingKeyboard(inputElement) {
        inputElement.addEventListener('keyup', (e) => {
            this.filtered = this.countries.filter(this.checkValue);
            let countOfCountry = this.filtered.length;
            if (e.keyCode == 40) { // arrow DOWN
                this.currentCountry = (this.currentCountry + 1) % countOfCountry;
                this.changeHover(this.currentCountry);
            } else if (e.keyCode == 38) { // arrow UP
                this.currentCountry = (this.currentCountry + countOfCountry - 1) % countOfCountry;
                this.changeHover(this.currentCountry);
            } else if (e.keyCode == 13) { // ENTER
                if (this.listOfCountries.children.length >= 1 && this.currentCountry != -1) {
                    this.selectCountry(this.listOfCountries.children[this.currentCountry]);
                } else {
                    let country = new Country(this.input.value);
                    country.getCities();
                }
            } else {
                this.currentCountry = -1;
                this.listOfCountries.innerHTML = '';
                if (this.input.value) {
                    this.filtered.forEach((elem) => {
                        let li = document.createElement('li');
                        li.innerText = elem;
                        this.selectCountryEvent(li);
                        this.listOfCountries.appendChild(li);
                    });
                }
            }
        });
    }

    search(button) {
        button.addEventListener('click', () => {
            let country = new Country(this.input.value);
            country.getCities();
        });
    }

    showSearchModal(button) {
        button.addEventListener('click', () => {
            let table = document.querySelector('ul#cities');
            table.innerHTML = '';
            let modal = document.querySelector('.search-modal');
            modal.style.display = 'grid';
        });
    }

    goToBack(button) {
        button.addEventListener('click', () => {
            let main = document.querySelector('.main_container');
            let descriptionModal = document.querySelector('.description-modal');
            let descriptionContent = document.querySelector('.description-content');
            descriptionModal.classList.add('hidden');
            descriptionContent.innerHTML = '';
            main.classList.remove('hidden');
        });
    }
}

export default Navi
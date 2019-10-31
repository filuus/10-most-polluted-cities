import City from './city.js';

class Country {
    constructor(name) {
        this.name = name;
    }

    getCities() {
        console.log(this.name);
        let alert = document.querySelector('.message');
        if (this.countryNameValidate()) {
            alert.classList.add('hidden');
            let modal = document.querySelector('.search-modal');
            modal.style.display = 'none';
            sessionStorage.setItem('inputValue', this.countryNameValidate().value)
            let url = 'https://api.openaq.org/v1/cities?country=' + this.countryNameValidate().shortName + '&sort=desc&order_by=count&limit=10';
            fetch(url)
                .then(resp => {
                    return resp.json();
                })
                .then(resp => {
                    let table = document.querySelector('ul#cities');
                    table.innerHTML = '';
                    resp.results.forEach(this.writeRow);
                })
        } else {
            alert.classList.remove('hidden');
        }
    }

    countryNameValidate() {
        let country = this.name.toLowerCase();
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
            return {
                "value": country,
                "shortName": shortName
            };
        } else {
            return false;
        }
    }

    writeRow(elem, index, array) {
        let table = document.querySelector('ul#cities');
        let row = document.createElement('li');
        let span = document.createElement('span');
        let city = new City(elem.name);
        row.addEventListener('click', function () {
            city.getInfo(elem.name, index, array);
        });
        span.innerText = elem.name;

        table.appendChild(row);
        row.appendChild(span);
    }
}

export default Country
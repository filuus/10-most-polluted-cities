class City {
    constructor(name) {
        this.name = name
    }

    getInfo(name, index, array) {
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
        if (index != 0) {
            newPrev.classList.remove('disactive');
            newPrev.classList.add('active');
            newPrev.addEventListener('click', () => {
                this.getInfo(array[index - 1].name, index - 1, array);
            });
        } else {
            newPrev.classList.remove('active');
            newPrev.classList.add('disactive');
        }
        if (index != 9) {
            newNext.classList.remove('disactive');
            newNext.classList.add('active');
            newNext.addEventListener('click', () => {
                this.getInfo(array[index + 1].name, index + 1, array);
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
                if (response.query.pages[Object.keys(response.query.pages)[0]].extract !== undefined) {
                    descriptionContent.innerHTML = '<h3>' + name + '</h3>' + response.query.pages[Object.keys(response.query.pages)[0]].extract;
                } else {
                    descriptionContent.innerHTML = '<h3>' + name + '</h3><p>Sorry, we have technical problems, but we are still working on it :)</p>';
                }

            })
            .catch(function (error) {
                descriptionContent.innerHTML = '<h3>' + name + '</h3><p>Sorry, we have technical problems, but we are still working on it :)</p>';
            });
    }
}

export default City
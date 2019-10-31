import Navi from './navi.js';

document.querySelector('input[type=text]').value = sessionStorage.getItem('inputValue');
let navi = new Navi([`Poland`, `Germany`, `Spain`, `France`]);
navi.usingKeyboard(document.querySelector('input[type=text]'));
navi.search(document.querySelector("#modal-search-button"));
navi.showSearchModal(document.querySelector("#corner-search-button"));
navi.goToBack(document.querySelector("#corner-back-button"));
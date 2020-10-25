// You may wish to find an effective randomizer function on MDN.

/*const { getJSON } = require("cypress/types/jquery");
const { json } = require("express");*/

function range(int) {
  const arr = [];
  for (let i = 0; i < int; i += 1) {
    arr.push(i);
  }
  return arr;
}

function sortFunction(a, b, key) {
  if (a[key] < b[key]) {
    return -1;
  } if (a[key] > b[key]) {
    return 1;
  }
  return 0;
}

document.body.addEventListener('submit', async (e) => {
  e.preventDefault(); // this stops whatever the browser wanted to do itself.
  const form = $(e.target).serializeArray(); // here we're using jQuery to serialize the form
  fetch('/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  })
    .then((fromServer) => fromServer.json())
    .then((fromServer) => {

      const tenNumbers = [];
      const tenCountries =[];
      const tenCodes =[];
      let i, j, k;

      function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
      }

      for (i = 0; i < 10; i++) {
        tenNumbers.push(getRandomInt(countries.length-1));
      }
      for (j = 0; j < 10; j++) {
        tenCountries.push(countries[tenNumbers[j]].name);
        tenCodes.push(countries[tenNumbers[j]].code);
      }

      tenCountries.sort();
      tenCountries.reverse();
      tenCodes.sort();
      tenCodes.reverse();

      function listFunction() {
        if (document.querySelector('.flex-inner')) {
          document.querySelector('.flex-inner').remove();
        }

        const ul = document.createElement('ul');
        ul.className ='.flex-inner';
        $('form').prepend(ul);
        
        for (k = 0; k < 10; k++) {
          const li = document.createElement('li');
          $(li).append('<input type="checkbox" value=${tenCodes[k].code} id=${tenCodes[k].code} />');
          $(li).append('<label for=${tenCodes[k].code}${tenCountries[k].name}</label>');
          $(ul).append(li);
        }
      }
      console.log('fromServer', fromServer);
    })
    .catch((err) => console.log(err));
  ul.className ='.flex-inner';
  }
});
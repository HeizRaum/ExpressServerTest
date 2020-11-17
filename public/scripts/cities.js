class Watchable {
  constructor(object, fun) {
    this.object = object;
    this.callback = fun;
  }

  add(object) {
    this.object.append(object);
    this.callback();
  }

  set(object) {
    this.object = object;
    this.callback();
  }
}

let cities = new Watchable({}, () => {
  updateListView();
});
let list;

function init() {
  this.getCitiesFromServer();
}

function getCitiesFromServer() {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      cities.set(JSON.parse(this.responseText));
    }
  };
  xhttp.open('GET', '/cities?cities=all', true);
  xhttp.send();
}

function sendToServer(input) {
  const xhttp = new XMLHttpRequest();

  xhttp.open('POST', '/cities', true);
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      getCitiesFromServer();
    }
  };
  xhttp.setRequestHeader('Content-Type', 'application/json');
  xhttp.send(JSON.stringify({
    'city': input.value
  }));
}

function updateListView() {
  if (list === null || list === undefined) {
    list = document.getElementById('cityList');
  }
  list.textContent = '';
  for (let entry in cities.object) {
    let listElement = document.createElement('div');
    listElement.className = 'card';

    let listName = document.createElement('p');
    listName.className = 'cardTitle';
    listName.textContent = cities.object[entry].name;

    let deleteButton = document.createElement('button');
    deleteButton.classList = 'searchButton gray';
    let trashIcon = document.createElement('i');
    trashIcon.classList = 'fas fa-trash-alt';
    trashIcon.style.fontSize = '24pt';
    deleteButton.appendChild(trashIcon);
    
    listElement.appendChild(listName);
    listElement.appendChild(deleteButton);
    list.appendChild(listElement);
  }
}

init();
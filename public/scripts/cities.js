function loadCities() {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if(this.readyState == 4 && this.status == 200) {
      document.getElementById('input').value = this.responseText;
    }
  };
  xhttp.open('GET', '/cities?cities=all', true);
  xhttp.send();
}

loadCities();
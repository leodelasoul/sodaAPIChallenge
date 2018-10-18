const movieTitle = localStorage.getItem("title");
const movieIndex = localStorage.getItem("id");
const dataUl = document.getElementById('dataUl');

console.log(movieIndex + " " + movieTitle);

function removeList(){
    while (dataUl.firstChild) {
      dataUl.removeChild(dataUl.firstChild);
    }
}

function selectAllFromIndex() {
  var request = new XMLHttpRequest();
  request.open('GET', "https://data.sfgov.org/resource/wwmu-gmzc.json?$select=*&$limit=1&$offset="+movieIndex, true)
  request.onload = function(){
    if(request.status >= 200 && request.status < 400){
      var rawJson = JSON.parse(this.response);

      var li = document.createElement('li');
      li.textContent = JSON.stringify(rawJson);
      dataUl.appendChild(li);
    }

  else{
    console.log("error");
  }
}
  request.send();

}

function selectAllFromSearch() {
  var movieTitleOpt = "'".concat(movieTitle,"'")
  var request = new XMLHttpRequest();
  request.open('GET', "https://data.sfgov.org/resource/wwmu-gmzc.json?$select=*&$where=title="+movieTitleOpt+"&$limit=1&$offset="+movieIndex, true)
  request.onload = function(){
    if(request.status >= 200 && request.status < 400){
      removeList();
      var rawJson = JSON.parse(this.response);
      var li = document.createElement('li');
      li.textContent = JSON.stringify(rawJson);
      dataUl.appendChild(li);
    }
  else{
    console.log("error");
  }
}
  request.send();

}
window.onload = selectAllFromIndex();

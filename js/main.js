const directorUl = document.getElementById('directorUl');
const titleUl = document.getElementById('titleUl');
const releaseUl = document.getElementById('releaseUl');


function recieveJSON() {
  var request = new XMLHttpRequest();
  request.open('GET', "https://data.sfgov.org/resource/wwmu-gmzc.json?$select=director,release_year,title&$limit=10", true)
  request.onload = function(){
    if(request.status >= 200 && request.status < 400){
      var rawJson = JSON.parse(this.response);
          JSONtoList(rawJson, removeList);
    }

  else{
    console.log("error");
  }
}
  request.send();

}


function searchFor(){
  var searchString = document.getElementById("searchField").value;
  searchString = "'".concat(searchString,"'")
  var request = new XMLHttpRequest();

  //var test = "https://data.sfgov.org/resource/wwmu-gmzc.json?$select=director,release_year,title&$where=title="+searchString;
  request.open('GET', "https://data.sfgov.org/resource/wwmu-gmzc.json?$select=director,release_year,title&$where=title="+searchString, true);
  request.onload = function(){
    if(request.status >= 200 && request.status < 400){
      var rawJson = JSON.parse(this.response);
      console.log(rawJson)
      JSONtoList(rawJson,removeList);

  }
  else{
    console.log("error");
  }
  }
  request.send()
}


function removeList(rawJson){
  //console.log(rawJson.);
    while (directorUl.firstChild) {
      directorUl.removeChild(directorUl.firstChild);
      titleUl.removeChild(titleUl.firstChild);
      releaseUl.removeChild(releaseUl.firstChild);
    }
}

function JSONtoList(rawJson, removeList){
    if(Boolean(titleUl.childElementCount > 0) && Boolean(directorUl.childElementCount > 0) && Boolean(releaseUl.childElementCount > 0)){
      return removeList(rawJson);
    }
    else {
      rawJson.forEach(filmLoc =>{
        li = document.createElement('li');
        //li.textContent = JSON.stringify(filmLoc)
        li.textContent = filmLoc.title;
        titleUl.appendChild(li);

        li1 = document.createElement('li');
        li1.textContent = filmLoc.director;
        directorUl.appendChild(li1);

        li2 = document.createElement('li');
        li2.textContent = filmLoc.release_year;
        releaseUl.appendChild(li2);

      });
    }


}

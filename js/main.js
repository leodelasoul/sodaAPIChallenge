const directorUl = document.getElementById('directorUl');
const titleUl = document.getElementById('titleUl');
const releaseUl = document.getElementById('releaseUl');

const directorH = document.getElementById('directorH');
const titleH = document.getElementById('releaseH4').addEventListener("click",orderList);



function recieveJSON() {
  var request = new XMLHttpRequest();
  request.open('GET', "https://data.sfgov.org/resource/wwmu-gmzc.json?$select=director,release_year,title&$limit=100", true)
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




function removeList(){
  //console.log(rawJson.);
    while (directorUl.firstChild) {
      directorUl.removeChild(directorUl.firstChild);
      titleUl.removeChild(titleUl.firstChild);
      releaseUl.removeChild(releaseUl.firstChild);
    }
}

function orderList(){

  var request = new XMLHttpRequest();
  request.open('GET', "https://data.sfgov.org/resource/wwmu-gmzc.json?$select=director,release_year,title&$order=director ASC&$limit=5", true)
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

function JSONtoList(rawJson, removeList){
  removeList();
  var index = [];
      rawJson.forEach(filmLoc =>{
        index.push(filmLoc);
        console.log(index.length);
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

const directorUl = document.getElementById('directorUl');
const titleUl = document.getElementById('titleUl');
const releaseUl = document.getElementById('releaseUl');

const directorH = document.getElementById('directorH4').addEventListener("click",orderList);
const titleH = document.getElementById('releaseH4');

var page = 100;

//manages pagination of results within 100 steps of entries
function pageHandler(recieveJSON){

  var plusButton = document.getElementById('plus');
  var minusButton = document.getElementById('minus');

  minusButton.onclick = function(){
    if(page > 100){
    page = page - 100;
    recieveJSON(page)
    }
  };
    plusButton.onclick = function(){
      if(page < 1700){
      page = page + 100;
      recieveJSON(page)
    }
  };
}

//main query of getting the results for a the desired 3 fields, note: its kind of useless because entries are not unique and getting knowledge out of it is uncertain
//uses json get request and is then put in lists
function recieveJSON() {
  pageHandler(recieveJSON)
  var request = new XMLHttpRequest();
  request.open('GET', "https://data.sfgov.org/resource/wwmu-gmzc.json?$select=director,release_year,title&$limit="+page, true)
  request.onload = function(){
    if(request.status >= 200 && request.status < 400){
      var rawJson = JSON.parse(this.response);
          JSONtoList(rawJson, removeList);
          return rawJson;
    }

  else{
    console.log("error");
  }
}
  request.send();

}


//same as above, only that its gets a where statement to the query,taken from the input field
function searchFor(){
  var searchString = document.getElementById("searchField").value;
  searchString = "'".concat(searchString,"'")
  var request = new XMLHttpRequest();
  request.open('GET', "https://data.sfgov.org/resource/wwmu-gmzc.json?$select=director,release_year,title&$where=title="+searchString, true);
  request.onload = function(){
    if(request.status >= 200 && request.status < 400){
      var rawJson = JSON.parse(this.response);
      JSONtoList(rawJson,removeList);


  }
  else{
    console.log("error");
  }
  }
  request.send()
}



//clearing old queries, more of a intuitional practice
function removeList(){
    while (directorUl.firstChild) {
      directorUl.removeChild(directorUl.firstChild);
      titleUl.removeChild(titleUl.firstChild);
      releaseUl.removeChild(releaseUl.firstChild);
    }
}
//'filtering'?
function orderList(){
  var request = new XMLHttpRequest();
  request.open('GET', "https://data.sfgov.org/resource/wwmu-gmzc.json?$select=director,release_year,title&$order=director ASC&", true)
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

  //directorH.ondblclick = recieveJSON();
}
//creates the elements, first: clear data, then create a internal index making entries "unique", build the dom tree with a click event for the movie titles
function JSONtoList(rawJson, removeList){
  removeList();
  var index = [];
      rawJson.forEach(function (filmLoc, i){

        index.push(filmLoc);

        var li = document.createElement('li');
        var a = document.createElement('a');

        a.textContent = filmLoc.title;
        var liU = titleUl.appendChild(li);
        liU.appendChild(a).setAttribute('href',"detail.html");

        //used jquery as more of a hack
          $(a).on('click', function(event) {
            window.location = "detail.html";
            event.preventDefault();

            localStorage.setItem('title', a.textContent);
            localStorage.setItem('id', i);

          });



        var li1 = document.createElement('li');
        li1.textContent = filmLoc.director;
        directorUl.appendChild(li1);

        var li2 = document.createElement('li');
        li2.textContent = filmLoc.release_year;
        releaseUl.appendChild(li2);

      });
}

window.onload = recieveJSON();

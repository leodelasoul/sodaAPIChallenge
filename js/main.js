const directorUl = document.getElementById('directorUl');
const titleUl = document.getElementById('titleUl');
const releaseUl = document.getElementById('releaseUl');


var count = 0;

function recieveJSON() {
  var request = new XMLHttpRequest();
  request.open('GET', "https://data.sfgov.org/resource/wwmu-gmzc.json?$select=director,release_year,title", true)
  request.onload = function(){
    if(request.status >= 200 && request.status < 400){
      var index = [];
      var rawJson = JSON.parse(this.response);

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
    else{
      console.log("error");
    }
}
  request.send();
}

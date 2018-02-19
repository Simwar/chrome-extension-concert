chrome.runtime.onMessage.addListener(function(request, sender) {
  if (request.action == "getSource") {
    var artist = request.source;
    message.innerText = artist;
    //ret.innerText = artist;
    getHTMLFromInfoconcert(artist);
  }
});


function getHTMLFromInfoconcert(artist) {
  var url = "http://www.infoconcert.com/recherche-concert-avancee.html?motclef_artiste=" + artist + "&motclef_ville=Paris";
  //ret.innerText = url;
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    var response = xhr.responseText;
    var parser = new DOMParser();
    var doc = parser.parseFromString(response, "text/html");
    //ghet button reservez in order to take only bookable shows
    var links = doc.getElementsByClassName("btn btn_reservez png2");
    //display reservation link
    ret.innerText = links.item(0).getAttribute("href");
  }
  xhr.open("GET", url, true);
  xhr.send();
}

function onWindowLoad() {

  var message = document.querySelector('#message');
  var ret = document.querySelector('#ret');

  chrome.tabs.executeScript(null, {
    file: "getArtistName.js"
  }, function() {
    // If you try and inject into an extensions page or the webstore/NTP you'll get an error
    if (chrome.runtime.lastError) {
      message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
    }
  });

}

window.onload = onWindowLoad;
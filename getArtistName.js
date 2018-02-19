function DOMtoString(document_root) {
    var name = '';
    var c = document.getElementsByClassName("player-track-link");
    for (i=0; i<c.length;i++)
    {
        if (c.item(i).getAttribute("href").includes("/artist/"))
            name = c.item(i).text;
    }
    return name;
}

chrome.runtime.sendMessage({
    action: "getSource",
    source: DOMtoString(document)
});
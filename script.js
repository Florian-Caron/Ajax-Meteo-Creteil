// Heure = Hourly data
// Température = TMP2m
// ** Utiliser la méthode tableau pour récupérer les heures

function maj(){
    // Envoie une demande AJAX et reçoit une réponse
    let reponse = traitement("GET", "https://www.prevision-meteo.ch/services/json/creteil", false)
    // Traduit la réponse en format JSON
    let infosMeteo = JSON.parse(reponse)

    let heure;
    let tableAffichage = "<table><tr class='titres'><th>Heure</th><th>Température</th><th>Conditions</th><th>Aperçu</th></tr>";

    // Récupération des données dans un tableau
    for (let i=0; i<=23;i++){
        heure = i + "H00";
        tableAffichage += "<tr><td>" + heure + "</td>"; // Heure
        tableAffichage += "<td>" + infosMeteo.fcst_day_0.hourly_data[heure].TMP2m + "°C </td>"; // Température
        tableAffichage += "<td>" + infosMeteo.fcst_day_0.hourly_data[heure].CONDITION + "</td>";
        tableAffichage += "<td>" + "<img src='" + infosMeteo.fcst_day_0.hourly_data[heure].ICON + "'>" +"</td></tr>"; // Aperçu
    }
    tableAffichage += "</table>";

    // Affichage du tableau dans la balise main
    document.getElementById("contenu").innerHTML = tableAffichage;

    // modification du CSS
    document.getElementsByTagName("body")[0].style.marginBottom = "10em"
}




function traitement(method, url, async) {
    // Requete XML, ouverture du fichier .CSV
    let requeteXML = new XMLHttpRequest();
    requeteXML.open(method, url, async);
    requeteXML.send(null);

    // Test si la requête est bonne ou non
    if(requeteXML.readyState===4 && requeteXML.status===200) {
        // Permet de détecter si le fichier est sous le format XML ou non
        if (url.substr(url.length-3, 3)=== "xml") {
            return requeteXML.responseXML;
        } else {
            return requeteXML.responseText;
        }
    } else {
        alert("Erreur HTTP N°" + requeteXML.status);
    }
}

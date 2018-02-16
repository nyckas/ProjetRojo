var allPub = document.getElementById("allPub");
ajaxGet("https://cryptic-sands-30430.herokuapp.com/pub/allPubGet/"+sessionStorage.nom, function (reponse) {
    var publications = JSON.parse(reponse);
    for (var i = 0; i < publications.length; i++) {
        var paragraphe = document.createElement("p");
            paragraphe.innerHTML = "<div class='post-content'>"+
              "<div class='post-container'>"+
                "<img src='assets/images/users/user-5.jpg' alt='user' class='profile-photo-md pull-left' />"+
                "<div class='post-detail'>"+
                  "<div class='user-info'>"+
                    "<h5><a href='timeline.html' class='profile-link'>"+publications[i]["auteur"].nom+" "+publications[i]["auteur"].prenom+"</a></h5>"+
                  "</div>"+
                  "<div class='reaction'>"+
                    "<a class='btn text-green' onclick='jaimer("+JSON.stringify(publications[i]["id"])+")'><i class='icon ion-thumbsup'></i> "+publications[i]["jaime"]+"</a>"+
                    "<a class='btn text-red' href='commenter.jsp?id="+publications[i]["id"]+"'><i class='icon ion-chatboxes'></i> Commenter</a>"+
                  "</div>"+
                  "<div class='line-divider'></div>"+
                  "<div class='post-text'>"+
                    "<p>Titre : "+publications[i]["titre"]+" </br> Interet: "+publications[i]["interet"].valeur+" </br> Date: "+ new Date(publications[i]["daty"])+" </br></br>"+publications[i]["detail"]+" </br></br> Paff: "+publications[i]["paff"]+" Ariary</p>"+
                  "</div>"+
                  "<div class='line-divider'></div>"+
                "</div>"+
              "</div>"+
            "</div>";
            allPub.appendChild(paragraphe);
    }
  });
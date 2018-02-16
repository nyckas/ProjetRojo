var allInvitation = document.getElementById("allInvitation");
ajaxGet("https://cryptic-sands-30430.herokuapp.com/pub/allInvitationGet/"+sessionStorage.nom, function (reponse) {
    var invitations = JSON.parse(reponse);
    console.log(invitations);
    for (var i = 0; i < invitations.length; i++) {
        var paragraphe = document.createElement("p");
            paragraphe.innerHTML = "<div class='nearby-user'>"+
            "<div class='row'>"+
                "<div class='col-md-2 col-sm-2'>"+
                "<img src='assets/images/users/user-15.jpg' alt='user' class='profile-photo-lg' />"+
                "</div>"+
                "<div class='col-md-7 col-sm-7'>"+
                "<h5><a href='#' class='profile-link'>"+invitations[i]["invitation"].auteur.nom+" "+invitations[i]["invitation"].auteur.prenom+"</a></h5>"+
                "<p>Titre : "+invitations[i]["invitation"].titre+" </p>"+
                "<p>Interet : "+invitations[i]["invitation"].interet.valeur+" </p>"+
                "<p>Lieu : "+invitations[i]["invitation"].lieu.lieu+" </p>"+
                "<p> Date: "+ new Date(invitations[i]["invitation"].daty)+" </p>"+
                "<p class='text-muted'>Paff: "+invitations[i]["invitation"].paff+" Ariary</p>"+
                "</div>"+
                "<div class='col-md-3 col-sm-3'>"+
                "<a onclick='accepter("+JSON.stringify(invitations[i]["id"])+")' class='btn btn-primary pull-right'>Accepter</a>"+
                "</div></br></br></br></br></br></br>"+
                "<div class='col-md-3 col-sm-3'>"+
                "<a onclick='refuser("+JSON.stringify(invitations[i]["id"])+")' class='btn btn-danger pull-right'>Supprimer&nbsp;&nbsp;</a>"+
                "</div>"+
            "</div>"+
        "</div>";
            allInvitation.appendChild(paragraphe);
    }
  });
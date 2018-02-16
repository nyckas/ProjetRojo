var publication = document.getElementById("publication");
var commentaire = document.getElementById("commentaire");
var get_id = getQuerystringDef('id','false');
var urlPub= "https://cryptic-sands-30430.herokuapp.com/pub/mypubId/"+get_id;
var urlCommentaire = "https://cryptic-sands-30430.herokuapp.com/commentaire/allCommentsGet/"+get_id;

ajaxGet(urlPub, function (reponse) {
    var publicat = JSON.parse(reponse);
    console.log(publicat);
        var paragraphe = document.createElement("p");
            paragraphe.innerHTML = "<img src='assets/images/users/user-5.jpg' alt='user' class='profile-photo-md pull-left' />"+
            "<div class='post-detail'>"+
            "<div class='user-info'>"+
            "<h5><a href='timeline.html' class='profile-link'>"+publicat["auteur"].nom+" "+publicat["auteur"].prenom+"</a> </h5>"+
            "</div>"+
            "<div class='reaction'>"+
            "<a class='btn text-green'><i class='icon ion-thumbsup'></i> "+publicat["jaime"]+"</a>"+
            "</div>"+
            "<div class='line-divider'></div>"+
            "<div class='post-text'>"+
            "<p>Titre : "+publicat["titre"]+" </br> Interet: "+publicat["interet"].valeur+" </br> Date: "+ new Date(publicat["daty"])+" </br></br>"+publicat["detail"]+" </br></br> Paff: "+publicat["paff"]+" Ariary</p>"+
            "</div>"+
            "</div>";
        //publication.empty();
        publication.appendChild(paragraphe);
    
});

ajaxGet(urlCommentaire, function (reponse) {
    var commentair = JSON.parse(reponse);
    console.log(commentair);
    var data_length = commentair.length;
    for (var i = 0; i < data_length; i++) {
        var paragraphes = document.createElement("p");
            paragraphes.innerHTML = "<div class='post-comment'>"+
            "<img src='assets/images/users/user-11.jpg' alt='' class='profile-photo-sm' />"+
            "<div class='post-detail'><p><a href='timeline.html' class='profile-link'>"+commentair[i]["personne"].nom+" "+commentair[i]["personne"].prenom+"</a> </i>"+commentair[i]["commentaire"]+"</p></div>"+
      "</div>";

      commentaire.appendChild(paragraphes);
    }
   
});
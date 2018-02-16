// Exécute un appel AJAX GET
// Prend en paramètres l'URL cible et la fonction callback appelée en cas de succès
function ajaxGet(url, callback) {
    var req = new XMLHttpRequest();
    req.open("GET", url);
    req.addEventListener("load", function() {
        if (req.status >= 200 && req.status < 400) {
            // Appelle la fonction callback en lui passant la réponse de la requête
            callback(req.responseText);
        } else {
            console.error(req.status + " " + req.statusText + " " + url);
        }
    });
    req.addEventListener("error", function() {
        console.error("Erreur réseau avec l'URL " + url);
    });
    req.send(null);
}

// Exécute un appel AJAX POST
// Prend en paramètres l'URL cible, la donnée à envoyer et la fonction callback appelée en cas de succès
function ajaxPost(url, data, callback) {
    var req = new XMLHttpRequest();
    req.open("POST", url);
    req.addEventListener("load", function () {
        if (req.status >= 200 && req.status < 400) {
            // Appelle la fonction callback en lui passant la réponse de la requête
            callback(req.responseText);
        } else {
            console.error(req.status + " " + req.statusText + " " + url);
        }
    });
    req.addEventListener("error", function () {
        console.error("Erreur réseau avec l'URL " + url);
    });
    req.send(data);
}

function connexion() {

    var login = $('#my-email').val();
    var password = $('#my-password').val();
    //alert(login+"/"+password);
    var data={login: login, password: password};
    $.ajax({
              url: "https://cryptic-sands-30430.herokuapp.com/user/login",
              type: 'POST',
              contentType:'application/json',
              data: JSON.stringify(data),
              dataType:'json',
              success: function(data){
                if(data.id==="0"){
                    alert("Ce compte n'existe pas");
                }else if(data.id==="1"){
                    alert("Mot de passe incorrect");
                }else{
                sessionStorage.setItem("id", data.id);
                sessionStorage.setItem("nom", data.nom);
                sessionStorage.setItem("prenom", data.prenom);
                sessionStorage.setItem("naissance", data.naissance);
                sessionStorage.setItem("adresse", data.adresse);
                sessionStorage.setItem("telephone", data.telephone);
                sessionStorage.setItem("adresseMail", data.adresseMail);
                console.log(data.id);
                alert("Bienvenu chez Plan'Inona " + data.prenom);
                document.location.href ="listPub.jsp";
                }
              },
              error: function(xhr, ajaxOptions, thrownError) {
                 //On error do this
                   if (xhr.status === 200) {
                       console.log(ajaxOptions);
                   }
                   else {
                       console.log(xhr.status);
                       console.log(thrownError);
                   }
               }
            });
    
}

function inscription() {

    var nom = $('#nom').val();
    var prenom = $('#prenom').val();
    var naissance = $('#naissance').val();
    var email = $('#email').val();
    var password = $('#password').val();
    var confirm = $('#confirm').val();
    if(password===confirm){
    var data={name: nom, lastname: prenom, naissance: naissance, mail: email, password: password};
    $.ajax({
              url: "https://cryptic-sands-30430.herokuapp.com/user/signup",
              type: 'POST',
              contentType:'application/json',
              data: JSON.stringify(data),
              dataType:'json',
              success: function(data){
                if(data.id==="0"){
                    alert("Erreur!!! Votre compte n'a pas pu être créé!!!");
                }else{
                alert("Votre compte a été créé avec succes!!");
                document.location.href ="index.jsp";
                }
              },
              error: function(xhr, ajaxOptions, thrownError) {
                 //On error do this
                   if (xhr.status === 200) {
                       console.log(ajaxOptions);
                   }
                   else {
                       console.log(xhr.status);
                       console.log(thrownError);
                   }
               }
            });
  }else{
    alert("Verifiez les deux mots de passe!!!");
  }    
}

function creerPlan() {

    var titre = $('#titre').val();
    var daty = $('#daty').val();
    var idinteret = $('#interet').val();
    var idadresse = $('#lieu').val();
    var participation = $('#participation').val();
    var detail = $('#detail').val();
    if(titre==="" || daty==="" || idinteret===""){
       alert("Veeuillez remplir tous les champs!!!");
    }else{
    var data={daty: daty, idinteret: idinteret, mailUser: sessionStorage.adresseMail, idadresse: idadresse, detail: detail, titre: titre, paff: participation};
    console.log(data);
    $.ajax({
              url: "https://cryptic-sands-30430.herokuapp.com/pub/creer",
              type: 'POST',
              contentType:'application/json',
              data: JSON.stringify(data),
              dataType:'json',
              success: function(data){
                alert(data);
                console.log(data);
                if(data==="0"){
                    alert("Erreur!!! Votre demande n'a pas pu être traité!!!");
                }else{
                alert("Votre demante a été soumis, Les membres recevront une invitation!!!");
                document.location.href ="index.jsp";
                }
              },
              error: function(xhr, ajaxOptions, thrownError) {
                 //On error do this
                   if (xhr.status === 200) {
                       console.log(ajaxOptions);
                   }
                   else {
                       console.log(xhr.status);
                       console.log(thrownError);
                   }
               }
            });
  }    
}

function jaimer(idPub) {
    var mail =sessionStorage.adresseMail;
    var data={publication: idPub, personne: mail};
    //alert(idPub+" / "+mail);
    $.ajax({
              url: "https://cryptic-sands-30430.herokuapp.com/jaime/jaimeWeb",
              type: 'POST',
              contentType:'application/json',
              data: JSON.stringify(data),
              dataType:'json',
              success: function(data){
                console.log(data);
                //alert("Votre demante a été soumis, Les membres recevront une invitation!!!");
                document.location.href ="listPub.jsp";
              },
              error: function(xhr, ajaxOptions, thrownError) {
                 //On error do this
                   if (xhr.status === 200) {
                       console.log(ajaxOptions);
                   }
                   else {
                       console.log(xhr.status);
                       console.log(thrownError);
                   }
               }
            });
}

function accepter(idInv) {
    ajaxGet("https://cryptic-sands-30430.herokuapp.com/pub/accept/"+idInv, function (reponse) {
    var res = JSON.parse(reponse);
    console.log(res);
    if (res==="0"){
        alert("Erreur");
    }else{
        document.location.href ="listInvitation.jsp";
    }
        
    });
}

function refuser(idInv) {
    ajaxGet("https://cryptic-sands-30430.herokuapp.com/pub/refuse/"+idInv, function (reponse) {
    var res = JSON.parse(reponse);
    console.log(res);
    if (res==="0"){
        alert("Erreur");
    }else{
        document.location.href ="listInvitation.jsp";
    }
        
    });
}

function getQuerystringDef(key, default_) {
    if (default_ == null) default_ = "";
    key = key.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + key + "=([^&#]*)");
    var qs = regex.exec(window.location.href);

    if (qs == null)
        return default_;
    else
        return qs[1];
}

function commenter() {
    var get_id = getQuerystringDef('id','false');
    var comments=$('#comments').val();
    var data={publication: get_id, personne: sessionStorage.adresseMail, commentaire: comments};
    $.ajax({
        url: "https://cryptic-sands-30430.herokuapp.com/commentaire/commenter",
        type: 'POST',
        contentType:'application/json',
        data: JSON.stringify(data),
        dataType:'json',
        success: function(data){
          console.log(data);
          //alert("Votre demante a été soumis, Les membres recevront une invitation!!!");
          document.location.href ="commenter.jsp?id="+get_id;
        },
        error: function(xhr, ajaxOptions, thrownError) {
           //On error do this
             if (xhr.status === 200) {
                 console.log(ajaxOptions);
             }
             else {
                 console.log(xhr.status);
                 console.log(thrownError);
             }
         }
      });
}

function deconnexion(){
    var id = sessionStorage.id;
    if(id !== undefined){
        sessionStorage.clear();
        document.location.href = "index.jsp";
        alert("A bientôt");
    }
}


package com.music.music.controller;

import com.music.music.domain.Commentaire;
import com.music.music.domain.Publication;
import com.music.music.domain.User;
import com.music.music.service.interfaceservice.CommentaireService;
import com.music.music.service.interfaceservice.PublicationService;
import com.music.music.service.interfaceservice.UserService;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@CrossOrigin(origins = "*")
@RequestMapping("commentaire")
public class CommentaireController {
    private final SimpMessagingTemplate template;
    UserService userservice;
    PublicationService pubservice;
    CommentaireService comservice;

    @Autowired
    CommentaireController(SimpMessagingTemplate template,UserService userservice,PublicationService pubservice,CommentaireService comservice){
        this.pubservice=pubservice;
        this.userservice=userservice;
        this.template=template;
        this.comservice=comservice;
    }

    @MessageMapping("/send/commentaire")
    public void onReceveidMessage(String message) throws Exception{
        System.out.println(message);
        JSONParser parser = new JSONParser();
        JSONObject json = (JSONObject) parser.parse(message);

        String mailUser=(String)json.get("personne");
        String commentaire=(String)json.get("commentaire");
        String idp=(String)json.get("publication");
        System.out.println(mailUser+"/"+idp+"/"+commentaire);

        Publication publication=this.pubservice.getPublicationById(idp);
        User user=userservice.getUserByMail(mailUser);
        Commentaire aInsere=new Commentaire();

        aInsere.setCommentaire(commentaire);
        aInsere.setPersonne(user);
        aInsere.setPublication(publication.getId());
        Commentaire inserer=comservice.saveCommentaire(aInsere);
        this.template.convertAndSend("/chat/"+publication.getId(),inserer);
    }

    @CrossOrigin(origins = "*")
    @RequestMapping(value="/allComments",method={RequestMethod.POST})
    @ResponseBody
    public List<Commentaire> getAll(@RequestBody String data)throws Exception{
        JSONParser parser = new JSONParser();
        JSONObject json = (JSONObject) parser.parse(data);
        String id=(String)json.get("id");
        return comservice.getAll(id);
    }

    @CrossOrigin(origins = "*")
    @RequestMapping(value="/allCommentsGet/{id}",method={RequestMethod.GET})
    @ResponseBody
    public List<Commentaire> getAllComments(@PathVariable("id") String id){
        return comservice.getAll(id);
    }

    @CrossOrigin(origins = "*")
    @RequestMapping(value="/commenter",method={RequestMethod.POST})
    @ResponseBody
    public Commentaire commenter(@RequestBody String message) throws Exception{
        System.out.println(message);
        JSONParser parser = new JSONParser();
        JSONObject json = (JSONObject) parser.parse(message);

        String mailUser=(String)json.get("personne");
        String commentaire=(String)json.get("commentaire");
        String idp=(String)json.get("publication");
        System.out.println(mailUser+"/"+idp+"/"+commentaire);

        Publication publication=this.pubservice.getPublicationById(idp);
        User user=userservice.getUserByMail(mailUser);
        Commentaire aInsere=new Commentaire();

        aInsere.setCommentaire(commentaire);
        aInsere.setPersonne(user);
        aInsere.setPublication(publication.getId());
        Commentaire inserer=comservice.saveCommentaire(aInsere);
        return inserer;
    }
}

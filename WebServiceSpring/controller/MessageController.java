package com.music.music.controller;

import com.music.music.domain.User;
import com.music.music.domain.UserConnecte;
import com.music.music.service.interfaceservice.UserConnecteService;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.ArrayList;
import java.util.List;

@Controller
@CrossOrigin(origins = "*")
public class MessageController {
    private final SimpMessagingTemplate template;
    private UserConnecteService service;

    @Autowired
    MessageController(SimpMessagingTemplate template,UserConnecteService service){
        this.service=service;
        this.template=template;
    }

    @MessageMapping("/send/message")
    public void onReceveidMessage(String message) throws Exception{
        JSONParser parser = new JSONParser();
        JSONObject json = (JSONObject) parser.parse(message);
        String destinataire=(String)json.get("recipient");
        this.template.convertAndSend("/chat/"+destinataire,message);
    }

    @MessageMapping("/welcome")
    public void welcomming(String user)throws Exception{
        JSONParser parser = new JSONParser();
        JSONObject json = (JSONObject) parser.parse(user);
        User u=new User();
        u.setId((String)json.get("id"));
        u.setNom((String)json.get("nom"));
        u.setPrenom((String)json.get("prenom"));
        u.setAdresseMail((String)json.get("adresseMail"));
        UserConnecte userConnecte=new UserConnecte();
        userConnecte.setPersonne(u);
        this.service.insertUserConnecte(userConnecte);
        List<User> list=new ArrayList<User>();
        list=this.service.getAllConnecte();
        this.template.convertAndSend("/chat",list);
    }
}

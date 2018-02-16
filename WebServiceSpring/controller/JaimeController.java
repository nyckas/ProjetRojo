package com.music.music.controller;

import com.music.music.domain.Jaime;
import com.music.music.domain.User;
import com.music.music.service.interfaceservice.JaimeService;
import com.music.music.service.interfaceservice.PublicationService;
import com.music.music.service.interfaceservice.UserService;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@CrossOrigin(origins = "*")
@RequestMapping("/jaime")
public class JaimeController {
    private final SimpMessagingTemplate template;
    UserService userservice;
    PublicationService pubservice;
    JaimeService jaimeService;

    @Autowired
    public JaimeController(SimpMessagingTemplate template, UserService userservice, PublicationService pubservice, JaimeService jaimeService){
        this.template=template;
        this.userservice=userservice;
        this.pubservice=pubservice;
        this.jaimeService=jaimeService;
    }

    @MessageMapping("/jaime/jaimer")
    public void onReceveidMessage(String message) throws Exception{
        JSONParser parser = new JSONParser();
        JSONObject json = (JSONObject) parser.parse(message);
        String publication=(String)json.get("publication");
        String mailUser=(String)json.get("personne");
        User u=userservice.getUserByMail(mailUser);

        Jaime jaime=new Jaime();
        jaime.setPersonne(u);
        jaime.setPublication(publication);
        int nb=jaimeService.updateJaimePublication(jaime);
        this.template.convertAndSend("/chat/jaime",nb);
    }

    @CrossOrigin(origins = "*")
    @RequestMapping(value="/jaimeWeb",method={RequestMethod.POST})
    @ResponseBody
    public int jaimePub(@RequestBody String message) throws Exception{
        JSONParser parser = new JSONParser();
        JSONObject json = (JSONObject) parser.parse(message);
        String publication=(String)json.get("publication");
        String mailUser=(String)json.get("personne");
        System.out.println("publication : "+publication+" mail: "+mailUser);
        User u=userservice.getUserByMail(mailUser);

        Jaime jaime=new Jaime();
        jaime.setPersonne(u);
        jaime.setPublication(publication);
        int nb=jaimeService.updateJaimePublication(jaime);
        System.out.println(nb);
        return nb;
    }
}

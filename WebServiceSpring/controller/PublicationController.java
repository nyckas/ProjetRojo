package com.music.music.controller;

import com.music.music.domain.*;
import com.music.music.service.interfaceservice.*;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Controller
@CrossOrigin(origins = "*")
@RequestMapping("/pub")
public class PublicationController {
    CentreInteretService interetservice;
    AdresseService adresservice;
    UserService userservice;
    PublicationService pubservice;
    InvitationService invitationservice;
    public PublicationController(UserService us, PublicationService pb,AdresseService adresservice,CentreInteretService interetservice,InvitationService invitationservice){ this.userservice = us ; this.pubservice=pb; this.adresservice=adresservice;this.interetservice=interetservice; this.invitationservice=invitationservice; }

    @CrossOrigin(origins = "*")
    @RequestMapping(value="/creer",method={RequestMethod.POST})
    @ResponseBody
    public int creerPlan(@RequestBody String data)throws  Exception{
        int val=0;
        JSONParser parser = new JSONParser();
        JSONObject json = (JSONObject) parser.parse(data);

        SimpleDateFormat formatter =new SimpleDateFormat("yyyy-MM-dd");
        Date daty = formatter.parse((String)json.get("daty"));

        CentreInteret interet=new CentreInteret(); interet=interetservice.getCentreInteretById((String)json.get("idinteret"));
        User user = new User(); user= userservice.getUserByMail((String)json.get("mailUser"));
        Adresse adresse=new Adresse(); adresse=adresservice.findAdresseById((String)json.get("idadresse"));
        Publication pub=new Publication();
        pub.setAuteur(user);
        pub.setDaty(daty);
        pub.setDetail((String)json.get("detail"));
        pub.setLieu(adresse);
        pub.setInteret(interet);
        pub.setTitre((String)json.get("titre"));
        pub.setPaff(Double.parseDouble((String)json.get("paff")));
        pub.setJaime(0);

        List<User> list=new ArrayList<User>(); list=userservice.getAll();

        Publication p=new Publication();p=pubservice.save(pub);
        if(p.getId()!=null){
            list=userservice.getAll();
            List<Invitation> listInv=new ArrayList<Invitation>();
            for (User use : list) {
                if(use.getId().equals(pub.getAuteur().getId())==false) {
                    listInv.add(invitationservice.sendInvitation(pub, use));
                }
            }
            if(list.size()==(listInv.size()+1) || list.size()==listInv.size()){
                val= 1;
            }
        }
        return val;
    }

    @CrossOrigin(origins = "*")
    @RequestMapping(value="/nbInvitation",method={RequestMethod.POST})
    @ResponseBody
    public int nbInvitation(@RequestBody String data) throws Exception{
        JSONParser parser = new JSONParser();
        JSONObject json = (JSONObject) parser.parse(data);
        String mail=(String)json.get("mail");
        System.out.println(mail);
        return invitationservice.nombreInvitation(mail);
    }

    @CrossOrigin(origins = "*")
    @RequestMapping(value="/allInvitation",method={RequestMethod.POST})
    @ResponseBody
    public List<Invitation> allInvitation(@RequestBody String data)throws Exception{
        JSONParser parser = new JSONParser();
        JSONObject json = (JSONObject) parser.parse(data);
        String mail=(String)json.get("mail");
        System.out.println(mail);
        return invitationservice.getAllInvitation(mail);
    }

    @CrossOrigin(origins = "*")
    @RequestMapping(value="/allInvitationGet/{nom}",method={RequestMethod.GET})
    @ResponseBody
    public List<Invitation> allInvitationGet(@PathVariable("nom") String nom){
        System.out.println(nom);
        return invitationservice.getAllInvitationByName(nom);
    }

    @CrossOrigin(origins = "*")
    @RequestMapping(value="/getAllPub",method={RequestMethod.POST})
    @ResponseBody
    public List<Publication> getAllPub(@RequestBody String data)throws Exception{
        JSONParser parser = new JSONParser();
        JSONObject json = (JSONObject) parser.parse(data);
        String mail=(String)json.get("mail");
        System.out.println(mail);
        return invitationservice.getAllPublication(mail);
    }

    @CrossOrigin(origins = "*")
    @RequestMapping(value="/allPubGet/{nom}",method={RequestMethod.GET})
    @ResponseBody
    public List<Publication> allPubGet(@PathVariable("nom") String nom){
        return invitationservice.allPublicationGet(nom);
    }

    @CrossOrigin(origins = "*")
    @RequestMapping(value="/accept/{id}",method={RequestMethod.GET})
    @ResponseBody
    public int acceptInvitation(@PathVariable("id") String id){
        return invitationservice.acceptInvitation(id);
    }

    @CrossOrigin(origins = "*")
    @RequestMapping(value="/refuse/{id}",method={RequestMethod.GET})
    @ResponseBody
    public int refuseInvitation(@PathVariable("id") String id){
        return invitationservice.refuseInvitation(id);
    }

    @CrossOrigin(origins = "*")
    @RequestMapping(value="/findInvitationById/{id}",method={RequestMethod.GET})
    @ResponseBody
    public Invitation findInvitationById(@PathVariable("id") String id){
        return invitationservice.findInvitationById(id);
    }

    @CrossOrigin(origins = "*")
    @RequestMapping(value="/mypub/{nom}",method={RequestMethod.GET})
    @ResponseBody
    public List<Publication> mypub(@PathVariable("nom") String nom){
        return pubservice.myPublicationGet(nom);
    }

    @CrossOrigin(origins = "*")
    @RequestMapping(value="/mypubId/{id}",method={RequestMethod.GET})
    @ResponseBody
    public Publication mypubId(@PathVariable("id") String id){
        return pubservice.getPublicationById(id);
    }
}

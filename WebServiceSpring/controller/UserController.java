package com.music.music.controller;

import com.music.music.domain.User;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import com.music.music.service.interfaceservice.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.Date;


@Controller
@CrossOrigin(origins="*")
@RequestMapping("/user")
public class UserController {
    UserService service;
    public UserController(UserService us){ this.service = us ; }

    @CrossOrigin(origins = "*")
    @RequestMapping(value="/signup",method={RequestMethod.POST})
    @ResponseBody
    public User insert(@RequestBody String data)throws  Exception{
        JSONParser parser = new JSONParser();
        JSONObject json = (JSONObject) parser.parse(data);

        SimpleDateFormat formatter =new SimpleDateFormat("yyyy-MM-dd");
        Date naissance = formatter.parse((String)json.get("naissance"));
        User user = new User();
        user.setNom((String)json.get("name"));
        user.setPrenom((String)json.get("lastname"));
        user.setNaissance(naissance);
        user.setAdresseMail((String)json.get("mail"));
        user.setMotDePasse((String)json.get("password"));

        return service.saveUser(user);
    }

    @CrossOrigin(origins = "*")
    @RequestMapping(value="/login",method={RequestMethod.POST})
    @ResponseBody
    public User login(@RequestBody String data) throws Exception{
        JSONParser parser = new JSONParser();
        JSONObject json = (JSONObject) parser.parse(data);
        String mail=(String)json.get("login");
        String pass=(String)json.get("password");
        return service.login(mail,pass);
    }

    @CrossOrigin(origins = "*")
    @RequestMapping(value="/saveprofil",method={RequestMethod.POST})
    @ResponseBody
    public User profil(@RequestBody String data)throws  Exception{
        JSONParser parser = new JSONParser();
        JSONObject json = (JSONObject) parser.parse(data);

        String idUser= (String)json.get("idUser");
        String adresse= (String)json.get("adresse");
        String telephone= (String)json.get("telephone");
        String photo= (String)json.get("photo");
        return service.saveProfil(idUser,adresse,telephone,photo);
    }

}

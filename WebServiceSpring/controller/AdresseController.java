package com.music.music.controller;

import com.music.music.domain.Adresse;
import com.music.music.service.interfaceservice.AdresseService;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@CrossOrigin(origins = "*")
@RequestMapping("/adresse")
public class AdresseController {
    AdresseService service;
    public AdresseController(AdresseService as){ this.service = as ; }

    @CrossOrigin(origins = "*")
    @RequestMapping(value="/save",method={RequestMethod.POST})
    @ResponseBody
    public Adresse insert(@RequestBody String data)throws  Exception{
        JSONParser parser = new JSONParser();
        JSONObject json = (JSONObject) parser.parse(data);
        Adresse adresse = new Adresse();
        adresse.setLieu((String)json.get("lieu"));
        adresse.setLatitude((Double)json.get("latitude"));
        adresse.setLongitude((Double)json.get("logitude"));
        return service.saveAdresse(adresse);
    }

    @CrossOrigin(origins = "*")
    @RequestMapping(value="/findOne/{id}",method={RequestMethod.GET})
    @ResponseBody
    public Adresse findById(@PathVariable("id") String id){
        return service.findAdresseById(id);
    }

    @CrossOrigin(origins = "*")
    @RequestMapping(value="/findAll")
    @ResponseBody
    public List<Adresse> findAll(){
        return service.findAllAdresse();
    }
}

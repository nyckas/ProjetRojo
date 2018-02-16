package com.music.music.controller;

import com.music.music.domain.CentreInteret;
import com.music.music.service.interfaceservice.CentreInteretService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@CrossOrigin(origins = "*")
@RequestMapping("/interet")
public class CentreInteretController {
    CentreInteretService service;
    public CentreInteretController(CentreInteretService c){ this.service=c; }

    @CrossOrigin(origins = "*")
    @RequestMapping("/save")
    @ResponseBody
    public CentreInteret SaveInteret(){
        CentreInteret c=new CentreInteret();
        c.setValeur("Shooting");
        return service.saveCentreInteret(c);
    }

    @CrossOrigin(origins = "*")
    @RequestMapping(value="/getById/{id}",method={RequestMethod.GET})
    @ResponseBody
    public CentreInteret getCentreInteretById(@PathVariable("id") String id){ return  service.getCentreInteretById(id);}

    @CrossOrigin(origins = "*")
    @RequestMapping(value="/getAll")
    @ResponseBody
    public List<CentreInteret> getAllCentreInteret(){ return  service.getAllCentreInteret(); }
}

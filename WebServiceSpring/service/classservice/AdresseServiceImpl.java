package com.music.music.service.classservice;

import com.music.music.domain.Adresse;
import com.music.music.repository.AdresseDAORepository;
import com.music.music.service.interfaceservice.AdresseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdresseServiceImpl implements AdresseService {

    AdresseDAORepository adresse;
    MongoTemplate mongotemplate;

    @Autowired
    public AdresseServiceImpl(AdresseDAORepository adresse,MongoTemplate mongotemplate){
        this.adresse = adresse;
        this.mongotemplate=mongotemplate;
    }

    @Override
    public Adresse saveAdresse(Adresse a){
        Adresse reponse=new Adresse();
        reponse=adresse.insert(a);
        return reponse;

    }

    @Override
    public Adresse findAdresseById(String id){
        return adresse.findOne(id);
    }

    @Override
    public List<Adresse> findAllAdresse(){
        return adresse.findAll();
    }
}

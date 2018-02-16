package com.music.music.service.classservice;

import com.music.music.domain.Publication;
import com.music.music.repository.PublicationDAORepository;
import com.music.music.service.interfaceservice.PublicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class PublicationServiceImpl implements PublicationService {
    PublicationDAORepository publication;
    MongoTemplate mongotemplate;

    @Autowired
    public PublicationServiceImpl(PublicationDAORepository publication,MongoTemplate mongotemplate){
        this.publication = publication;
        this.mongotemplate=mongotemplate;
    }

    @Override
    public Publication save(Publication p){
        return publication.save(p);

    }

    @Override
    public List<Publication> getPublicationAVenir(){
        Date daty=new Date();
        Query query=new Query(Criteria.where("daty").gte(daty));
        return  mongotemplate.find(query,  Publication.class);

    }

    @Override
    public Publication getPublicationById(String id){
        return  publication.findOne(id);

    }

    @Override
    public List<Publication> getMyPublication(String mail){
        Query query=new Query(Criteria.where("auteur.adresseMail").is(mail));
        return  mongotemplate.find(query,  Publication.class);

    }

    @Override
    public List<Publication> myPublicationGet(String nom){
        Query query=new Query(Criteria.where("auteur.nom").is(nom));
        return  mongotemplate.find(query,  Publication.class);

    }
}

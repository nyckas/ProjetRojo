package com.music.music.service.classservice;

import com.mongodb.WriteResult;
import com.music.music.domain.Invitation;
import com.music.music.domain.Publication;
import com.music.music.domain.User;
import com.music.music.repository.InvitationDAORepository;
import com.music.music.repository.PublicationDAORepository;
import com.music.music.service.interfaceservice.InvitationService;
import com.music.music.service.interfaceservice.PublicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class InvitationServiceImpl implements InvitationService {

    InvitationDAORepository repository;
    PublicationService pubservice;
    MongoTemplate mongotemplate;

    @Autowired
    public InvitationServiceImpl(InvitationDAORepository i, MongoTemplate m, PublicationService pubservice){this.repository=i; this.mongotemplate=m;this.pubservice=pubservice;}

    @Override
    public Invitation sendInvitation(Publication p, User invite){
        Date d=new Date();
        Invitation i=new Invitation();
        i.setAccepte(false);
        i.setDateInvitation(d);
        i.setInvitation(p);
        i.setInvite(invite);
        return repository.save(i);
    }

    @Override
    public int acceptInvitation(String id){
        Query query=new Query(Criteria.where("_id").is(id));
        Update update = new Update();
        update.set("accepte", true);
        WriteResult result = mongotemplate.updateFirst(query, update, Invitation.class);
        if(result!=null)
            return result.getN();
        else
            return 0;
    }

    @Override
    public int refuseInvitation(String id){
        try{
            repository.delete(id);
            return 1;
        }catch(Exception e){
            return 0;
        }
    }

    @Override
    public int nombreInvitation(String mail){
        Query query=new Query();
        query.addCriteria(Criteria.where("accepte").is(false).and("invite.adresseMail").is(mail));
        return mongotemplate.find(query, Invitation.class).size();
    }

    @Override
    public List<Invitation> getAllInvitation(String mail){
        Query query=new Query();
        query.addCriteria(Criteria.where("accepte").is(false).and("invite.adresseMail").is(mail));
        return mongotemplate.find(query, Invitation.class);
    }

    @Override
    public List<Invitation> getAllInvitationByName(String nom){
        Query query=new Query();
        query.addCriteria(Criteria.where("accepte").is(false).and("invite.nom").is(nom));
        return mongotemplate.find(query, Invitation.class);
    }

    @Override
    public List<Publication> getAllPublication(String mail){
        List<Invitation> listInv=new ArrayList<Invitation>();
        List<Publication> listPub=new ArrayList<Publication>();
        List<Publication> myPub=new ArrayList<Publication>();
        List<Publication> response=new ArrayList<Publication>();
        myPub=pubservice.getMyPublication(mail);
        Query query=new Query();
        query.addCriteria(Criteria.where("accepte").is(true).and("invite.adresseMail").is(mail));
        listInv=mongotemplate.find(query, Invitation.class);
        for(Invitation invit : listInv){
            listPub.add(pubservice.getPublicationById(invit.getInvitation().getId()));
        }
        response.addAll(listPub);
        response.addAll(myPub);
        return response;
    }

    @Override
    public List<Publication> allPublicationGet(String nom){
        List<Invitation> listInv=new ArrayList<Invitation>();
        List<Publication> listPub=new ArrayList<Publication>();
        List<Publication> myPub=new ArrayList<Publication>();
        List<Publication> response=new ArrayList<Publication>();
        myPub=pubservice.myPublicationGet(nom);
        Query query=new Query();
        query.addCriteria(Criteria.where("accepte").is(true).and("invite.nom").is(nom));
        listInv=mongotemplate.find(query, Invitation.class);
        for(Invitation invit : listInv){
            listPub.add(pubservice.getPublicationById(invit.getInvitation().getId()));
        }
        response.addAll(listPub);
        response.addAll(myPub);
        return response;
    }

    @Override
    public Invitation findInvitationById(String id){
        Query query=new Query(Criteria.where("_id").is(id));
        return mongotemplate.findOne(query, Invitation.class);
    }
}

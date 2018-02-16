package com.music.music.service.classservice;

import com.mongodb.WriteResult;
import com.music.music.domain.User;
import com.music.music.domain.UserConnecte;
import com.music.music.repository.UserConnecteRepository;
import com.music.music.service.interfaceservice.UserConnecteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserConnecteServiceImpl implements UserConnecteService {

    UserConnecteRepository repository;
    MongoTemplate template;

    @Autowired
    public UserConnecteServiceImpl(UserConnecteRepository repository, MongoTemplate template){
        this.repository=repository;
        this.template=template;
    }

    @Override
    public UserConnecte insertUserConnecte(UserConnecte user){
        UserConnecte userC=new UserConnecte();
        int i=this.checkSiConnecte(user.getPersonne().getAdresseMail());
        if(i<=0){
            userC=this.insert(user);
        }
        return  userC;
    }

    @Override
    public int checkSiConnecte(String mail){
        Query query=new Query();
        query.addCriteria(Criteria.where("personne.adresseMail").is(mail));
        return template.find(query, UserConnecte.class).size();
    }

    @Override
    public UserConnecte insert(UserConnecte user){
        return this.repository.insert(user);
    }

    @Override
    public int deconnection(String mail){
        Query query=new Query();
        query.addCriteria(Criteria.where("personne.adresseMail").is(mail));
        WriteResult result= template.remove(query, UserConnecte.class);
        if(result!=null)
            return result.getN();
        else
            return 0;
    }

    @Override
    public List<User> getAllConnecte(){
        List<User> connecte=new ArrayList<User>();
        List<UserConnecte>userConnecte=new ArrayList<UserConnecte>();
        userConnecte=this.repository.findAll();
        for(UserConnecte userC : userConnecte ){
            connecte.add(userC.getPersonne());
        }
        return connecte;
    }

}

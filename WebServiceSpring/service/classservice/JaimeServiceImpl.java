package com.music.music.service.classservice;

import com.mongodb.WriteResult;
import com.music.music.domain.Jaime;
import com.music.music.domain.Publication;
import com.music.music.repository.JaimeDAORepository;
import com.music.music.repository.PublicationDAORepository;
import com.music.music.service.interfaceservice.JaimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

@Service
public class JaimeServiceImpl implements JaimeService {
    JaimeDAORepository repository;
    MongoTemplate template;

    @Autowired
    public JaimeServiceImpl( JaimeDAORepository repository,MongoTemplate template){
        this.repository=repository;
        this.template=template;
    }

    @Override
    public Jaime insertJaime(Jaime m){
        return repository.insert(m);
    }

    @Override
    public int deJaimer(Jaime jaime){
        Query query=new Query();
        query.addCriteria(Criteria.where("publication").is(jaime.getPublication()).and("personne.adresseMail").is(jaime.getPersonne().getAdresseMail()));
        try{
            template.remove(query,Jaime.class);
            return 1;
        }catch(Exception e){
            return 0;
        }
    }

    @Override
    public int checkJaime(Jaime jaime){
        int val=0;
        try {
            Query query = new Query();
            query.addCriteria(Criteria.where("publication").is(jaime.getPublication()).and("personne.adresseMail").is(jaime.getPersonne().getAdresseMail()));
            val = template.find(query, Jaime.class).size();
            return val;
        }catch(Exception e){
            return val;
        }
    }

    @Override
    public int updateNbJaimePublication(int i,Jaime jaime){
        Query query=new Query(Criteria.where("_id").is(jaime.getPublication()));
        Update update = new Update();
        update.set("jaime", i);
        WriteResult result = template.updateFirst(query, update, Publication.class);
        if(result!=null)
            return result.getN();
        else
            return 0;
    }

    @Override
    public int compterJaime(Jaime jaime){
        Query query=new Query();
        query.addCriteria(Criteria.where("publication").is(jaime.getPublication()));
        return template.find(query, Jaime.class).size();
    }

    @Override
    public int updateJaimePublication(Jaime jaime){
        int val=this.compterJaime(jaime);
        int teste=checkJaime(jaime);
        if(teste<=0){
            this.insertJaime(jaime);
            val=this.compterJaime(jaime);
            this.updateNbJaimePublication(val,jaime);
        }else if(teste>0){
            this.deJaimer(jaime);
            val=this.compterJaime(jaime);
            this.updateNbJaimePublication(val,jaime);
        }
        return val;
    }
}

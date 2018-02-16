package com.music.music.service.classservice;

import com.music.music.domain.Commentaire;
import com.music.music.repository.CommentaireDAORepository;
import com.music.music.service.interfaceservice.CommentaireService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentaireServiceImpl implements CommentaireService {

    CommentaireDAORepository repository;
    MongoTemplate template;

    @Autowired
    public CommentaireServiceImpl(CommentaireDAORepository repository,MongoTemplate template){
        this.repository=repository;
        this.template=template;
    }

    @Override
    public Commentaire saveCommentaire(Commentaire comments){
        return this.repository.save(comments);
    }

    @Override
    public List<Commentaire> getAll(String id){
        Query query=new Query();
        query.addCriteria(Criteria.where("publication").is(id));
        return template.find(query, Commentaire.class);
    }
}

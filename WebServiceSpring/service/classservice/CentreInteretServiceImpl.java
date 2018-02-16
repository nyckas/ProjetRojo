package com.music.music.service.classservice;

import com.music.music.domain.CentreInteret;
import com.music.music.repository.CentreInteretDAORepository;
import com.music.music.service.interfaceservice.CentreInteretService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CentreInteretServiceImpl implements CentreInteretService {
    CentreInteretDAORepository repository;
    MongoTemplate mongotemplate;

    @Autowired
    public CentreInteretServiceImpl(CentreInteretDAORepository repository, MongoTemplate mongotemplate){
        this.repository=repository;
        this.mongotemplate=mongotemplate;
    }

    @Override
    public CentreInteret saveCentreInteret(CentreInteret c) {
        CentreInteret centre=new CentreInteret();
        centre=repository.insert(c);
        return centre;
    }

    @Override
    public CentreInteret getCentreInteretById(String id) {
        return repository.findOne(id);
    }

    @Override
    public List<CentreInteret> getAllCentreInteret() {
        return repository.findAll();
    }
}

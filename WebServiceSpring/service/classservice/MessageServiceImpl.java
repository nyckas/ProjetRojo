package com.music.music.service.classservice;

import com.music.music.domain.Message;
import com.music.music.repository.MessageDAORepository;
import com.music.music.service.interfaceservice.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

@Service
public class MessageServiceImpl implements MessageService {
    MessageDAORepository repository;
    MongoTemplate mongotemplate;

    @Autowired
    public MessageServiceImpl(MessageDAORepository repository,MongoTemplate mongotemplate){
        this.repository=repository;
        this.mongotemplate=mongotemplate;
    }

    @Override
    public Message insertMessage(Message m){
        return repository.save(m);
    }
}

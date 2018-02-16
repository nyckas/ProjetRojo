package com.music.music.repository;

import com.music.music.domain.Message;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface MessageDAORepository extends MongoRepository<Message,String> {
}

package com.music.music.repository;

import com.music.music.domain.Jaime;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface JaimeDAORepository extends MongoRepository<Jaime,String> {
}

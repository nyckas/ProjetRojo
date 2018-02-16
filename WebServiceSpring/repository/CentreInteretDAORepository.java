package com.music.music.repository;

import com.music.music.domain.CentreInteret;
import com.music.music.domain.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CentreInteretDAORepository extends MongoRepository<CentreInteret,String> {
}

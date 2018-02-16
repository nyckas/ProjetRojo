package com.music.music.repository;

import com.music.music.domain.UserConnecte;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserConnecteRepository extends MongoRepository<UserConnecte,String>{
}

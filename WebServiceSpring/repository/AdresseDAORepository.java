package com.music.music.repository;

import com.music.music.domain.Adresse;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AdresseDAORepository extends MongoRepository<Adresse, String > {
}

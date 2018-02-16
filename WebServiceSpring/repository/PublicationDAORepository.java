package com.music.music.repository;

import com.music.music.domain.Publication;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PublicationDAORepository extends MongoRepository<Publication,String> {
}

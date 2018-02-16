package com.music.music.repository;

import com.music.music.domain.Commentaire;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CommentaireDAORepository extends MongoRepository<Commentaire,String> {
}

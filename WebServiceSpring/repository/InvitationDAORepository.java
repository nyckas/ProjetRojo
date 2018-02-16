package com.music.music.repository;

import com.music.music.domain.Invitation;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface InvitationDAORepository extends MongoRepository<Invitation,String> {
}

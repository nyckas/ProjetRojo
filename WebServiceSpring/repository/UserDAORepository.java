package com.music.music.repository;

import com.music.music.domain.Adresse;
import com.music.music.domain.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface UserDAORepository extends MongoRepository<User,String> {
    public User findByAdresseMailAndMotDePasse(String mail, String pass);
    public List<User> findByAdresse(Adresse a);
}

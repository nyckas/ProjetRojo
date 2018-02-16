package com.music.music.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

@Document(collection = "User")
public class User {
    @Id
    private String id;
    private String nom;
    private String prenom;
    private Date naissance;
    private Adresse adresse;
    private String adresseMail;
    private String telephone;
    private String image;
    private String motDePasse;
}

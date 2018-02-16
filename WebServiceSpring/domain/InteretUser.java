package com.music.music.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

@Document(collection = "InteretUser")
public class InteretUser {
    @DBRef
    private User utilisateur;
    @DBRef
    private CentreInteret sonInteret;
}
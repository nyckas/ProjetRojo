package com.music.music.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

@Document(collection = "Publication")
public class Publication {
    @Id
    private String id;
    private Date daty;
    private User auteur;
    private Adresse lieu;
    private CentreInteret interet;
    private String titre;
    private String detail;
    private Double paff;
    private String image;
    private int jaime;
}

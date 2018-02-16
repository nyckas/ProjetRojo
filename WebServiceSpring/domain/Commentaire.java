package com.music.music.domain;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

@Document(collection = "Commentaire")
public class Commentaire {
    private String id;
    private String publication;
    private User personne;
    private String commentaire;
}

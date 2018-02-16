package com.music.music.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

@Document(collection = "Invitation")
public class Invitation {

    private String id;
    private Publication invitation;
    private Date dateInvitation;
    private boolean accepte;
    private User invite;

}

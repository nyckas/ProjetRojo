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
@AllArgsConstructor
@NoArgsConstructor

@Document(collection = "Message")
public class Message {
    @Id
    private String id;
    private String sender;
    private User recipient;
    private User bodymessage;
    private Date daty;
}

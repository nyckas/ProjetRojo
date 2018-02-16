package com.music.music.service.interfaceservice;

import com.music.music.domain.Commentaire;

import java.util.List;

public interface CommentaireService {
    public Commentaire saveCommentaire(Commentaire comments);
    public List<Commentaire> getAll(String id);
}

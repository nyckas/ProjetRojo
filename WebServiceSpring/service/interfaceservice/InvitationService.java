package com.music.music.service.interfaceservice;

import com.music.music.domain.Invitation;
import com.music.music.domain.Publication;
import com.music.music.domain.User;

import java.util.List;

public interface InvitationService {
    public Invitation sendInvitation(Publication p, User invite);
    public int acceptInvitation(String id);
    public int refuseInvitation(String id);
    public int nombreInvitation(String mail);
    public List<Publication> getAllPublication(String mail);
    public List<Invitation> getAllInvitation(String mail);
    public Invitation findInvitationById(String id);
    public List<Publication> allPublicationGet(String id);
    public List<Invitation> getAllInvitationByName(String nom);

}

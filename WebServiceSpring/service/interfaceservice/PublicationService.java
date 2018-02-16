package com.music.music.service.interfaceservice;

import com.music.music.domain.Publication;

import java.util.List;

public interface PublicationService {
    public Publication save(Publication p);
    public List<Publication> getPublicationAVenir();
    public Publication getPublicationById(String id);
    public List<Publication> getMyPublication(String mail);
    public List<Publication> myPublicationGet(String id);

}

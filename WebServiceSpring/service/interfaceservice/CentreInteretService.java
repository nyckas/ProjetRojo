package com.music.music.service.interfaceservice;

import com.music.music.domain.CentreInteret;

import java.util.List;

public interface CentreInteretService {
    public CentreInteret saveCentreInteret(CentreInteret c);
    public CentreInteret getCentreInteretById(String id);
    public List<CentreInteret> getAllCentreInteret();
}

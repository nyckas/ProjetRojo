package com.music.music.service.interfaceservice;

import com.music.music.domain.Adresse;

import java.util.List;

public interface AdresseService {
    public Adresse saveAdresse(Adresse a);
    public Adresse findAdresseById(String id);
    public List<Adresse> findAllAdresse();
}

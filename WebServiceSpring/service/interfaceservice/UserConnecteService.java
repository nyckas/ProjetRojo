package com.music.music.service.interfaceservice;

import com.music.music.domain.User;
import com.music.music.domain.UserConnecte;

import java.util.List;

public interface UserConnecteService {
    public UserConnecte insertUserConnecte(UserConnecte user);
    public int checkSiConnecte(String mail);
    public UserConnecte insert(UserConnecte user);
    public int deconnection(String mail);
    public List<User> getAllConnecte();
}

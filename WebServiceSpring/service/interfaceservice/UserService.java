package com.music.music.service.interfaceservice;

import com.music.music.domain.Adresse;
import com.music.music.domain.User;

import java.util.List;

public interface UserService {
    public User saveUser(User u);
    public User getUserByMail(String mail);
    public int checkMail(String mail);
    public int checkPass(String pass);
    public User login(String  mail, String pass);
    public int updateTelephone(String id,String telephone);
    public int updateImage(String id,String image);
    public int updateAdresse(String id, Adresse a);
    public List<User> findUserByAdresse(Adresse a);
    public List<User> getAll();
    public  User saveProfil(String id, String adresse, String telephone, String photo);
}

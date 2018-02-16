package com.music.music.service.classservice;

import com.mongodb.WriteResult;
import com.music.music.domain.Adresse;
import com.music.music.domain.User;
import com.music.music.repository.AdresseDAORepository;
import com.music.music.repository.UserDAORepository;
import com.music.music.service.interfaceservice.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    UserDAORepository user;
    AdresseDAORepository adresseDao;
    MongoTemplate mongotemplate;

    @Autowired
    public UserServiceImpl(UserDAORepository user,MongoTemplate mongotemplate,AdresseDAORepository adresseDao){
        this.user = user;
        this.mongotemplate=mongotemplate;
        this.adresseDao=adresseDao;
    }

    @Override
    public User saveUser(User u) {
        User utilisateur =new User();
        utilisateur.setId("0");
        if(checkMail(u.getAdresseMail())>0){
            utilisateur.setId("1");
        }else{
            utilisateur=user.insert(u);
        }
        return  utilisateur;
    }

    @Override
    public User getUserByMail(String mail) {
        Query query=new Query();
        query.addCriteria(Criteria.where("adresseMail").is(mail));
        return mongotemplate.findOne(query, User.class);
    }

    @Override
    public List<User> getAll(){ return user.findAll();}

    @Override
    public int checkMail(String mail){
        Query query=new Query();
        query.addCriteria(Criteria.where("adresseMail").is(mail));
        return mongotemplate.find(query, User.class).size();
    }

    @Override
    public int checkPass(String pass){
        Query query=new Query();
        query.addCriteria(Criteria.where("motDePasse").is(pass));
        return mongotemplate.find(query, User.class).size();
    }

    @Override
    public User login(String  mail, String pass){
        User utilisateur=new User();
        if(checkMail(mail)>0){
            if(user.findByAdresseMailAndMotDePasse(mail,pass)==null){
                utilisateur.setId("1");
            }else{
                utilisateur=user.findByAdresseMailAndMotDePasse(mail,pass);
            }
        }else{
            utilisateur.setId("0");
        }
        return utilisateur;
    }

    @Override
    public int updateTelephone(String id,String telephone){
        Query query = new Query(Criteria.where("_id").is(id));
        Update update = new Update();
        update.set("telephone", telephone);
        WriteResult result = mongotemplate.updateFirst(query, update, User.class);
        if(result!=null)
            return result.getN();
        else
            return 0;
    }

    @Override
    public int updateImage(String id,String image){
        Query query = new Query(Criteria.where("_id").is(id));
        Update update = new Update();
        update.set("image", image);
        WriteResult result = mongotemplate.updateFirst(query, update, User.class);
        if(result!=null)
            return result.getN();
        else
            return 0;
    }

    @Override
    public int updateAdresse(String id, Adresse a){
        Query query=new Query(Criteria.where("_id").is(id));
        Update update = new Update();
        update.set("adresse", a);
        WriteResult result = mongotemplate.updateFirst(query, update, User.class);
        if(result!=null)
            return result.getN();
        else
            return 0;
    }

    public List<User> findUserByAdresse(Adresse a){
        return user.findByAdresse(a);
    }

    @Override
    public  User saveProfil(String id, String adresse, String telephone, String photo){
        User us=new User();
        try{
            this.updateImage(id,photo);
            this.updateTelephone(id,telephone);
            Adresse a=new Adresse();
            a=adresseDao.findOne(adresse);
            this.updateAdresse(id,a);
            us.setId(id); us.setAdresse(a);us.setTelephone(telephone);us.setImage(photo);
        }catch(Exception e){
            us.setId("0");
        }
        return  us;
    }

}

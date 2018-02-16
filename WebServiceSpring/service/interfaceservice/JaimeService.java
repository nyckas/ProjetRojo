package com.music.music.service.interfaceservice;

import com.music.music.domain.Jaime;

public interface JaimeService {
    public Jaime insertJaime(Jaime m);
    public int deJaimer(Jaime jaime);
    public int checkJaime(Jaime jaime);
    public int compterJaime(Jaime jaime);
    public int updateNbJaimePublication(int i,Jaime jaime);
    public int updateJaimePublication(Jaime jaime);
}

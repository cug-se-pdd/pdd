package com.panda.system.service;

import com.panda.system.domin.SysCinema;
import java.util.List;

public interface SysCinemaService {

    SysCinema findCinema();
    List<SysCinema> findAllCinemas();

    int updateCinema(SysCinema sysCinema);

    SysCinema findCinemaById(Long id);

}

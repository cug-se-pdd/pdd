package com.panda.system.mapper;

import com.panda.system.domin.SysCinema;
import com.panda.system.domin.SysMovie;
import com.panda.system.domin.vo.SysMovieVo;

import java.util.List;

public interface SysCinemaMapper {

    SysCinema findCinema();
    List<SysCinema> findAllCinemas();

    int updateCinema(SysCinema sysCinema);

    // 前台展示单个影院信息，返回包含影院、上映中的所有电影信息
    SysCinema findCinemaById(Long id);

}

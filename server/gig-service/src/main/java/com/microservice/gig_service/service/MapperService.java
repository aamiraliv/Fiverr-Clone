package com.microservice.gig_service.service;

import com.microservice.gig_service.model.Gig;
import com.microservice.gig_service.model.GigDTO;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MapperService {
    @Autowired
    private ModelMapper modelMapper;

    public GigDTO convertToDTO(Gig gig){
        return modelMapper.map(gig,GigDTO.class);
    }

    public Gig toEntity(GigDTO gigDTO){
        return modelMapper.map(gigDTO,Gig.class);
    }
}

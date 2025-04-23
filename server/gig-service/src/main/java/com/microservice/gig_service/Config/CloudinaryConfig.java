package com.microservice.gig_service.Config;


import com.cloudinary.Cloudinary;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class CloudinaryConfig {
    @Bean
    public Cloudinary cloudinary(){
        Map<String ,String > config = new HashMap<>();
        config.put("cloud_name","dntsodqdy");
        config.put("api_key", "611722341776857");
        config.put("api_secret", "RXvnpuyIeJduYkiihizNd3UAzYI");
        return new Cloudinary(config);
    }
}

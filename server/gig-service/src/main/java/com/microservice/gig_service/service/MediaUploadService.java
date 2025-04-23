package com.microservice.gig_service.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
public class MediaUploadService {

    @Autowired
    private Cloudinary cloudinary;

    public String uploadMedia(MultipartFile file) throws IOException {
        Map uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.asMap(
                "folder", "Fiverr-Clone"
        ));
        return uploadResult.get("secure_url").toString();
    }

}

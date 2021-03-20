package com.LeandroToloza.springboot.backend.apirest.models.services;


import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class UploadFileServiceImpl implements IUploadFileService{
	
	private final Logger log = LoggerFactory.getLogger(UploadFileServiceImpl.class);
	
	private final static String DIRECTORY_UPLOAD = "uploads";

	@Override
	public Resource upload(String photoName) throws MalformedURLException {
		
		Path filePath = getPath(photoName);
		log.info(filePath.toString());
		
		Resource resource = new UrlResource(filePath.toUri());
		
		if(!resource.exists() && !resource.isReadable()) {
			filePath = Paths.get("src/main/resources").resolve("no-user.png").toAbsolutePath();
			
			resource = new UrlResource(filePath.toUri());
			
			log.error("Error, we couldn't upload: " + photoName);
			
		}
		return resource;
	}

	@Override
	public String copy(MultipartFile file) throws IOException {
		
		String fileName = UUID.randomUUID().toString() + "_" +  file.getOriginalFilename().replace(" ", "");
		
		Path filePath = getPath(fileName);
		log.info(filePath.toString());
		
		Files.copy(file.getInputStream(), filePath);
		
		return fileName;
	}

	@Override
	public boolean delete(String photoName) {
		
		if(photoName !=null && photoName.length() >0) {
			Path lastPhotoPath = Paths.get("uploads").resolve(photoName).toAbsolutePath();
			File lastPhotoFile = lastPhotoPath.toFile();
			if(lastPhotoFile.exists() && lastPhotoFile.canRead()) {
				lastPhotoFile.delete();
				return true;
			}
		}
		
		return false;
	}

	@Override
	public Path getPath(String photoName) {
		return Paths.get(DIRECTORY_UPLOAD).resolve(photoName).toAbsolutePath();
	}

}
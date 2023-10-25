package com.WebMovie.ImplService;

import java.io.File;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.WebMovie.Service.UploadService;

import jakarta.servlet.ServletContext;

@Service
public class UploadServiceImpl implements UploadService{

	@Autowired
	ServletContext app;
	
	@Override
	public File save(MultipartFile file, String folder) {
		// TODO Auto-generated method stub
		File dir= new File(app.getRealPath(folder));
		
		if(!dir.exists()) {
			dir.mkdirs();
		}
		String s = System.currentTimeMillis() + file.getOriginalFilename();
		System.out.println(s);
		String name = Integer.toHexString(s.hashCode())+ s.substring(s.lastIndexOf("."));
		try {
			File saveFile = new File(dir, name);
			file.transferTo(saveFile);
			System.out.println(saveFile.getAbsolutePath());
			return saveFile;
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}
}

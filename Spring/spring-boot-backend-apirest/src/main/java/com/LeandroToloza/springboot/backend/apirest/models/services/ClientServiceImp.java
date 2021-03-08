package com.LeandroToloza.springboot.backend.apirest.models.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.LeandroToloza.springboot.backend.apirest.models.dao.IClientDao;
import com.LeandroToloza.springboot.backend.apirest.models.entity.Client;

@Service
public class ClientServiceImp implements IClientService {

	@Autowired
	private IClientDao clientDao;
	
	@Override
	@Transactional(readOnly = true)
	public List<Client> findAll() {
		return(List<Client>) clientDao.findAll();
	}

}

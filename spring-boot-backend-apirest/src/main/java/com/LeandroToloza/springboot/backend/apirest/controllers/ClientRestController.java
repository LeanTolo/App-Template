package com.LeandroToloza.springboot.backend.apirest.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.LeandroToloza.springboot.backend.apirest.models.entity.Client;
import com.LeandroToloza.springboot.backend.apirest.models.services.IClientService;

@CrossOrigin(origins = {"http://localhost:4200"})
@RestController
@RequestMapping("/api")
public class ClientRestController {

	
	@Autowired
	private IClientService clientService;
	
	@GetMapping("/clients")
	public List<Client> index(){
		return clientService.findAll();
	}
	
	@GetMapping("/clients/{id}")
	@ResponseStatus(HttpStatus.OK)
	public Client show(@PathVariable Long id) {
		return clientService.findById(id);
	}
	
	@PostMapping("/clients")
	@ResponseStatus(HttpStatus.CREATED) //201
	public Client create(@RequestBody Client client) {
		//client.setCreatedDate(new Date());
		return clientService.save(client);
	}
	
}

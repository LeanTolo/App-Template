package com.LeandroToloza.springboot.backend.apirest.controllers;


import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.*;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.LeandroToloza.springboot.backend.apirest.models.entity.Client;
import com.LeandroToloza.springboot.backend.apirest.models.services.IClientService;

@CrossOrigin(origins = {"http://localhost:4200"})
@Validated
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
	public ResponseEntity<?> show(@PathVariable Long id) {
		
		Client client = null;
		Map<String, Object> response = new HashMap<>();
		
		try 
		{
			client = clientService.findById(id);
		} 
		catch(DataAccessException e) 
		{
			response.put("message", "Database Error");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		if (client == null) {
			response.put("message", "Client Id: ".concat(id.toString().concat(" Not Found On Database!")));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<Client>(client, HttpStatus.OK);
	}
	
	@PostMapping("/clients")
	public ResponseEntity<?> create(@Valid @RequestBody Client client, BindingResult result) {
		
		Client newClient = null;
		Map<String, Object> response = new HashMap<>();
		
		if(result.hasErrors()) {
			
			List<String> errors = result.getFieldErrors()
					.stream()
					.map(err -> "Field: '" + err.getField() +"' "+ err.getDefaultMessage())
					.collect(Collectors.toList());
					
			
			response.put("errors", errors);
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);	
		}
		
		try 
		{
			newClient = clientService.save(client);
		}
		catch (DataAccessException e)
		{
			response.put("message", "Error Saving Client On Database");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);	
		}
		
		response.put("message", "Client Created Successfully");	
		response.put("client", newClient);
		
		return new ResponseEntity<Map<String,Object>>(response, HttpStatus.CREATED);
	}
	
	@PutMapping("/clients/{id}")
	public ResponseEntity<?> update(@Valid @RequestBody Client client, BindingResult result, @PathVariable Long id) {
		
		Client actualCli = clientService.findById(id);
		
		Client updatedClient = null;
		
		Map<String, Object> response = new HashMap<>();
		
		if(result.hasErrors()) {
			
			List<String> errors = result.getFieldErrors().stream()
					.map(err -> "Field: "+ err.getField() + " "+ err.getDefaultMessage())
					.collect(Collectors.toList());
			
			response.put("errors", errors);
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);	
		}

		if (actualCli == null) {
			response.put("message", "Client Id: ".concat(id.toString().concat(" Not Found On Database!")));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		}
		
		try 
		{
			actualCli.setName(client.getName());
			actualCli.setSurname(client.getSurname());
			actualCli.setEmail(client.getEmail());
			actualCli.setCreatedDate(client.getCreatedDate());
			
			updatedClient = clientService.save(actualCli);
		}
		catch (DataAccessException e)
		{
			response.put("message", "Error Updating Client On Database");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);	
		}
		
		response.put("message", "Client Updated Successfully");	
		response.put("client", updatedClient);
		
		return new ResponseEntity<Map<String,Object>>(response, HttpStatus.CREATED);
	}
	
	@DeleteMapping("/clients/{id}")
	public ResponseEntity<?> delete(@PathVariable Long id) {
		
		Map<String, Object> response = new HashMap<>();
		
		try
		{
			clientService.delete(id);
		}
		catch (DataAccessException e)
		{
			response.put("message", "Error Deleting Client On Database");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);	
		}
		
		response.put("message", "Client Deleted Successfully");	
		
		return new ResponseEntity<Map<String,Object>>(response, HttpStatus.OK);
		
	}
	
}

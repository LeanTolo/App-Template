package com.LeandroToloza.springboot.backend.apirest.models.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import com.LeandroToloza.springboot.backend.apirest.models.entity.Client;

public interface IClientDao extends JpaRepository<Client,Long>{

}

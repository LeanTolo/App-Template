package com.LeandroToloza.springboot.backend.apirest.models.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.LeandroToloza.springboot.backend.apirest.models.entity.Client;
import com.LeandroToloza.springboot.backend.apirest.models.entity.Region;

@Repository
public interface IClientDao extends JpaRepository<Client,Long>{

	@Query("from Region")
	public List<Region> findAllRegions();
	
}

package com.LeandroToloza.springboot.backend.apirest.models.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.Email;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.validation.constraints.*;


import lombok.Data;

@Entity
@Table(name="clients")
@Data
public class Client implements Serializable{

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	@NotEmpty
	@NotNull
	@Size(min=3, max=12)
	@Column(nullable=false)
	private String name;
	
	@NotEmpty
	@NotNull
	@Email
	@Column(nullable=false, unique=true)
	private String email;
	
	@NotEmpty
	@NotNull
	@Size(min=3, max=12)
	@Column(nullable=false)
	private String surname;
		
	@Column(name="created_date")             
	@Temporal(TemporalType.DATE)
	private Date createdDate;
	
	@NotNull(message="Region must have a value")
	@ManyToOne(fetch=FetchType.LAZY) // slowcharge, it generate a proxy to REGION
	@JoinColumn(name="region_id") //get the id from Region
	@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"}) // we ignore some proxyes from LAZY
	private Region cli_region;
	
	private String photo;
	
	@PrePersist
	public void prePersist() {
		createdDate = new Date();
	}
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

}

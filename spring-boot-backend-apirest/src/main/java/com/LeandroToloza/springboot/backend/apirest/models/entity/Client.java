package com.LeandroToloza.springboot.backend.apirest.models.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.PrePersist;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.Email;
import javax.validation.constraints.Size;
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

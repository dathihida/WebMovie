package com.WebMovie.Entity;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Data;

@Data
@Entity
@Table(name = "MOVIE")
public class Movie {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer ID;
	@Column(name ="name", columnDefinition = "NVARCHAR")
	private String NAME;
	@Column(name ="time", columnDefinition = "NVARCHAR")
	private String TIME;
	
	private String IMAGE;
	@Column(name = "description", columnDefinition = "nvarchar", nullable = false)
	private String DESCRIPTION;
	@Column(name = "diretors", columnDefinition = "nvarchar", nullable = false)
	private String DIRETORS;
	@Column(name ="actors", columnDefinition = "nvarchar", nullable = false)
	private String ACTORS;
	@Temporal(TemporalType.DATE)
	private Date PUBLISH_DATE;
	@Column(name ="trailer", columnDefinition = "nvarchar", nullable = false)
	private String TRAILER;
	private Boolean EXIST;
	@Column(name ="gerne", columnDefinition = "nvarchar", nullable = false)
	private String GERNE;
	
	@JsonIgnore
	@OneToMany(mappedBy = "ID_MOVIE")
	List<Movie_Scheduled> MOVIE_SCHEDULED;
}

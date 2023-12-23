package com.WebMovie.Entity;

import java.util.List;

import lombok.Data;

@Data
public class QueryResult {
	private String queryText;
    private Intent intent;
    //private List<Entity> entities;
    private List<Parameter> parameters;
}

package com.WebMovie.Entity;

import java.util.List;

import lombok.Data;

@Data
public class Intent {
	private String displayName;
    private List<Parameter> parameters;
    
    // Getter cho trường parameters
    public List<Parameter> getParameters() {
        return parameters;
    }
}

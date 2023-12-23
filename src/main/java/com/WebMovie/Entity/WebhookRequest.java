package com.WebMovie.Entity;

import lombok.Data;

@Data
public class WebhookRequest {
	private QueryResult queryResult;
	
	// Getter cho trường queryResult
    public QueryResult getQueryResult() {
        return queryResult;
    }
}

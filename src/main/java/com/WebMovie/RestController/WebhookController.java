package com.WebMovie.RestController;

import java.util.List;
import java.util.Map;

import org.cloudinary.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.WebMovie.Entity.Intent;
import com.WebMovie.Entity.Parameter;
import com.WebMovie.Entity.WebhookRequest;
import com.WebMovie.Entity.WebhookResponse;
import com.WebMovie.Service.IMovieService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;


@RestController
@CrossOrigin
@RequestMapping("/api/chat")
public class WebhookController {
	@Autowired
	IMovieService movieservice;
	@PostMapping("/webhook")
    public WebhookResponse handleWebhook(@RequestBody WebhookRequest request) throws JsonMappingException, JsonProcessingException {
		String fulfillmentText = "";
		
		Intent intent = request.getQueryResult().getIntent();
        // Lấy Intent từ WebhookRequest
        String intentName = request.getQueryResult().getIntent().getDisplayName();
        System.out.println("Intent: " + intentName);
        
     // Lấy thông tin parameters từ QueryResult 
        JSONObject parameters = new JSONObject(request.getQueryResult().getParameters());
        System.out.println("Parameters: " + parameters);

        // Kiểm tra các trường hợp intent và parameters
        if ("thongtinphim".equals(intentName)) {
            // Lấy giá trị của parameter "theloai" và "thoiluong"
        	// Kiểm tra và xử lý các tham số theo yêu cầu của bạn
        	if (parameters != null) {
                // Xử lý các tham số
                
                fulfillmentText = getMovieInfo(""+parameters);
            }
        } else if ("anotherIntent".equals(intentName)) {
            // Xử lý cho intent khác (nếu cần)
        }

        // Tạo phản hồi
        WebhookResponse response = new WebhookResponse();
        response.setFulfillmentText(fulfillmentText);

        return response;
    }
	

	

	private String getMovieInfo(String thoiLuong) {
	    // Thực hiện logic để lấy thông tin phim từ cơ sở dữ liệu dựa trên giá trị của parameters
	    // ...
		System.out.println("/"+thoiLuong);
	    return "Danh sách bộ phim có thời lượng " + thoiLuong;
	}

    private String getTicketPrice(String userInput) {
        // Xử lý logic để lấy giá vé từ cơ sở dữ liệu
        return "Giá vé: ...";
    }
    
    public void processParameter(Parameter parameter) {
        String parameterName = parameter.getName();
        String parameterValue = parameter.getValue();

        // Xử lý logic với parameterName và parameterValue
    }
}

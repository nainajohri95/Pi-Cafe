package com.picafe;

import com.picafe.controller.LoginRequest;
import com.picafe.entities.Employee;
import com.picafe.entities.Store;
import com.picafe.service.Authentication;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class PiCafeProject2ApplicationTests {

	@Autowired
	private TestRestTemplate restTemplate;

	@MockBean
	private Authentication authentication;

	@Test
	void contextLoads() {
	}


//	@Test
//	void testLoginFailure() {
//		// Mock login request
//		LoginRequest loginRequest = new LoginRequest();
//		loginRequest.setEmployeeId(456L);
//		loginRequest.setPassword("invalidPassword");
//
//		// Mock Authentication service
//		when(authentication.authenticate(456L, "invalidPassword")).thenReturn(Optional.empty());
//
//		// Make HTTP request
//		HttpEntity<LoginRequest> request = new HttpEntity<>(loginRequest);
//		ResponseEntity<String> response = restTemplate.postForEntity("/pos/api/login", request, String.class);
//
//		// Validate the response
//		assertThat(response.getStatusCode()).isEqualTo(HttpStatus.UNAUTHORIZED);
//		assertThat(response.getBody()).isEqualTo("Unauthorized");
//	}
}

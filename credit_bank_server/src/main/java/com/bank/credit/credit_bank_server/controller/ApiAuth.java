package com.bank.credit.credit_bank_server.controller;

import com.bank.credit.credit_bank_server.requests.AuthRequest;
import com.bank.credit.credit_bank_server.requests.RegisterRequest;
import com.bank.credit.credit_bank_server.responses.AuthResponse;
import com.bank.credit.credit_bank_server.responses.RegisterResponse;
import com.bank.credit.credit_bank_server.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.annotation.Order;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@Order(1)
@RequestMapping(path = "/api/v1/auth")
public class ApiAuth {
  private final AuthenticationService authService;

  @PostMapping(path = "/login")
  public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request) {
    return ResponseEntity.ok(authService.authenticate(request));
  }

  @PostMapping(path="/register")
  public ResponseEntity<RegisterResponse> register(@RequestBody RegisterRequest request){
    return ResponseEntity.ok(authService.register(request));
  }
}

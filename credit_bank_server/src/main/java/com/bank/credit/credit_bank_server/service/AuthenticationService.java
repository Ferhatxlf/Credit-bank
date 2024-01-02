package com.bank.credit.credit_bank_server.service;

import com.bank.credit.credit_bank_server.config.JWTService;
import com.bank.credit.credit_bank_server.entity.user.UserJpaRepository;
import com.bank.credit.credit_bank_server.requests.AuthRequest;
import com.bank.credit.credit_bank_server.requests.RegisterRequest;
import com.bank.credit.credit_bank_server.responses.AuthResponse;
import com.bank.credit.credit_bank_server.responses.RegisterResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.freemarker.FreeMarkerAutoConfiguration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
  private final UserJpaRepository userRepo;
  private final JWTService jwtService;
  private final PasswordEncoder passwordEncoder;
  private final AuthenticationManager authManager;

  public AuthResponse authenticate(AuthRequest request) {
    authManager.authenticate(
      new UsernamePasswordAuthenticationToken(
        request.getUsername(),
        request.getPassword())
    );
    var user = userRepo.findByUsername(request.getUsername()).orElseThrow();
    var jwtToken = jwtService.generateJWT(new HashMap<>() {{
      put("authorities", user.getAuthorities());
    }}, user);
    return AuthResponse.builder().jwtToken(jwtToken).build();
  }
  public RegisterResponse register(RegisterRequest request){
    /** creation d'utlisisateur ici*/
    return RegisterResponse.builder().success(false).build();
  }
}

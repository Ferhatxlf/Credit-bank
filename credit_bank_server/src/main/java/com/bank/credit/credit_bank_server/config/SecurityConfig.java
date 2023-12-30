package com.bank.credit.credit_bank_server.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfigurationSource;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

  private final JWTAuthFilter jwtAuthFilter;
  private final CorsConfigurationSource corsConfigurationSource;

  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http
      .authorizeHttpRequests(requests->
        requests
          .requestMatchers("/", "/error")
          .permitAll()
          .requestMatchers("/api/v1/test/**")
          .permitAll()
          .requestMatchers("/api/v1/user/auth" )
          .permitAll()
          //.requestMatchers( "/api/v1/user/**").hasRole("USER")
          .anyRequest().authenticated()

      );
    http.cors(cors->cors.configurationSource(corsConfigurationSource));
    http.formLogin(formlogin->formlogin.disable());
    http.csrf(csrf->csrf.disable());
    http.sessionManagement().disable();
    //http.authenticationProvider(authenticationProvider);
    http.addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
    return http.build();
  }
}

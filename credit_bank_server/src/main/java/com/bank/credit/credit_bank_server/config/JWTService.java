package com.bank.credit.credit_bank_server.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.Map;
import java.util.function.Function;

@Service
public class JWTService {
  @Value("${jwt.signingkey}")
  private byte[] signingKey;

  @Value("${jwt.expiration-ms}")
  private int expirationMs;
  public String extractUsernameFromJWT(String token){
    return extractSingleClaim(token, Claims::getSubject);
  }

  public Claims extractAllClaims(String token){
    return Jwts
      .parserBuilder()
      .setSigningKey(getSigningKey())
      .build()
      .parseClaimsJws(token)
      .getBody();
  }


  public <T> T extractSingleClaim(String token, Function<Claims,T> claimsResolver){
    Claims claims = extractAllClaims(token);
    return claimsResolver.apply(claims);
  }

  private Key getSigningKey() {
    return Keys.hmacShaKeyFor(signingKey);
  }

  public String generateJWT(Map<String, Object> extraClaims, UserDetails userDetails){
    return Jwts
      .builder()
      .setClaims(extraClaims)
      .setSubject(userDetails.getUsername())
      .setIssuedAt(new Date(System.currentTimeMillis()))
      .setExpiration(new Date(System.currentTimeMillis()+expirationMs))
      .signWith(getSigningKey(), SignatureAlgorithm.HS256)
      .compact();

  }

  public boolean isTokenValid(String token, UserDetails userDetails){
    final String username = extractUsernameFromJWT(token);
    return username.equals(userDetails.getUsername()) &&  !isTokenExpired(token);
  }

  public boolean isTokenExpired(String token){
    return extractExpirationDate(token).before(new Date());
  }

  public Date extractExpirationDate(String token){
    return extractSingleClaim(token, Claims::getExpiration);
  }
}

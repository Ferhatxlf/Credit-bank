package com.bank.credit.credit_bank_server.entity.session;

import com.bank.credit.credit_bank_server.entity.user.User;
import io.jsonwebtoken.lang.Maps;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class UserSession {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private Long userId;
  private Date creation;
  private Date expiration;
  private String os;
  private String device;

  @ManyToOne
  @MapsId("userId")
  @JoinColumn(name="userId")
  private User user;
}

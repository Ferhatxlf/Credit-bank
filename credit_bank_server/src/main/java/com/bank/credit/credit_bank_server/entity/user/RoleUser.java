package com.bank.credit.credit_bank_server.entity.user;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class RoleUser {
  @EmbeddedId
  private RoleUserId id;
  private Date  creation;
  private boolean enabled;

  @ManyToOne
  @MapsId("userId")
  @JoinColumn(name = "userId")
  private User user;

  @ManyToOne
  @MapsId("roleId")
  @JoinColumn(name = "roleId")
  private Role role;
}

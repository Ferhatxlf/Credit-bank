package com.bank.credit.credit_bank_server.entity.user;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Role {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;
  private String designation;

  @OneToMany(mappedBy = "role", cascade = CascadeType.ALL)
  private List<RoleUser> userRoles;
}

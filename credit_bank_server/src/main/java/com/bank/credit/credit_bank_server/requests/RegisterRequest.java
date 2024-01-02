package com.bank.credit.credit_bank_server.requests;

import com.bank.credit.credit_bank_server.entity.user.Genders;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {
  private String username;
  private String password;
  private Genders gender;
  private String name;
  private String lastname;
  private Date birthdate;
  /* more here*/
}

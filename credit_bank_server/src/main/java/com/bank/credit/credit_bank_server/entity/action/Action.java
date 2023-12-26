package com.bank.credit.credit_bank_server.entity.action;



import com.bank.credit.credit_bank_server.entity.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Action {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;

  private int userId;

  private int demandeId;
  //@Enumerated(EnumType.STRING) for text
  @Enumerated(EnumType.ORDINAL) //for number
  private ActionType type;

  @ManyToOne
  @MapsId("userId")
  @JoinColumn(name="userId")
  private User user;

}

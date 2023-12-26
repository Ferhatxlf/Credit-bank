package com.bank.credit.credit_bank_server.entity.credit;

import com.bank.credit.credit_bank_server.entity.file.FileType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class CreditType {
  @Id
  @GeneratedValue (strategy = GenerationType.IDENTITY)
  private Long id;

  private String description;

  @OneToMany(mappedBy = "creditType", cascade = CascadeType.ALL)
  private List<RequiredFiles> requiredFiles;
}

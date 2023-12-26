package com.bank.credit.credit_bank_server.entity.file;

import com.bank.credit.credit_bank_server.entity.demande.Demande;
import com.bank.credit.credit_bank_server.entity.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class UplodedFile {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String path;
  private Date creation;
  private Long demandeId;
  private Long typeId;

  @ManyToOne
  @MapsId("typeId")
  @JoinColumn(name = "typeId")
  private FileType type;

  @ManyToOne
  @MapsId("demandeId")
  @JoinColumn(name = "demandeId")
  private Demande demande;
}

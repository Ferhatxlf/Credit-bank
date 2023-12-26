package com.bank.credit.credit_bank_server.entity.agence;

import com.bank.credit.credit_bank_server.entity.demande.Demande;
import com.bank.credit.credit_bank_server.entity.permission.AgencePermission;
import com.bank.credit.credit_bank_server.entity.region.Region;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Agence {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;
  private int regionId;
  private String adressHQ;
  private String name;

  @OneToMany(mappedBy = "agence", cascade = CascadeType.ALL)
  private List<AgencePermission> agencePermissions;

  @ManyToOne
  @MapsId("regionId")
  @JoinColumn(name = "regionId")
  private Region region;
}

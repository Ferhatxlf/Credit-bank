package com.bank.credit.credit_bank_server.entity.region;

import com.bank.credit.credit_bank_server.entity.agence.Agence;
import com.bank.credit.credit_bank_server.entity.permission.RegionPermission;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Region {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @OneToMany(mappedBy = "region", cascade = CascadeType.ALL)
  private List<Agence> agences;

  @OneToMany(mappedBy = "region", cascade = CascadeType.ALL)
  private List<RegionPermission> regionPermissions;
}

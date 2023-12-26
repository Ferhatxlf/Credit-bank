package com.bank.credit.credit_bank_server.entity.permission;

import com.bank.credit.credit_bank_server.entity.region.Region;
import com.bank.credit.credit_bank_server.entity.user.Role;
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
public class RegionPermission {

  @EmbeddedId
  private RegionPermissionId id;

  private boolean enabled;
  private Date creation;
  private Long regionId;
  private Long userId;

  @ManyToOne
  @MapsId("regionId")
  @JoinColumn(name = "regionId")
  private Region region;

  @ManyToOne
  @MapsId("userId")
  @JoinColumn(name = "userId")
  private User user;

  @ManyToOne
  @JoinColumn(name = "id")
  private Role role;
}

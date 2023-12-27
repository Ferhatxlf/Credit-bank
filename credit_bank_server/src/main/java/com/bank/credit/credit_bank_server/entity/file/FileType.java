package com.bank.credit.credit_bank_server.entity.file;

import com.bank.credit.credit_bank_server.entity.credit.RequiredFiles;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class FileType {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String description;

  @OneToMany(mappedBy = "fileType", cascade = CascadeType.ALL)
  private List<RequiredFiles> requiredFiles;

  @OneToMany(mappedBy = "type", cascade = CascadeType.ALL)
  private List<UploadedFile> files;
}

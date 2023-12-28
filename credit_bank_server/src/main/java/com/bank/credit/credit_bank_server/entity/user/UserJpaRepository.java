package com.bank.credit.credit_bank_server.entity.user;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserJpaRepository extends JpaRepository<User, Long> {
  public Optional<User> findByUsername(String username);
}

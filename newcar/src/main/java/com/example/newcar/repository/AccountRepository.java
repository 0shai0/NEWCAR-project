package com.example.newcar.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.newcar.model.Account;



@Repository
public interface AccountRepository extends JpaRepository<Account,String> {
    List<Account> findByUserId(String userId);
    List<Account> findByPhoneNumber(String phoneNumber);
}

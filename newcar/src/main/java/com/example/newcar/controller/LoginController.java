package com.example.newcar.controller;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.newcar.model.Account;
import com.example.newcar.repository.AccountRepository;

@RestController
@CrossOrigin(origins = "http://10.10.21.66:3000")
public class LoginController {
    @Autowired
    AccountRepository accountRepository;

    @PostMapping("/api/login")
    public List<Account> loginAccount(
        @RequestParam("userId") String userId,
        @RequestParam("userPw") String userPw
    ) {
        List<Account> userInfo = accountRepository.findByUserIdAndUserPw(userId,userPw);

        return userInfo.isEmpty() ? Collections.emptyList() : userInfo;
    }
    @GetMapping("/api/login")
    public List<Account> loginAccounta(
        @RequestParam("userId") String userId,
        @RequestParam("userPw") String userPw
    ) {
        List<Account> userInfo = accountRepository.findByUserIdAndUserPw(userId,userPw);

        return userInfo.isEmpty() ? Collections.emptyList() : userInfo;
    }
}

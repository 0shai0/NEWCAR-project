package com.example.newcar.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.newcar.model.Account;
import com.example.newcar.repository.AccountRepository;

import lombok.NonNull;

@RestController
@CrossOrigin(origins = "http://10.10.21.66:3000")
public class EditAccountController {
    @Autowired
    AccountRepository accountRepository;

    @PutMapping("/api/account/{sessionId}")
    public boolean editAccount(
        @PathVariable String sessionId,
        @RequestParam("userPw") String userPw,
        @RequestParam("nickName") String nickName,
        @RequestParam("phoneNumber") String phoneNumber
    ) {
        Account userInfo = accountRepository.findByUserId(sessionId).get(0);
        userInfo.setUserPw(userPw);
        userInfo.setNickName(nickName);
        userInfo.setPhoneNumber(phoneNumber);
        accountRepository.save(userInfo);

        return true;
    }

    @DeleteMapping("/api/account/{sessionId}")
    public String deleteAccount(
        @PathVariable @NonNull String sessionId
    ) {
        accountRepository.deleteById(sessionId);

        return "탈퇴 완료";
    }

    @GetMapping("/api/mySubscribe/{sessionId}")
    public List<Account> selectSubscribe(
        @PathVariable String sessionId
    ) {
        return accountRepository.findByUserId(sessionId);
    }
}

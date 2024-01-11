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

@RestController
@CrossOrigin(origins = "*")
public class EditAccountController {
    @Autowired
    AccountRepository accountRepository;

    @PutMapping("/api/account/{sessionId}")
    public String editAccount(
        @PathVariable String sessionId,
        @RequestParam("userId") String userId,
        @RequestParam("userPw") String userPw,
        @RequestParam("nickName") String nickName,
        @RequestParam("phoneNumber") String phoneNumber
    ) {
        Account userInfo = accountRepository.findByUserId(sessionId).get(0);

        userInfo.setUserId(userId);
        userInfo.setUserPw(userPw);
        userInfo.setNickName(nickName);
        userInfo.setPhoneNumber(phoneNumber);
        accountRepository.save(userInfo);

        return "수정 완료";
    }

    @DeleteMapping("/api/account/{sessionId}")
    public String deleteAccount(
        @PathVariable String sessionId
    ) {
        accountRepository.deleteById(sessionId);

        return "탈퇴 완료";
    }
}

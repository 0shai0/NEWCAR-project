package com.example.newcar.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.newcar.model.Account;
import com.example.newcar.repository.AccountRepository;

@RestController
@CrossOrigin(origins = "http://10.10.21.66:3000")
public class JoinAccountController {
    @Autowired
    AccountRepository accountRepository;

    @PostMapping("/api/joinAccount")
    public String joinAccount(
        @RequestParam("userId") String userId,
        @RequestParam("userPw") String userPw,
        @RequestParam("nickName") String nickName,
        @RequestParam("phoneNumber") String phoneNumber
    ) {
        List<Account> id = accountRepository.findByUserId(userId);

        if (id.isEmpty()) {
            Account userInfo = new Account();
            userInfo.setUserId(userId);
            userInfo.setUserPw(userPw);
            userInfo.setNickName(nickName);
            userInfo.setPhoneNumber(phoneNumber);
            accountRepository.save(userInfo);
            return "가입되었습니다";
        }
        else {
            return "입력 정보를 다시 확인해주세요";
        }
    }
}

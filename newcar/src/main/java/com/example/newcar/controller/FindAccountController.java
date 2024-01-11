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
@CrossOrigin(origins = "*")
public class FindAccountController {
    @Autowired
    AccountRepository accountRepository;

    @PostMapping("/api/findId")
    public String findId(
        @RequestParam("phoneNumber") String phoneNumber
    ) {
        List<Account> userInfo = accountRepository.findByPhoneNumber(phoneNumber);
        
        if (userInfo.isEmpty()) {
            return "입력 정보를 다시 확인해주세요";
        }
        else {
            return userInfo.get(0).getUserId();
        }
    }

    @PostMapping("/api/findPw")
    public String findPw(
        @RequestParam("userId") String userId,
        @RequestParam("phoneNumber") String phoneNumber
    ) {
        List<Account> id = accountRepository.findByUserId(userId);

        if (id.isEmpty()) {
            return "아이디가 존재하지 않습니다";
        }
        else {
            if (id.get(0).getPhoneNumber().equals(phoneNumber)) {
                return "비밀번호를 재설정해주세요";
            }
            else {
                return "전화번호가 일치하지 않습니다";
            }
        }
    }

    @PostMapping("/api/resetPw")
    public void resetPw(
        
    ){

    }
}

package com.example.newcar.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.newcar.model.Subscribe;


@Repository
public interface SubscribeRepository extends JpaRepository<Subscribe,String> {
    List<Subscribe> findByKind(String kind);
}

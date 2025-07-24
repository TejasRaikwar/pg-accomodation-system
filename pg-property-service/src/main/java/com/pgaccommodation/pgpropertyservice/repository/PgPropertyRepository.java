package com.pgaccommodation.pgpropertyservice.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pgaccommodation.pgpropertyservice.entity.PgProperty;

public interface PgPropertyRepository extends JpaRepository<PgProperty, Integer> {
    List<PgProperty> findByCity(String city);
    List<PgProperty> findByOwnerId(Integer ownerId);
}
package com.pgaccomodation.bookingservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pgaccomodation.bookingservice.entity.PgProperty;

public interface PgPropertyRepository extends JpaRepository<PgProperty, Integer> {
}
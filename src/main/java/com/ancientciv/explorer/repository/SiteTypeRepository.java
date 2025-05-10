package com.ancientciv.explorer.repository;

import com.ancientciv.explorer.entities.SiteType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SiteTypeRepository  extends JpaRepository<SiteType, Long> {
    Optional<SiteType> findByName(String name);
}

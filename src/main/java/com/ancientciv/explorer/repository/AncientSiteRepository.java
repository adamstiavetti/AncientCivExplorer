package com.ancientciv.explorer.repository;

import com.ancientciv.explorer.entities.AncientSite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AncientSiteRepository extends JpaRepository<AncientSite, Long> {
    @Query("SELECT s FROM AncientSite s WHERE LOWER(s.name) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(s.siteType.name) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<AncientSite> searchByNameOrSiteType(@Param("query") String query);

}

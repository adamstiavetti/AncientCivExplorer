package com.ancientciv.explorer.controller;

import com.ancientciv.explorer.dto.AncientSiteDTO;
import com.ancientciv.explorer.dto.CreateAncientSiteRequest;
import com.ancientciv.explorer.entities.AncientSite;
import com.ancientciv.explorer.entities.SiteType;
import com.ancientciv.explorer.repository.SiteTypeRepository;
import com.ancientciv.explorer.service.AncientSiteService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/sites")
@CrossOrigin(origins = "http://localhost:5173")
public class AncientSiteController {
    private final AncientSiteService ancientSiteService;
    private final SiteTypeRepository siteTypeRepository;

    public AncientSiteController(AncientSiteService ancientSiteService, SiteTypeRepository siteTypeRepository) {
        this.ancientSiteService = ancientSiteService;
        this.siteTypeRepository = siteTypeRepository;
    }

    @PostMapping
    public ResponseEntity<AncientSite> createSite(@RequestBody AncientSiteDTO dto) {
        SiteType siteType = siteTypeRepository.findById(dto.siteTypeId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid SiteTypeId"));
        AncientSite site = AncientSite.builder()
                .name(dto.name)
                .description(dto.description)
                .latitude(dto.latitude)
                .longitude(dto.longitude)
                .imageUrl(dto.imageUrl)
                .era(dto.era)
                .region(dto.region)
                .yearBuilt(dto.yearBuilt)
                .discoveryYear(dto.discoveryYear)
                .credibilityLevel(dto.credibilityLevel)
                .isAlternative(dto.isAlternative)
                .isUserSubmitted(dto.isUserSubmitted)
                .isDeleted(dto.isDeleted)
                .createdAt(LocalDateTime.now())
                .siteType(siteType)
                .build();

       return new ResponseEntity<>(ancientSiteService.createSite(site), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<AncientSite>> getAllSites() {
        return ResponseEntity.ok(ancientSiteService.getAllSites());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AncientSite> getSiteById(@PathVariable Long id) {
        return ancientSiteService.getSiteById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<AncientSite> updateSite(@PathVariable Long id, @RequestBody AncientSite updatedSite) {
        return ResponseEntity.ok(ancientSiteService.updateSite(id, updatedSite));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSiteById(@PathVariable Long id) {
        ancientSiteService.deleteSiteById(id);
        return ResponseEntity.noContent().build();
    }
}

package com.ancientciv.explorer.controller;


import com.ancientciv.explorer.entities.AncientSite;
import com.ancientciv.explorer.service.AncientSiteService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sites")
@CrossOrigin(origins = "http://localhost:5173")
public class AncientSiteController {
    private final AncientSiteService ancientSiteService;

    public AncientSiteController(AncientSiteService ancientSiteService) {
        this.ancientSiteService = ancientSiteService;
    }

    @PostMapping
    public ResponseEntity<AncientSite> createSite(@RequestBody AncientSite ancientSite) {
       return new ResponseEntity<>(ancientSiteService.createSite(ancientSite), HttpStatus.CREATED);
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

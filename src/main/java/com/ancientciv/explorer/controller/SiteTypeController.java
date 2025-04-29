package com.ancientciv.explorer.controller;

import com.ancientciv.explorer.entities.SiteType;
import com.ancientciv.explorer.service.SiteTypeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sitetypes")
@CrossOrigin(origins = "http://localhost:5173")
public class SiteTypeController {
    private final SiteTypeService siteTypeService;

    public SiteTypeController(SiteTypeService siteTypeService) {
        this.siteTypeService = siteTypeService;
    }

    @PostMapping
    public ResponseEntity<SiteType> createSite(@RequestBody SiteType siteType) {
        return new ResponseEntity<>(siteTypeService.createSite(siteType), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<SiteType>> getAllSiteTypes() {
        return ResponseEntity.ok(siteTypeService.getAllSiteTypes());
    }
}

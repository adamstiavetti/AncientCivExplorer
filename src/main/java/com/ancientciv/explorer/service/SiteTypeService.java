package com.ancientciv.explorer.service;

import com.ancientciv.explorer.entities.SiteType;
import com.ancientciv.explorer.repository.SiteTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SiteTypeService {

    private final SiteTypeRepository siteTypeRepository;

    @Autowired
    public SiteTypeService(SiteTypeRepository siteTypeRepository) {
        this.siteTypeRepository = siteTypeRepository;
    }

    public SiteType createSite(SiteType site) {
        return siteTypeRepository.save(site);
    }

    public List<SiteType> getAllSiteTypes() {
        return siteTypeRepository.findAll();
    }
}

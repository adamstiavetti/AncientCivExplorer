package com.ancientciv.explorer.service;

import com.ancientciv.explorer.dto.AncientSiteDTO;
import com.ancientciv.explorer.entities.AncientSite;
import com.ancientciv.explorer.repository.AncientSiteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ancientciv.explorer.exception.SiteNotFoundException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AncientSiteService {

    private final AncientSiteRepository ancientSiteRepository;

    @Autowired
    public AncientSiteService(AncientSiteRepository ancientSiteRepository) {
        this.ancientSiteRepository = ancientSiteRepository;
    }

    public AncientSite createSite(AncientSite site) {
        return ancientSiteRepository.save(site);
    }

    public Optional<AncientSite> getSiteById(Long id) {
        return ancientSiteRepository.findById(id);
    }

    public List<AncientSite> getAllSites(){
        return ancientSiteRepository.findAll();
    }

    public AncientSite updateSite(Long id, AncientSite updatedSite) {
        AncientSite site = ancientSiteRepository.findById(id).orElseThrow();
        site.setId(updatedSite.getId());
        site.setName(updatedSite.getName());
        site.setLatitude(updatedSite.getLatitude());
        site.setLongitude(updatedSite.getLongitude());
        site.setDescription(updatedSite.getDescription());
        site.setRegion(updatedSite.getRegion());
        site.setEra(updatedSite.getEra());
        site.setYearBuilt(updatedSite.getYearBuilt());
        site.setDiscoveryYear(updatedSite.getDiscoveryYear());
        site.setCredibilityLevel(updatedSite.getCredibilityLevel());
        site.setIsAlternative(updatedSite.getIsAlternative());
        site.setIsUserSubmitted(updatedSite.getIsUserSubmitted());
        site.setIsDeleted(updatedSite.getIsDeleted());
        site.setImageUrl(updatedSite.getImageUrl());
        site.setSiteType(updatedSite.getSiteType());

        return ancientSiteRepository.save(site);
    }

    public void deleteSiteById(Long id){
        AncientSite site = ancientSiteRepository.findById(id)
                        .orElseThrow(() -> new SiteNotFoundException("Ancient site with that ID is not found"));

        site.setIsDeleted(true);
        ancientSiteRepository.save(site);
    }

    public List<AncientSite> searchByNameOrType(String query) {
        return ancientSiteRepository.searchByNameOrSiteType(query);
    }
}

package com.ancientciv.explorer.seed;

import com.ancientciv.explorer.entities.AncientSite;
import com.ancientciv.explorer.entities.SiteType;
import com.ancientciv.explorer.repository.AncientSiteRepository;
import com.ancientciv.explorer.repository.SiteTypeRepository;
import com.opencsv.CSVReader;
import jakarta.annotation.PostConstruct;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.InputStreamReader;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;


@Component
public class DataSeeder {

    private final SiteTypeRepository siteTypeRepository;
    private final AncientSiteRepository ancientSiteRepository;

    public DataSeeder(SiteTypeRepository siteTypeRepository, AncientSiteRepository ancientSiteRepository) {
        this.siteTypeRepository = siteTypeRepository;
        this.ancientSiteRepository = ancientSiteRepository;
    }

    @PostConstruct
    public void seedData() {
        try {
            Map<String, SiteType> siteTypeMap = seedSiteTypes(); // store saved types
            seedAncientSites(siteTypeMap);                     // pass map into site loader
        } catch (Exception e) {
            System.err.println("⚠️ Error during seeding: " + e.getMessage());
        }
    }

    private int parseOrDefault(String input, int fallback) {
        try {
            return Integer.parseInt(input);
        } catch (NumberFormatException e) {
            return fallback;
        }
    }


    private Map<String, SiteType> seedSiteTypes() throws Exception {
        Map<String, SiteType> siteTypeMap = new HashMap<>();

        var resource = new ClassPathResource("seed/site_types.csv");
        try (CSVReader reader = new CSVReader(new InputStreamReader(resource.getInputStream()))) {
            String[] line;
            reader.readNext(); // Skip header
            while ((line = reader.readNext()) != null) {
                Long id = Long.parseLong(line[0]);
                String name = line[1];

                SiteType type = SiteType.builder().name(name).build();
                SiteType existing = siteTypeRepository.findByName(name).orElse(null);
                if (existing == null) {
                    existing = siteTypeRepository.save(type);
                }
                siteTypeMap.put(String.valueOf(existing.getId()), existing);
            }
            System.out.println("✅ Seeded site types.");
        }
        return siteTypeMap;
    }


    private void seedAncientSites(Map<String, SiteType> siteTypeMap) throws Exception {
        ancientSiteRepository.deleteAll(); // Clears the table before seeding

        var resource = new ClassPathResource("seed/ancient_sites.csv");
        try (CSVReader reader = new CSVReader(new InputStreamReader(resource.getInputStream()))) {
            String[] line;
            reader.readNext(); // Skip header
            while ((line = reader.readNext()) != null) {
                String name = line[0];
                String description = line[1];
                double latitude = Double.parseDouble(line[2]);
                double longitude = Double.parseDouble(line[3]);
                String imageUrl = line[4];
                String region = line[5];
                String era = line[6];
                int yearBuilt = parseOrDefault(line[7], 0);
                String discoveryYear = line[8];
                String credibilityLevel = line[9];
                boolean isAlternative = Boolean.parseBoolean(line[10]);
                boolean isDeleted = Boolean.parseBoolean(line[11]);
                boolean isUserSubmitted = Boolean.parseBoolean(line[12]);
                int siteTypeId = Integer.parseInt(line[13]);

                SiteType siteType = siteTypeRepository.findById((long) siteTypeId).orElse(null);
                if (siteType == null){
                    System.err.println("Skipped, site: could not find sitetype " + siteTypeId);
                    continue;
                }

                    AncientSite site = AncientSite.builder()

                            .name(name)
                            .description(description)
                            .latitude(latitude)
                            .longitude(longitude)
                            .imageUrl(imageUrl)
                            .region(region)
                            .era(era)
                            .yearBuilt(yearBuilt)
                            .discoveryYear(discoveryYear)
                            .credibilityLevel(credibilityLevel)
                            .isAlternative(isAlternative)
                            .isDeleted(isDeleted)
                            .isUserSubmitted(isUserSubmitted)
                            .siteType(siteType)
                            .createdAt(LocalDateTime.now())
                            .build();

                    ancientSiteRepository.save(site);
                }
            }
            System.out.println("Seeded ancient sites.");
        }
    }

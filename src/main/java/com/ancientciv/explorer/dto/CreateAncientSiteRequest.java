package com.ancientciv.explorer.dto;

import lombok.Data;

@Data
public class CreateAncientSiteRequest {
    private String name;
    private String description;
    private double latitude;
    private double longitude;
    private String imageUrl;
    private String era;
    private String region;
    private Integer yearBuilt;
    private String discoveryYear;
    private String credibilityLevel;
    private Boolean isAlternative;

    private Long siteTypeId;
}

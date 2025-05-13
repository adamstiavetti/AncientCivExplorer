package com.ancientciv.explorer.dto;

import lombok.Data;

@Data
public class CreateAncientSiteRequest {
    private String name;
    private String teaserDescription;
    private String fullDescription;
    private double latitude;
    private double longitude;
    private String imageUrl;
    private String infoUrl;
    private String era;
    private String region;
    private Integer yearBuilt;
    private String discoveryYear;
    private String credibilityLevel;
    private Boolean isAlternative;

    private Long siteTypeId;
}

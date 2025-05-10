package com.ancientciv.explorer.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AncientSite {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private double latitude;

    @Column(nullable = false)
    private double longitude;

    private String imageUrl;

    private String era;

    private String region;

    private Integer yearBuilt;

    private String discoveryYear;

    private String credibilityLevel;

    @Builder.Default
    private Boolean isAlternative = false;

    @ManyToOne
    @JoinColumn(name = "site_type_id", nullable = false)
    private SiteType siteType;

    @Builder.Default
    private Boolean isUserSubmitted = false;

    @Builder.Default
    private Boolean isDeleted = false;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;


}

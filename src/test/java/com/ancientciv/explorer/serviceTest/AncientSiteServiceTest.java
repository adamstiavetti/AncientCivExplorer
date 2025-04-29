package com.ancientciv.explorer.serviceTest;

import com.ancientciv.explorer.entities.AncientSite;
import com.ancientciv.explorer.entities.SiteType;
import com.ancientciv.explorer.repository.AncientSiteRepository;
import com.ancientciv.explorer.repository.SiteTypeRepository;
import com.ancientciv.explorer.service.AncientSiteService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class AncientSiteServiceTest {

    @Mock
    private AncientSiteRepository ancientSiteRepository;

    @Mock
    private SiteTypeRepository siteTypeRepository;

    @InjectMocks
    private AncientSiteService ancientSiteService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testSaveSite() {
        SiteType siteType = SiteType.builder()
                .id(1L)
                .name("Temple")
                .build();

        AncientSite site = AncientSite.builder()
                .name("Gobekli Tepe")
                .latitude(37.2236)
                .longitude(38.9221)
                .description("The world's oldest known temple")
                .region("Anatolia")
                .era("Pre-Pottery Neolithic")
                .startYear(-9600)
                .endYear(-8200)
                .discoveryYear(1994)
                .credibilityLevel("Contested")
                .siteType(siteType)
                .build();

        when(ancientSiteRepository.save(site)).thenReturn(site);

        AncientSite savedSite = ancientSiteService.createSite(site);

        assertNotNull(savedSite);
        assertEquals("Gobekli Tepe", savedSite.getName());
        verify(ancientSiteRepository, times(1)).save(site);

    }

    @Test
    void getAncientSiteById() {
        SiteType siteType = SiteType.builder()
                .id(1L)
                .name("Temple")
                .build();

        AncientSite site = AncientSite.builder()
                .id(1L)
                .name("Gobekli Tepe")
                .latitude(37.2236)
                .longitude(38.9221)
                .siteType(siteType)
                .build();

        when(ancientSiteRepository.findById(1L)).thenReturn(Optional.of(site));
        Optional<AncientSite> result = ancientSiteService.getSiteById(1L);
        assertThat(result).isPresent();
        assertThat(result.get().getName()).isEqualTo("Gobekli Tepe");

    }

    @Test
    void getAllSite_returnsListofSites() {
        SiteType siteType = SiteType.builder()
                .id(1L)
                .name("Temple")
                .build();

        AncientSite site1 = AncientSite.builder()
                .id(1L)
                .name("Gobekli Tepe")
                .latitude(37.2236)
                .longitude(38.9221)
                .siteType(siteType)
                .build();

        AncientSite site2 = AncientSite.builder()
                .id(2L)
                .name("Stonehenge")
                .latitude(51.1789)
                .longitude(-1.8262)
                .siteType(siteType)
                .build();

        List<AncientSite> mockSites = List.of(site1, site2);

        when(ancientSiteRepository.findAll()).thenReturn(mockSites);

        List<AncientSite> result = ancientSiteService.getAllSites();

        assertEquals(2, result.size());
        assertEquals("Gobekli Tepe", result.get(0).getName());
        verify(ancientSiteRepository, times(1)).findAll();
    }

    @Test
    void deleteSiteById_setIsDeletedToTrue(){
        SiteType siteType = SiteType.builder()
                .id(1L)
                .name("Temple")
                .build();

        AncientSite site = AncientSite.builder()
                .id(1L)
                .name("Gobekli Tepe")
                .isDeleted(false)
                .latitude(37.2236)
                .longitude(38.9221)
                .siteType(siteType)
                .build();

        when(ancientSiteRepository.findById(1L)).thenReturn(Optional.of(site));
        when(ancientSiteRepository.save(any(AncientSite.class))).thenReturn(site);

        ancientSiteService.deleteSiteById(1L);

        assertTrue(site.getIsDeleted());
        verify(ancientSiteRepository,times(1)).findById(1L);
        verify(ancientSiteRepository,times(1)).save(site);
    }
}

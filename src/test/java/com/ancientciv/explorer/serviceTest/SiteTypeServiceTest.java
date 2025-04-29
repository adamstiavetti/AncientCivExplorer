package com.ancientciv.explorer.serviceTest;


import com.ancientciv.explorer.entities.SiteType;
import com.ancientciv.explorer.repository.AncientSiteRepository;
import com.ancientciv.explorer.repository.SiteTypeRepository;
import com.ancientciv.explorer.service.SiteTypeService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.*;

public class SiteTypeServiceTest {

    @Mock
    private SiteTypeRepository siteTypeRepository;

    @InjectMocks
    private SiteTypeService siteTypeService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void shouldSaveSiteType() {
        SiteType site = SiteType.builder()
                .id(1L)
                .name("Temple")
                .build();

        when(siteTypeRepository.save(any(SiteType.class))).thenReturn(site);

        SiteType savedSite = siteTypeService.createSite(site);

        assertNotNull(savedSite);
        assertEquals("Temple", savedSite.getName());
        verify(siteTypeRepository, times(1)).save(site);
    }

    @Test
    void canGetAllSiteTypes() {
        SiteType site1 = SiteType.builder()
                .id(1L)
                .name("Temple")
                .build();

        SiteType site2 = SiteType.builder()
                .id(2L)
                .name("Pyramid")
                .build();

        SiteType site3 = SiteType.builder()
                .id(3L)
                .name("Burial Ground")
                .build();

        List<SiteType> mockSites = List.of(site1, site2, site3);

        when(siteTypeRepository.findAll()).thenReturn(mockSites);

        List<SiteType> result = siteTypeService.getAllSiteTypes();

        assertEquals(3, result.size());
        assertEquals("Pyramid", result.get(1).getName());
        verify(siteTypeRepository, times(1)).findAll();
    }

}

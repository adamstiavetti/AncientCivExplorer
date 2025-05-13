package com.ancientciv.explorer.controllerTest;


import com.ancientciv.explorer.controller.AncientSiteController;
import com.ancientciv.explorer.entities.AncientSite;
import com.ancientciv.explorer.repository.AncientSiteRepository;
import com.ancientciv.explorer.repository.SiteTypeRepository;
import com.ancientciv.explorer.service.AncientSiteService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(AncientSiteController.class)
public class AncientSiteControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private AncientSiteService ancientSiteService;

    @MockitoBean
    private SiteTypeRepository siteTypeRepository;

    @MockitoBean
    private AncientSiteRepository ancientSiteRepository;


    @Autowired
    private ObjectMapper objectMapper;

    private AncientSite site;

    @BeforeEach
    void setUp() {

        site = AncientSite.builder()
                .id(1L)
                .name("Test Site")
                .latitude(37.345)
                .longitude(45.343)
                .build();
    }

    @Test
    void shouldReturnSavedSite() throws Exception {
        when(ancientSiteService.createSite(any(AncientSite.class))).thenReturn(site);
        mockMvc.perform(post("/api/sites")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(site)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1));
    }

    @Test
    void canGetAllSites() throws Exception {
        when(ancientSiteService.getAllSites()).thenReturn(List.of(site));
        mockMvc.perform(get("/api/sites"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(1));
    }

    @Test
    void canGetSiteById() throws Exception {
        when(ancientSiteService.getSiteById(1L)).thenReturn(Optional.of(site));
        mockMvc.perform(get("/api/sites/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Test Site"));
        verify(ancientSiteService).getSiteById(1L);
    }

    @Test
    void canUpdateSite() throws Exception {
        AncientSite updatedSite = AncientSite.builder()
                .id(1L)
                .name("Göbekli Tepe - Updated")
                .latitude(37.2236)
                .longitude(38.9221)
                .description("Updated: The world's oldest known megalithic site.")
                .region("Anatolia")
                .era("Pre-Pottery Neolithic")
                .yearBuilt(-9600)
                .discoveryYear("1994")
                .credibilityLevel("High")
                .isAlternative(false)
                .isUserSubmitted(false)
                .isDeleted(false)
                .imageUrl("https://example.com/updated-gobekli.jpg")
                .createdAt(null)
                .siteType(null)
                .build();

        when(ancientSiteService.updateSite(eq(1L), any(AncientSite.class))).thenReturn(updatedSite);
        mockMvc.perform(put("/api/sites/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updatedSite)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Göbekli Tepe - Updated"));
    }

    @Test
    void canDeleteSite() throws Exception {
        mockMvc.perform(delete("/api/sites/1"))
                .andExpect(status().isNoContent());
        verify(ancientSiteService).deleteSiteById(1L);
    }
}

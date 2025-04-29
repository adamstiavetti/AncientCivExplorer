package com.ancientciv.explorer.controllerTest;

import com.ancientciv.explorer.controller.SiteTypeController;
import com.ancientciv.explorer.entities.SiteType;
import com.ancientciv.explorer.service.SiteTypeService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(SiteTypeController.class)
public class SiteTypeControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private SiteTypeService siteTypeService;

    @Autowired
    private ObjectMapper objectMapper;

    private SiteType site;

    @BeforeEach
    void setUp() {

        site = SiteType.builder()
                .id(1L)
                .name("Test Site")
                .build();
    }

    @Test
    void shouldReturnSaveSiteType() throws Exception {
        when(siteTypeService.createSite(any(SiteType.class))).thenReturn(site);
        mockMvc.perform(post("/api/sitetypes")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(site)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1));
    }

    @Test
    void shouldReturnAllSiteTypes() throws Exception {
        when(siteTypeService.getAllSiteTypes()).thenReturn(List.of(site));
        mockMvc.perform(get("/api/sitetypes"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(1));
    }
}

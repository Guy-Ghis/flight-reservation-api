package com.example.flightreservation;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@ActiveProfiles("test")
@AutoConfigureMockMvc
public class TicketIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void testCreateAndRetrieveTicket() throws Exception {
        String json = "{\"passengerName\":\"John Doe\",\"destination\":\"Paris\",\"kickoff\":\"Douala\",\"bookingDate\":\"2025-07-08\"}";

        mockMvc.perform(post("/api/tickets")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.destination").value("Paris"));

        mockMvc.perform(get("/api/tickets/by-destination?destination=Paris"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].passengerName").value("John Doe"));
    }
}

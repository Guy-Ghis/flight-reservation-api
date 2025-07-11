package com.example.flightreservation.controller;

import com.example.flightreservation.entity.Ticket;
import com.example.flightreservation.service.TicketService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/tickets")
public class TicketController {

    private final TicketService service;

    public TicketController(TicketService service) {
        this.service = service;
    }

    @PostMapping
    public Ticket createTicket(@RequestBody Ticket ticket) {
        return service.saveTicket(ticket);
    }

    @GetMapping
    public List<Ticket> getAllTickets() {
        return service.getAllTickets();
    }

    @GetMapping("/by-date")
    public List<Ticket> getByDate(@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return service.getTicketsByBookingDate(date);
    }

    @GetMapping("/by-destination")
    public List<Ticket> getByDestination(@RequestParam String destination) {
        return service.getTicketsByDestination(destination);
    }

    @GetMapping("/by-kickoff")
    public List<Ticket> getByKickoff(@RequestParam String kickoff) {
        return service.getTicketsByKickoff(kickoff);
    }

    @DeleteMapping("/{id}")
    public void deleteTicket(@PathVariable Long id) {
        service.deleteTicket(id);
    }

}

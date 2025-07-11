package com.example.flightreservation.service;

import com.example.flightreservation.entity.Ticket;
import com.example.flightreservation.repository.TicketRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class TicketService {

    private final TicketRepository repository;

    public TicketService(TicketRepository repository) {
        this.repository = repository;
    }

    public Ticket saveTicket(Ticket ticket) {
        return repository.save(ticket);
    }

    public List<Ticket> getAllTickets() {
        return repository.findAll();
    }

    public List<Ticket> getTicketsByBookingDate(LocalDate date) {
        return repository.findByBookingDate(date);
    }

    public List<Ticket> getTicketsByDestination(String dest) {
        return repository.findByDestinationContainingIgnoreCase(dest);
    }

    public List<Ticket> getTicketsByKickoff(String kickoff) {
        return repository.findByKickoffContainingIgnoreCase(kickoff);
    }

    public void deleteTicket(Long id) {
        Ticket ticket = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ticket not found with id: " + id));
        repository.delete(ticket);
    }

}

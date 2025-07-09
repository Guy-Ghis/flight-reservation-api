package com.example.flightreservation.repository;

import com.example.flightreservation.entity.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {
    List<Ticket> findByBookingDate(LocalDate bookingDate);
    List<Ticket> findByDestinationContainingIgnoreCase(String destination);
    List<Ticket> findByKickoffContainingIgnoreCase(String kickoff);
}

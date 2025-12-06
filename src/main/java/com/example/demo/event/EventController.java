package com.example.demo.event;

import com.example.demo.user.User;
import com.example.demo.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/events")
public class EventController {

    private final EventService eventService;

    @Autowired
    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @GetMapping
    public List<Event> getAllUsers() {
        return eventService.getAllEvents();
    }

    @GetMapping("/{id}")
    public Event getUserById(@PathVariable Long id) {
        return eventService.getEventById(id);
    }

    @PostMapping
    public Event createUser(@RequestBody Event event) {
        return eventService.createEvent(event);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        eventService.deleteEvent(id);
    }

}

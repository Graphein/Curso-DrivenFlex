package com.eduardoleli.feirinha.controller;

import com.eduardoleli.feirinha.domain.Item;
import com.eduardoleli.feirinha.dto.ItemRequest;
import com.eduardoleli.feirinha.service.ItemService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/items")
public class ItemController {

    private final ItemService itemService;

    public ItemController(ItemService itemService) {
        this.itemService = itemService;
    }

    // POST /items
    @PostMapping
    public ResponseEntity<Item> create(@RequestBody @Valid ItemRequest request) {
        Item created = itemService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    // GET /items
    @GetMapping
    public ResponseEntity<List<Item>> findAll() {
        List<Item> items = itemService.findAll();
        return ResponseEntity.ok(items);
    }

    // GET /items/:id
    @GetMapping("/{id}")
    public ResponseEntity<Item> findById(@PathVariable Long id) {
        Item item = itemService.findById(id);
        return ResponseEntity.ok(item);
    }

    // PUT /items/:id
    @PutMapping("/{id}")
    public ResponseEntity<Item> update(@PathVariable Long id,
                                       @RequestBody @Valid ItemRequest request) {
        Item updated = itemService.update(id, request);
        return ResponseEntity.ok(updated);
    }

    // DELETE /items/:id
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        itemService.delete(id);
        return ResponseEntity.noContent().build();
    }
}

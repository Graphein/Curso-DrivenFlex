package com.eduardoleli.feirinha.service;

import com.eduardoleli.feirinha.domain.Item;
import com.eduardoleli.feirinha.dto.ItemRequest;
import com.eduardoleli.feirinha.exception.ItemConflictException;
import com.eduardoleli.feirinha.exception.ItemNotFoundException;
import com.eduardoleli.feirinha.repository.ItemRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ItemService {

    private final ItemRepository itemRepository;

    public ItemService(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    // POST /items
    @Transactional
    public Item create(ItemRequest request) {

        // Verifica se já existe item com esse nome → 409
        if (itemRepository.existsByName(request.getName())) {
            throw new ItemConflictException(request.getName());
        }

        Item item = new Item(request.getName(), request.getQuantity());
        return itemRepository.save(item);
    }

    // GET /items
    @Transactional(readOnly = true)
    public List<Item> findAll() {
        return itemRepository.findAll();
    }

    // GET /items/:id
    @Transactional(readOnly = true)
    public Item findById(Long id) {
        return itemRepository.findById(id)
                .orElseThrow(() -> new ItemNotFoundException(id));
    }

    // PUT /items/:id
    @Transactional
    public Item update(Long id, ItemRequest request) {

        Item existing = itemRepository.findById(id)
                .orElseThrow(() -> new ItemNotFoundException(id));

        // verifica se nome novo já existe em outro item → 409
        itemRepository.findByName(request.getName())
                .filter(other -> !other.getId().equals(id))
                .ifPresent(other -> {
                    throw new ItemConflictException(request.getName());
                });

        existing.setName(request.getName());
        existing.setQuantity(request.getQuantity());

        return itemRepository.save(existing);
    }

    // DELETE /items/:id
    @Transactional
    public void delete(Long id) {
        Item existing = itemRepository.findById(id)
                .orElseThrow(() -> new ItemNotFoundException(id));

        itemRepository.delete(existing);
    }
}

package com.eduardoleli.feirinha.exception;

public class ItemNotFoundException extends RuntimeException {
    public ItemNotFoundException(Long id) {
        super("Item com id " + id + " não encontrado");
    }
}

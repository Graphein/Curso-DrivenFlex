package com.eduardoleli.feirinha.exception;

public class ItemConflictException extends RuntimeException {
    public ItemConflictException(String name) {
        super("Já existe um item com o nome '" + name + "'");
    }
}

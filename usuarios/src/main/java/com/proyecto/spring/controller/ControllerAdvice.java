package com.proyecto.spring.controller;

//Encargado de capturar cualquier excepcion

import com.proyecto.spring.dto.ErrorDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import com.proyecto.spring.exception.RequestException;

@RestControllerAdvice
public class ControllerAdvice {
    //Definicion del tipo de excepciones que queremos controlar con @ExceptionHandler
    //Despues definimos el tipo de error "RequestException"
    @ExceptionHandler(value = RequestException.class)
    //Definimos metodo
    public ResponseEntity<ErrorDTO> requestExceptionHandler(RequestException ex) {
        //Generamos un diccionario de errores personalizado
        ErrorDTO error = ErrorDTO.builder().code(ex.getCode()).message(ex.getMessage()).build();
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }
}

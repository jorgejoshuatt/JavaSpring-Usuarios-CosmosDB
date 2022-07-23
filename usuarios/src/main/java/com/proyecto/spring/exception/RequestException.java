package com.proyecto.spring.exception;

import lombok.Data;

@Data
//Clase encargada de validar todos los Request
public class RequestException extends RuntimeException {

    //agregamos valores que querramos propagar
    private String code;
    //Creamos un constructor
    public RequestException(String code, String message){
        super(message);
        this.code=code;

    }
}

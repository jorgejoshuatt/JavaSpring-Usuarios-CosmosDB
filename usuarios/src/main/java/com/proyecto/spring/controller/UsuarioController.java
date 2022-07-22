package com.proyecto.spring.controller;

import com.azure.cosmos.models.PartitionKey;
import com.proyecto.spring.repository.UsuarioDBRepository;
import com.proyecto.spring.dto.UsuarioCrudResponse;
import com.proyecto.spring.model.Usuario;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/v1/usuarios")
public class UsuarioController {

    @Autowired
    UsuarioDBRepository usuarioDBRepository;

    Logger logger = LoggerFactory.getLogger(UsuarioController.class);

    //Agregar nuevo usuario
    @PostMapping
    public ResponseEntity<UsuarioCrudResponse> createNewUsuario(@RequestBody Usuario u) {
        u = usuarioDBRepository.save(u);
        UsuarioCrudResponse usuarioCrudResponse = new UsuarioCrudResponse();
        usuarioCrudResponse.setMessage("Nuevo usuario creado correctamente con el ID: " + u.getId());
        usuarioCrudResponse.setStatusCode("201: Created");
        return new ResponseEntity<UsuarioCrudResponse>(usuarioCrudResponse, HttpStatus.CREATED);
    }

    //Actualizar un usuario existente
    @PutMapping("/{id}")
    public ResponseEntity<String> updateExistingUsuario(@PathVariable String id, @RequestBody Usuario u) {
        Optional<Usuario> usuario = usuarioDBRepository.findById(id);
        usuarioDBRepository.deleteById(id, new PartitionKey(usuario.get().getNombre_usuario()));
        u.setId(id);
        u = usuarioDBRepository.save(u);
        return new ResponseEntity<String>("", HttpStatus.NO_CONTENT);
    }

    //Traer un usuario
    @GetMapping("/{id}")
    public ResponseEntity<List<Usuario>> getUsuarios(@PathVariable String id) {
        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.add("ContentType", "application/json");
        List<Usuario> usuarioList = new ArrayList<>();
        logger.info("Id is present in the GET request");
        List<Optional<Usuario>> optionaUsuarioList = Collections.singletonList(usuarioDBRepository.findById(id));
        if (!(optionaUsuarioList.get(0).isEmpty())) {
            optionaUsuarioList.stream().forEach(u -> u.ifPresent(usuario -> usuarioList.add(usuario)));
            return new ResponseEntity<List<Usuario>>(usuarioList, responseHeaders, HttpStatus.OK);
        }
        return new ResponseEntity<List<Usuario>>(usuarioList, responseHeaders, HttpStatus.NOT_FOUND);

    }

    //Traer todos los usuarios existentes
    @GetMapping
    public ResponseEntity<List<Usuario>> getAllUsuarios() {
        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.add("ContentType", "application/json");
        List<Usuario> usuarioList = new ArrayList<>();
        logger.info("Id is not present in the GET request");
        usuarioList = usuarioDBRepository.getAllUsuarios();
        return new ResponseEntity<List<Usuario>>(usuarioList, responseHeaders, HttpStatus.OK);
    }

    //eliminar un id particular
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteExistingUsuario(@PathVariable String id) {
        Optional<Usuario> usuario = usuarioDBRepository.findById(id);
        usuarioDBRepository.deleteById(id, new PartitionKey(usuario.get().getNombre_usuario()));
        return new ResponseEntity<String>("",HttpStatus.NO_CONTENT);
    }
}
package com.proyecto.spring;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@SpringBootApplication
public class AzureCosmosdbCrudApplication {

	public static void main(String[] args) {
		SpringApplication.run(AzureCosmosdbCrudApplication.class, args);
	}
}

package com.example.trash01;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableAutoConfiguration
public class Trash01Application {

    public static void main(String[] args) {
        SpringApplication.run(Trash01Application.class, args);
    }

}

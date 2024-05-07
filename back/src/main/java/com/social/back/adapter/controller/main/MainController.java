package com.social.back.adapter.controller.main;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

@Controller
public class MainController {
    @GetMapping("/loginpage")
    @ResponseBody
    public String getMainHtml() throws IOException {
        // Load main.html file from the resources directory
        Resource resource = new ClassPathResource("static/main.html");
        byte[] bytes = Files.readAllBytes(Paths.get(resource.getURI()));
        // Convert the byte array to a string and return as the response
        return new String(bytes);
    }
}

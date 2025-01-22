package com.slpp.slpp_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import com.slpp.slpp_backend.config.WebConfig;

@SpringBootApplication(scanBasePackages = "com.slpp.slpp_backend")
public class SlppBackendApplication {
	public static void main(String[] args) {
		SpringApplication.run(SlppBackendApplication.class, args);
	}

	@Bean
	public WebMvcConfigurer customWebMvcConfigurer() {
		return new WebConfig();
	}

}

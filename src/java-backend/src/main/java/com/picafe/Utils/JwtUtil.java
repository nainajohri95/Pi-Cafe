package com.picafe.Utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtUtil {
    private final String secretKey = "a2V5cw==";

    private static final Logger logger = LoggerFactory.getLogger(JwtUtil.class);

    public String generateToken(String employeeId) {
        logger.info("Generating token for employee ID: {}", employeeId);
        try {
            String token = Jwts.builder()
                    .setSubject(employeeId)
                    .setIssuedAt(new Date())
                    .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)) // 10 hours
                    .signWith(SignatureAlgorithm.HS256, secretKey)
                    .compact();
            logger.info("Token generated successfully for employee ID: {}", employeeId);
            return token;
        } catch (Exception e) {
            logger.error("Error generating token for employee ID: {}", employeeId, e);
            throw e;
        }
    }

}
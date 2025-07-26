//package com.pgaccomodation.apigateway.filter;
//
//import java.util.List;
//import java.util.function.Predicate;
//
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.cloud.gateway.filter.GatewayFilter;
//import org.springframework.cloud.gateway.filter.GatewayFilterChain;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.server.reactive.ServerHttpRequest;
//import org.springframework.stereotype.Component;
//import org.springframework.web.server.ServerWebExchange;
//
//import io.jsonwebtoken.Jwts;
//import reactor.core.publisher.Mono;
//
//@Component
//public class JwtAuthenticationFilter implements GatewayFilter {
//
//    @Value("${jwt.secret}")
//    private String secret;
//
//    private final List<String> openEndpoints = List.of("/api/auth/login", "/api/auth/register");
//
//    @Override
//    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
//        ServerHttpRequest request = exchange.getRequest();
//
//        // Allow public endpoints
//        Predicate<ServerHttpRequest> isSecured = r ->
//                openEndpoints.stream().noneMatch(uri -> r.getURI().getPath().contains(uri));
//
//        if (isSecured.test(request)) {
//            if (!request.getHeaders().containsKey("Authorization")) {
//                return onError(exchange, "Missing Authorization Header", HttpStatus.UNAUTHORIZED);
//            }
//
//            String token = request.getHeaders().getFirst("Authorization");
//            if (token == null || !token.startsWith("Bearer ")) {
//                return onError(exchange, "Invalid Authorization header", HttpStatus.UNAUTHORIZED);
//            }
//
//            try {
//                token = token.substring(7); // Remove "Bearer "
//                Jwts.parser().setSigningKey(secret).parseClaimsJws(token);
//            } catch (Exception ex) {
//                return onError(exchange, "Invalid JWT: " + ex.getMessage(), HttpStatus.UNAUTHORIZED);
//            }
//        }
//
//        return chain.filter(exchange);
//    }
//
//    private Mono<Void> onError(ServerWebExchange exchange, String err, HttpStatus status) {
//        exchange.getResponse().setStatusCode(status);
//        return exchange.getResponse().setComplete();
//    }
//}
package com.pgaccomodation.apigateway.filter;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.annotation.Order;

import io.jsonwebtoken.Jwts;
import reactor.core.publisher.Mono;

@Component
@Order(1) // Make sure this runs early
public class JwtAuthenticationFilter implements GlobalFilter {

    @Value("${jwt.secret}")
    private String secret;

    private static final List<String> openEndpoints = List.of(
            "/api/auth/login",
            "/api/auth/register"
    );

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, org.springframework.cloud.gateway.filter.GatewayFilterChain chain) {

        String path = exchange.getRequest().getPath().toString();

        boolean isSecured = openEndpoints.stream().noneMatch(path::contains);
        if (!isSecured) {
            return chain.filter(exchange); // skip auth for public endpoints
        }

        var headers = exchange.getRequest().getHeaders();
        if (!headers.containsKey("Authorization")) {
            return this.onError(exchange, "Missing Authorization Header", HttpStatus.UNAUTHORIZED);
        }

        String authHeader = headers.getFirst("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return this.onError(exchange, "Invalid Authorization Header", HttpStatus.UNAUTHORIZED);
        }

        String token = authHeader.substring(7);

        try {
            Jwts.parser().setSigningKey(secret).parseClaimsJws(token);
        } catch (Exception e) {
            return this.onError(exchange, "Invalid JWT: " + e.getMessage(), HttpStatus.UNAUTHORIZED);
        }

        return chain.filter(exchange);
    }

    private Mono<Void> onError(ServerWebExchange exchange, String err, HttpStatus status) {
        exchange.getResponse().setStatusCode(status);
        return exchange.getResponse().setComplete();
    }
}

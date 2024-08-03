package com.picafe.controller;

import com.picafe.service.MenuService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Collections;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

class MenuControllerTest {

    @Mock
    private MenuService menuService;

    @InjectMocks
    private MenuController menuController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void getCategories_noCategoryName() {
        // Arrange
        Map<String, List<Map<String, Object>>> mockResponse = Collections.singletonMap(
                "category1", List.of(Map.of("itemName", "Item1", "price", 10.0))
        );

        when(menuService.getCategoryItems()).thenReturn(mockResponse);

        // Act
        Map<String, List<Map<String, Object>>> response = menuController.getCategories(null);

        // Assert
        assertEquals(mockResponse, response);
    }

    @Test
    void getCategories_withCategoryName() {
        // Arrange
        Map<String, List<Map<String, Object>>> mockResponse = Collections.singletonMap(
                "category1", List.of(Map.of("itemName", "Item1", "price", 10.0))
        );

        when(menuService.getCategoryItems()).thenReturn(mockResponse);

        // Act
        Map<String, List<Map<String, Object>>> response = menuController.getCategories("category1");

        // Assert
        assertEquals(mockResponse, response);
    }
}

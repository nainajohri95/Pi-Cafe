package com.picafe.controller;

import com.picafe.entities.Item;
import com.picafe.service.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.Map;
@RestController
public class MenuController {
    @Autowired
    private MenuService menuService;
    @GetMapping("/picafepos/api/v1/categories/items")
    public Map<String, List<Map<String, Object>>> getCategories(
            @RequestParam(value = "category", required = false) String categoryName) {
        return menuService.getCategoryItems();
    }
}
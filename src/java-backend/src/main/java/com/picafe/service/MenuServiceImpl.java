package com.picafe.service;

import com.picafe.entities.Category;
import com.picafe.entities.Item;
import com.picafe.repository.CategoryRepository;
import com.picafe.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


@Service
public class MenuServiceImpl implements MenuService {
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private ItemRepository itemRepository;
    @Override
    public Map<String, List<Map<String, Object>>> getCategoryItems() {
        List<Category> categories = categoryRepository.findAll();
        Map<String, List<Map<String, Object>>> categoryItems = new HashMap<>();

        for (Category category : categories) {
            List<Item> items = itemRepository.findByCategory(category);
            List<Map<String, Object>> itemList = items.stream()
                    .map(item -> {
                        Map<String, Object> itemMap = new HashMap<>();
                        itemMap.put("name", item.getName());
                        itemMap.put("price", item.getSellingcost());
                        itemMap.put("id",item.getId());
                        return itemMap;
                    })
                    .collect(Collectors.toList());
            categoryItems.put(category.getName(), itemList);
        }

        return categoryItems;
    }

}


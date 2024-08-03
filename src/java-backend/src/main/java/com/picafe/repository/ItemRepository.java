package com.picafe.repository;

import com.picafe.entities.Category;
import com.picafe.entities.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface ItemRepository extends JpaRepository<Item, Long> {
    List<Item> findByCategory(Category category);
}
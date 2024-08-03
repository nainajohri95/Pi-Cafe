package com.picafe.service;

import com.picafe.entities.Item;
import java.util.*;
public interface MenuService {
    Map<String, List<Map<String, Object>>> getCategoryItems();
}

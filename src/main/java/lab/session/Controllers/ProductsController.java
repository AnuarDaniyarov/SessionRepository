package lab.session.Controllers;

import lab.session.Entities.Products;
import lab.session.Repositories.ProductsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/products")
public class ProductsController {

    @Autowired
    private ProductsRepository productsRepository;

    @GetMapping("/all")
    public List<Products> getAllProducts() {
        return productsRepository.findAll();
    }

    @GetMapping
    public ResponseEntity<List<Products>> getAllProductsPaginated(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));
        Page<Products> productPage = productsRepository.findAll(pageable);
        return ResponseEntity.ok(productPage.getContent());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Products> getProductById(@PathVariable Long id) {
        Optional<Products> products = productsRepository.findById(id);
        return products.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Products> createProduct(@RequestBody Products products) {
        Products savedProduct = productsRepository.save(products);
        return new ResponseEntity<>(savedProduct, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Products> updateProduct(@PathVariable Long id, @RequestBody Products productDetails) {
        Optional<Products> productOptional = productsRepository.findById(id);

        if (productOptional.isPresent()) {
            Products product = productOptional.get();
            product.setName(productDetails.getName());
            product.setBrand(productDetails.getBrand());
            product.setCategory(productDetails.getCategory());
            product.setPrice(productDetails.getPrice());
            product.setDescription(productDetails.getDescription());

            Products updatedProduct = productsRepository.save(product);
            return ResponseEntity.ok(updatedProduct);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        if (productsRepository.existsById(id)) {
            productsRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/filter")
    public ResponseEntity<List<Products>> filterProducts(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String brand,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice) {
        List<Products> filteredProducts = productsRepository.findAll().stream()
                .filter(p -> category == null || p.getCategory().equalsIgnoreCase(category))
                .filter(p -> brand == null || p.getBrand().equalsIgnoreCase(brand))
                .filter(p -> minPrice == null || p.getPrice() >= minPrice)
                .filter(p -> maxPrice == null || p.getPrice() <= maxPrice)
                .collect(Collectors.toList());
        return ResponseEntity.ok(filteredProducts);
    }
}

 import ProductCard from "./ProductCard";

function ProductGrid({ products = [] }) {
  return (
    <div className="max-w-7xl mx-auto px-8 py-10">

      {/* Section Title */}
      <h2 className="text-2xl font-bold text-slate-800 mb-6">
        Featured Products
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-4 gap-8">

        {products.map((item, index) => (
          <ProductCard key={item.id} product = {item}  />
        ))}

      </div>

    </div>
  );
}

export default ProductGrid;
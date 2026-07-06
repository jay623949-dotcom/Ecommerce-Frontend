import React,{useState} from 'react'


function FilterSidebar({brands,categories,params,setParams}) {
    const [brand, setBrand] = useState(params.get("brand") || "");
    const [category, setCategory] = useState(params.get("category") || "");
    const [minPrice, setMinPrice] = useState(params.get("minprice") || "");
    const [maxPrice, setMaxPrice] = useState(params.get("maxprice") || "");
    const [direction, setDirection] = useState(params.get("direction") || "asc");


    const handleApplyFilters = () => {
    const newParams = new URLSearchParams(params);
    newParams.set("page", "0");

    // Brand
    if (brand) newParams.set("brand", brand);
    else newParams.delete("brand");

    // Category
    if (category) newParams.set("category", category);
    else newParams.delete("category");

    // Min Price
    if (minPrice) newParams.set("minprice", minPrice);
    else newParams.delete("minprice");

    // Max Price
    if (maxPrice) newParams.set("maxprice", maxPrice);
    else newParams.delete("maxprice");

    // Order
    newParams.set("direction", direction);

    setParams(newParams);
    };

    const clearApplyFilters =  () =>{
        const newParams = new URLSearchParams(params);
    newParams.set("page", "0");

    // Brand
    if (brand) newParams.delete("brand");
    

    // Category
    if (category)  newParams.delete("category");

    // Min Price
    if (minPrice) newParams.delete("minprice");

    // Max Price
    if (maxPrice) newParams.delete("maxprice");

    
    if(direction) newParams.delete("direction", direction);

    setParams(newParams);
    }
  return (
    <aside
    className="
    w-72
    sticky
    top-28
    h-[calc(100vh-8rem)]
    overflow-y-auto
    bg-white
    rounded-2xl
    shadow-md
    border
    border-slate-200
    p-6
    "
    >

      {/* Heading */}
      <div className="border-b border-slate-200 pb-4 mb-6">
        <h2 className="text-2xl font-bold text-slate-800">
          Filters
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          Narrow down your search
        </p>
      </div>

      {/* CATEGORY */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Category
        </label>

        <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        >
        <option value="">All Categories</option>

        {categories.length > 0 &&
            categories
            .filter((category) => category != null && category.trim() !== "")
            .map((category) => (
            <option
            key={category}
            value={category}
            >
            {category}
            </option>
            ))
        }

        </select>
      </div>

      {/* BRAND */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Brand
        </label>

        <select
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
        >

        <option value="">All Brands</option>

        {brands.length>0 && brands.map((brand) => (

        <option
            key={brand}
            value={brand}
        >
            {brand}
        </option>

       ))}

      </select>
      </div>

      {/* PRICE */}
      <div className="mb-6">

        <label className="block text-sm font-semibold text-slate-700 mb-3">
          Price Range
        </label>

        <div className="space-y-3">

          <input
            type="number"
            placeholder="Min Price"
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition"
            value = {minPrice}
            onChange= {(e) => {setMinPrice(e.target.value)}}
          />

          <input
            type="number"
            placeholder="Max Price"
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition"
            value = {maxPrice}
            onChange= {(e) => {setMaxPrice(e.target.value)}}
          />

        </div>

      </div>

      {/* ORDER */}
      <div className="mb-8">

        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Order
        </label>

        <select
          className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition"
          value = {direction}
          onChange= {(e) => {setDirection(e.target.value)}}
        >
          <option value = "desc">Ascending</option>
          <option value = "asc">Descending</option>
        </select>

      </div>

      {/* BUTTONS */}

      <div className="space-y-3">

        <button
          className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] transition"
          onClick={handleApplyFilters}
        >
          Apply Filters
        </button>

        <button
          className="w-full py-3 rounded-xl border border-slate-300 bg-white text-slate-700 font-semibold hover:bg-slate-100 transition"
          onClick={clearApplyFilters}
        >
          Clear Filters
        </button>

      </div>

    </aside>
  );
}

export default FilterSidebar;
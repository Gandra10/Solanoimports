import React, { useState, useMemo } from 'react';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import { PRODUCTS } from '../utils/products';
import ProductCard from '../components/product/ProductCard';

const Catalog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('Todos');
  const [sortBy, setSortBy] = useState('Relevância');

  const filteredProducts = useMemo(() => {
    return PRODUCTS
      .filter(p => searchTerm === '' || p.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .filter(p => filterType === 'Todos' || p.category.toLowerCase() === filterType.toLowerCase())
      .sort((a, b) => {
        if (sortBy === 'Preço: Menor') return a.price - b.price;
        if (sortBy === 'Preço: Maior') return b.price - a.price;
        return 0;
      });
  }, [searchTerm, filterType, sortBy]);

  return (
    <div className="pt-32 pb-24">
      <div className="container mx-auto px-6">
        <div className="mb-12">
          <h1 className="text-5xl font-display font-black uppercase mb-4 tracking-tighter">Nosso Catálogo</h1>
          <p className="text-light/50">Explore nossa seleção exclusiva de chuteiras profissionais.</p>
        </div>

        {/* Filters & Search Bar */}
        <div className="flex flex-col lg:flex-row gap-6 mb-12 items-center">
          <div className="relative flex-1 group w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-light/30 group-focus-within:text-secondary transition-colors" />
            <input 
              type="text" 
              placeholder="Pesquisar chuteira..." 
              className="w-full bg-[#121212] border border-white/10 rounded-full py-4 pl-12 pr-6 outline-none focus:border-secondary/50 focus:ring-1 focus:ring-secondary/50 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex gap-4 w-full lg:w-auto">
            <div className="flex-1 lg:w-48 relative">
              <select 
                className="w-full bg-[#121212] border border-white/10 rounded-full py-4 px-6 outline-none appearance-none font-bold"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                {['Todos', 'Campo', 'Society', 'Futsal'].map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <Filter className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-light/50" />
            </div>

            <div className="flex-1 lg:w-48 relative">
              <select 
                className="w-full bg-[#121212] border border-white/10 rounded-full py-4 px-6 outline-none appearance-none font-bold"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                {['Relevância', 'Preço: Menor', 'Preço: Maior'].map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              <SlidersHorizontal className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-light/50" />
            </div>
          </div>
        </div>

        {/* Results */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 glass rounded-3xl">
            <h3 className="text-2xl font-bold mb-2">Nenhum resultado encontrado</h3>
            <p className="text-light/50">Tente ajustar seus filtros ou termos de pesquisa.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Catalog;

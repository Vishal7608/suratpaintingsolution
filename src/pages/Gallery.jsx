import { useState } from 'react';
import SeoHead from '../components/SeoHead';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import { galleryData } from '../data/galleryData';
import { servicesData } from '../data/servicesData';
import { Link } from 'react-router-dom';

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Completed Work' },
    ...servicesData.map(s => ({ id: s.id, name: s.title }))
  ];

  const filteredGallery = selectedCategory === 'all'
    ? galleryData
    : galleryData.filter(item => item.category === selectedCategory);

  return (
    <>
      <SeoHead
        title="Work Gallery & Before-After Photos | SuratPaintingSolution"
        description="Explore before and after photos of interior painting, exterior weatherproof painting, terrace waterproofing, and texture walls completed in Surat."
      />

      {/* Header */}
      <section className="bg-gradient-to-b from-slate-100 via-slate-50 to-white text-slate-900 py-10 lg:py-14 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#F85000] bg-orange-100/80 px-3 py-1 rounded-full border border-orange-200">
            Real Project Portfolio
          </span>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900">
            Before & After Work Gallery
          </h1>
          <p className="text-sm sm:text-base text-slate-700 max-w-2xl mx-auto leading-relaxed">
            Drag the comparison slider on any project below to view real transformations achieved for Surat homeowners.
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-[#002048] text-white shadow-md'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Grid of Sliders */}
          {filteredGallery.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-sm bg-white p-8 rounded-xl border border-slate-200">
              No photos currently categorized under this filter. Showing overall portfolio.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {filteredGallery.map((item) => (
                <BeforeAfterSlider
                  key={item.id}
                  beforeImage={item.beforeImage}
                  afterImage={item.afterImage}
                  title={item.title}
                  area={item.area}
                  description={item.description}
                />
              ))}
            </div>
          )}

          {/* CTA */}
          <div className="text-center pt-8">
            <Link
              to="/contact"
              className="bg-[#F85000] hover:bg-[#e04800] text-white px-8 py-3.5 rounded-xl font-bold text-sm shadow-md transition-all inline-block"
            >
              Want Similar Transformation for Your Home? Request Quote
            </Link>
          </div>

        </div>
      </section>
    </>
  );
}

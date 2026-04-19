import React, { useState } from 'react';
import { mockProducts, mockCategories } from './mockProducts';
import { useCart } from '../../contexts/CartContext';
import { 
  BuildingStorefrontIcon, 
  CheckBadgeIcon,
  StarIcon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  SparklesIcon,
  CheckIcon,
  MapPinIcon,
  UsersIcon,
  BoltIcon,
  AdjustmentsHorizontalIcon,
  PhotoIcon,
  FunnelIcon,
  XMarkIcon,
  TrashIcon
} from '@heroicons/react/24/solid';

export default function EducationalMarketplace({ isLeader = false }) {
  const { cartTotalCount, studentCart, personalCart, addToStudentCart, addToPersonalCart, removeFromCart, clearCart } = useCart();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Items');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    student: true,
    members: true,
    inStock: false,
    csrDiscount: false
  });

  // Flow State
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCartTab, setActiveCartTab] = useState('student'); // 'student' | 'personal'
  const [showAddModal, setShowAddModal] = useState(false);
  const [modalProduct, setModalProduct] = useState(null);
  const [purchaseType, setPurchaseType] = useState('student');
  const [commentText, setCommentText] = useState('');

  const handleBuyClick = (product, type) => {
    setModalProduct(product);
    setPurchaseType(type);
    setCommentText('');
    setShowAddModal(true);
  };

  const submitAddToCart = () => {
    if (!modalProduct) return;
    if (purchaseType === 'student') {
      addToStudentCart(modalProduct, commentText);
    } else {
      addToPersonalCart(modalProduct);
    }
    setShowAddModal(false);
    setModalProduct(null);
  };

  const filteredProducts = mockProducts.filter(p => {
    if (selectedCategory !== 'All Items' && p.category.toLowerCase() !== selectedCategory.toLowerCase()) return false;
    if (searchTerm && !p.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    if (filters.inStock && p.outOfStock) return false;
    // Add more filter logic if needed
    return true;
  });

  return (
    <div className="flex flex-col min-h-0 bg-[#f8fafc] overflow-y-auto">
      {/* Top Meta Header */}
      <div className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-20">
        <div className="w-full px-4 xl:px-8 py-3 flex flex-wrap md:flex-nowrap items-start md:items-center justify-between gap-4">
          <div className="flex items-start md:items-center gap-3 w-full md:w-auto">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold border border-blue-100 flex-shrink-0">
              SS
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-0.5">
                <h1 className="text-lg md:text-xl font-bold text-gray-900 leading-tight truncate">Sunrise Stationery & Books</h1>
                <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex-shrink-0">
                  <CheckBadgeIcon className="w-3 h-3" /> ZenK Verified
                </span>
              </div>
              <p className="text-sm text-gray-500 font-medium truncate">Educational Marketplace Vendor</p>
            </div>
          </div>
          
          <div className="flex flex-row items-center justify-between sm:justify-end gap-3 w-full md:w-auto pt-2 md:pt-0 border-t md:border-0 border-gray-100">
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-2 px-3 shadow-sm flex items-center gap-3">
               <div>
                 <p className="text-sm font-bold text-orange-800 leading-none">10% off</p>
                 <p className="text-[10px] text-orange-600 font-medium uppercase tracking-wide mt-0.5">Circle Discount</p>
               </div>
            </div>
            <button 
              onClick={() => setIsCartOpen(true)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg px-4 py-2.5 flex items-center justify-center gap-2 font-bold text-sm shadow-sm transition-colors flex-shrink-0"
            >
              <ShoppingBagIcon className="w-5 h-5" />
              Cart {cartTotalCount > 0 && <span className="bg-white text-emerald-700 rounded-full w-5 h-5 flex items-center justify-center text-xs ml-1">{cartTotalCount}</span>}
            </button>
          </div>
        </div>
      </div>

      {/* Vendor Stats Bar */}
      <div className="bg-white border-b border-gray-100">
        <div className="w-full px-4 xl:px-8 py-2 md:py-2 flex items-center flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600">
          <span className="flex items-center gap-1.5"><MapPinIcon className="w-4 h-4 text-gray-400" /> Dadar, Mumbai</span>
          <span className="flex items-center gap-1.5"><StarIcon className="w-4 h-4 text-yellow-400" /> <span className="font-semibold text-gray-900">4.7</span> (18 reviews)</span>
          <span className="flex items-center gap-1.5"><UsersIcon className="w-4 h-4 text-blue-400" /> Serving 12 ZenK circles</span>
          <span className="flex items-center gap-1.5 text-emerald-600 font-medium"><BoltIcon className="w-4 h-4 text-emerald-500" /> Fast delivery - 2 days</span>
        </div>
      </div>

      {/* Circle Context Bar */}
      <div className="bg-emerald-50/70 border-b border-emerald-100 shadow-inner">
        <div className="w-full px-4 xl:px-8 py-2 flex flex-col lg:flex-row lg:items-center justify-between text-sm gap-3">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="text-emerald-900"><span className="font-medium text-emerald-700">Circle:</span> Ashoka Rising</span>
            <span className="text-emerald-900"><span className="font-medium text-emerald-700">SL:</span> Rohit C.</span>
            <span className="text-emerald-900 flex items-center gap-1">
               <span className="font-medium text-emerald-700">ZenQ:</span>
               <span className="bg-emerald-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">B2</span>
            </span>
            <span className="text-emerald-900">
              <span className="font-medium text-emerald-700">Student:</span> Ananya D. <span className="text-emerald-800 font-medium text-xs">(Class 9)</span>
            </span>
            <span className="font-bold text-red-600 sm:ml-2 pb-0.5 border-b border-red-200">Fund: ₹30,300</span>
          </div>
          <div className="flex items-center gap-2 text-emerald-700 text-xs font-semibold bg-white p-2 px-3 rounded-lg border border-emerald-200 shadow-sm w-full lg:w-max">
            <SparklesIcon className="w-4 h-4 flex-shrink-0 text-emerald-500" />
            <span>CSR funded discounts active for student</span>
          </div>
        </div>
      </div>

      <div className="flex-1 w-full flex flex-col md:flex-row gap-6 xl:gap-8 px-4 xl:px-8 py-4">
        
        {/* Horizontal Category Scroll (Mobile Only) */}
        <div className="md:hidden -mx-4 px-4 pb-2 overflow-x-auto sc-no-scrollbar flex items-center gap-2 sticky top-[73px] bg-[#f8fafc] z-10 py-2 border-b border-gray-100">
          {mockCategories.map(cat => (
            <button 
              key={cat.name}
              onClick={() => setSelectedCategory(cat.name)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-bold transition-all ${selectedCategory === cat.name ? 'bg-emerald-600 text-white shadow-sm' : 'bg-white text-gray-600 border border-gray-200'}`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Sidebar (Desktop Only) */}
        <div className="hidden md:flex w-60 lg:w-64 flex-shrink-0 flex-col gap-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Categories</h3>
            <div className="space-y-1">
              {mockCategories.map(cat => (
                <button 
                  key={cat.name}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${selectedCategory === cat.name ? 'bg-emerald-50 text-emerald-700 font-bold' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium'}`}
                >
                  {cat.name}
                  <span className={`text-xs px-2 py-0.5 rounded-full ${selectedCategory === cat.name ? 'bg-emerald-200/50 text-emerald-800' : 'bg-gray-100 text-gray-500'}`}>{cat.count}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Filter By</h3>
            <div className="space-y-3">
              {[
                { id: 'student', label: 'Available for student' },
                { id: 'members', label: 'Available for members' },
                { id: 'inStock', label: 'In stock only' },
                { id: 'csrDiscount', label: 'CSR discount' }
              ].map(f => (
                <label key={f.id} className="flex items-center gap-3 cursor-pointer group">
                  <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${filters[f.id] ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-gray-300 bg-white group-hover:border-emerald-400'}`}>
                    {filters[f.id] && <CheckIcon className="w-3 h-3" />}
                  </div>
                  <input type="checkbox" className="hidden" checked={filters[f.id]} onChange={() => setFilters(prev => ({...prev, [f.id]: !prev[f.id]}))} />
                  <span className="text-sm font-medium text-gray-700">{f.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="bg-orange-50 rounded-xl shadow-sm border border-orange-200 p-4">
            <h3 className="text-xs font-bold text-orange-800 uppercase tracking-wider mb-3 flex items-center gap-2">
              <ShoppingBagIcon className="w-4 h-4" /> Two ways to buy
            </h3>
            
            <div className="mb-4">
              <h4 className="text-sm font-bold text-gray-900">Buy for student</h4>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">— from circle fund. Delivered to student address. Dual approval required. <span className="font-semibold text-emerald-700">CSR discount applied.</span></p>
            </div>
            
            <div className="flex flex-col gap-2">
              <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2 leading-none">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-600"></span> 
                Buy for myself
              </h4>
              <p className="text-[11px] text-gray-500 leading-tight">Personal payment. No circle fund used. <span className="font-semibold text-orange-700">ZenK discount applies.</span></p>
            </div>
          </div>

          {/* Quick Mobile Filter (Mobile Only) */}
          <div className="md:hidden mt-2">
             <button className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-2 rounded-lg border border-emerald-200 w-full justify-center">
               <FunnelIcon className="w-4 h-4" /> Filter Products
             </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          
          {/* Search Bar */}
          <div className="relative mb-6">
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search ZenK-approved educational items..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-xl py-3 pl-12 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 shadow-sm transition-all"
            />
          </div>

          {/* Kia Recommendation Box */}
          <div className="bg-emerald-50/80 border border-emerald-200 rounded-xl p-4 mb-6 flex gap-3 shadow-sm relative overflow-hidden">
             <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500"></div>
             <div className="w-6 h-6 rounded-md bg-emerald-600 text-white flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">K</div>
             <p className="text-sm text-emerald-900 leading-relaxed">
               <span className="font-bold">Kia recommends for Ananya D. (Class 9):</span> Based on the upcoming ZQA assessment in April, the Class 9 Science Exemplar and NCERT Maths textbooks are high priority. The study table and lamp would improve her study environment at home — eligible for student purchase from the circle fund.
             </p>
          </div>

          <div className="flex justify-between items-end mb-4">
            <p className="text-sm text-gray-500 font-medium">Showing <span className="font-bold text-gray-900">{filteredProducts.length}</span> items</p>
            <div className="flex items-center gap-2">
              <label className="text-xs font-bold text-gray-400 uppercase">Sort:</label>
              <select className="text-sm font-medium bg-white border border-gray-200 rounded-lg py-1.5 px-3 focus:outline-none focus:border-emerald-500 shadow-sm cursor-pointer">
                <option>Recommended</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
            </div>
          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pb-12">
            {filteredProducts.map(product => (
              <div key={product.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow flex flex-col group">
                <div className={`h-40 flex items-center justify-center relative ${product.image ? 'bg-gray-100/50' : 'bg-gradient-to-br from-gray-50 to-gray-100 group-hover:from-emerald-50 group-hover:to-blue-50 transition-colors'}`}>
                  {product.image ? (
                    <img src={product.image} alt={product.name} className="h-full w-full object-cover mix-blend-multiply opacity-90 group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="flex flex-col items-center gap-2 opacity-20">
                       <PhotoIcon className="w-12 h-12 text-gray-400" />
                       <span className="text-[10px] font-bold tracking-widest uppercase">No Image</span>
                    </div>
                  )}
                  <div className="absolute top-2 right-2">
                     <span className="bg-white/90 backdrop-blur-sm p-1.5 rounded-full shadow-sm">
                        <ShoppingBagIcon className="w-3 h-3 text-emerald-600" />
                     </span>
                  </div>
                </div>
                
                {/* Product Info */}
                <div className="p-4 flex flex-col flex-1">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{product.category}</span>
                  <h3 className="font-bold text-gray-900 text-sm leading-tight mb-1">{product.name}</h3>
                  <p className="text-xs text-gray-500 line-clamp-2 mb-3 min-h-[32px]">{product.description}</p>
                  
                  {product.approved && (
                    <div className="mb-3">
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 hidden">
                        <CheckIcon className="w-3 h-3" /> ZenK approved
                      </span>
                    </div>
                  )}

                  <div className="mt-auto space-y-2">
                    <div className="flex justify-between items-center text-xs">
                       <span className="text-gray-400 font-medium">MRP</span>
                      <span className="text-gray-400 line-through">₹{product.mrp}</span>
                    </div>
                    
                    {product.studentPrice && (
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-gray-600">Student</span>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-gray-900">₹{product.studentPrice}</span>
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">-{product.studentDiscount}%</span>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-gray-600">Member</span>
                      <div className="flex items-center gap-2">
                         <span className="font-bold text-orange-600">₹{product.memberPrice}</span>
                         <span className="text-[10px] font-bold text-orange-700 bg-orange-100 px-1.5 py-0.5 rounded">-{product.memberDiscount}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-4 space-y-2">
                    {product.outOfStock ? (
                      <button disabled className="w-full py-2.5 rounded-lg text-sm font-bold bg-gray-100 text-gray-400 cursor-not-allowed">
                        Out of stock
                      </button>
                    ) : (
                      <>
                        {product.studentPrice && (
                           <div className="relative group/btn">
                             <button onClick={() => handleBuyClick(product, 'student')} className="w-full py-2 rounded-lg text-sm font-bold bg-[#2da461] hover:bg-[#248850] text-white transition-colors flex items-center justify-center gap-2 shadow-sm">
                               <ShoppingBagIcon className="w-4 h-4 opacity-70" /> Buy for student <span className="opacity-80 font-medium">₹{product.studentPrice}</span>
                             </button>
                             <div className="text-center mt-1">
                                <span className="text-[9px] text-gray-400 font-medium">CSR discount • Dual approval required</span>
                             </div>
                           </div>
                        )}
                        <button onClick={() => handleBuyClick(product, 'personal')} className={`w-full py-2 rounded-lg text-sm font-bold border border-gray-200 hover:border-orange-300 hover:bg-orange-50 text-gray-700 hover:text-orange-800 transition-colors flex items-center justify-center gap-2 shadow-sm ${!product.studentPrice ? 'mt-2' : ''}`}>
                          <span className="w-3 h-3 rounded-full bg-purple-600"></span> 
                          {product.studentPrice ? 'Buy for myself' : 'Members only'} <span className="text-orange-600 font-medium">₹{product.memberPrice}</span>
                        </button>
                      </>
                    )}
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add To Cart Modal */}
      {showAddModal && modalProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm shadow-2xl transition-opacity">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden transform scale-100 transition-transform">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-bold text-gray-900">Add to {purchaseType === 'student' ? 'Student Fund' : 'Personal'} Cart</h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600 rounded-full p-1 bg-gray-50 transition-colors">
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-4 mb-4">
                 <div className="w-16 h-16 rounded-xl bg-gray-100 p-1">
                    <img src={modalProduct.image || 'https://res.cloudinary.com/dhlmxyh9f/image/upload/v1703080000/zenk_market/placeholder.jpg'} alt="" className="w-full h-full object-cover mix-blend-multiply rounded-lg" />
                 </div>
                 <div>
                   <p className="font-bold text-sm text-gray-900">{modalProduct.name}</p>
                   <p className="text-xs text-gray-500">{modalProduct.category}</p>
                   <p className="text-sm font-bold mt-1 text-emerald-700">₹{purchaseType === 'student' ? modalProduct.studentPrice : modalProduct.memberPrice}</p>
                 </div>
              </div>

              {purchaseType === 'student' && (
                <div className="mb-4">
                  <label className="block text-xs font-bold text-gray-700 mb-1">Optional comment for Leader</label>
                  <textarea 
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="e.g. Ananya needs this for her upcoming science project..."
                    className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 resize-none h-20 shadow-sm transition-shadow"
                  />
                </div>
              )}

              {purchaseType === 'personal' && (
                <div className="bg-orange-50 border border-orange-100 p-3 rounded-xl mb-4 shadow-sm">
                   <p className="text-xs text-orange-800 leading-relaxed"><span className="font-bold">Note:</span> This drops into your personal cart. Everyone (Members & Leaders) checks out their personal items using their own payment method.</p>
                </div>
              )}
            </div>
            <div className="p-5 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
              <button onClick={() => setShowAddModal(false)} className="px-5 py-2.5 text-sm font-bold text-gray-600 hover:text-gray-900 bg-white border border-gray-200 shadow-sm rounded-xl transition-colors">Cancel</button>
              <button onClick={submitAddToCart} className="px-5 py-2.5 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm rounded-xl transition-colors">
                Add Item
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cart Slide-Over */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex transition-opacity">
          <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={() => setIsCartOpen(false)}></div>
          <div className="relative ml-auto w-full max-w-md bg-white shadow-2xl h-full flex flex-col transform transition-transform duration-300">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-white shrink-0">
              <div className="flex items-center gap-3">
                <ShoppingBagIcon className="w-6 h-6 text-emerald-600" />
                <h2 className="text-lg font-bold text-gray-900">Your Cart</h2>
              </div>
              <button onClick={() => setIsCartOpen(false)} className="bg-gray-50 p-2 rounded-full text-gray-400 hover:text-gray-900 transition-colors">
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

            <div className="flex px-4 border-b border-gray-100 shrink-0 bg-white">
              <button 
                onClick={() => setActiveCartTab('student')}
                className={`flex-1 py-3 text-sm font-bold border-b-2 transition-colors ${activeCartTab === 'student' ? 'border-emerald-600 text-emerald-700' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              >
                Student Fund Cart ({studentCart.length})
              </button>
              <button 
                onClick={() => setActiveCartTab('personal')}
                className={`flex-1 py-3 text-sm font-bold border-b-2 transition-colors ${activeCartTab === 'personal' ? 'border-orange-500 text-orange-700' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              >
                Personal Cart ({personalCart.length})
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-5 bg-[#f8fafc] space-y-4 shadow-inner">
              {activeCartTab === 'student' ? (
                studentCart.length === 0 ? (
                  <div className="text-center py-10">
                    <ShoppingBagIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 font-medium">Student cart is empty</p>
                  </div>
                ) : (
                  studentCart.map(item => (
                    <div key={item.cartId} className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm relative group overflow-hidden">
                       <button onClick={() => removeFromCart(item.cartId, 'student')} className="absolute top-3 right-3 text-gray-300 hover:text-red-500 p-1 opacity-0 group-hover:opacity-100 transition-opacity z-10 bg-white rounded-md">
                         <TrashIcon className="w-4 h-4" />
                       </button>
                       <div className="flex items-start gap-4 mb-3">
                         <img src={item.product.image || 'https://res.cloudinary.com/dhlmxyh9f/image/upload/v1703080000/zenk_market/placeholder.jpg'} className="w-16 h-16 rounded-lg object-cover bg-gray-50" alt="" />
                         <div className="flex-1 min-w-0 pr-6">
                           <p className="text-sm font-bold text-gray-900 leading-tight">{item.product.name}</p>
                           <p className="text-emerald-700 font-bold mt-1">₹{item.product.studentPrice}</p>
                         </div>
                       </div>
                       <div className="bg-emerald-50/50 rounded-lg p-3 border border-emerald-100/50">
                         <p className="text-xs text-gray-500 mb-1">Added by: <span className="font-bold text-gray-800">{item.addedBy.name} ({item.addedBy.role})</span></p>
                         {item.comment ? (
                            <p className="text-xs text-gray-700 italic border-l-2 border-emerald-300 pl-2 py-0.5">"{item.comment}"</p>
                         ) : (
                            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">No comment left</p>
                         )}
                       </div>
                    </div>
                  ))
                )
              ) : (
                personalCart.length === 0 ? (
                  <div className="text-center py-10">
                    <ShoppingBagIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 font-medium">Personal cart is empty</p>
                  </div>
                ) : (
                  personalCart.map(item => (
                    <div key={item.cartId} className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm relative group">
                       <button onClick={() => removeFromCart(item.cartId, 'personal')} className="absolute top-3 right-3 text-gray-300 hover:text-red-500 p-1">
                         <TrashIcon className="w-4 h-4" />
                       </button>
                       <div className="flex items-start gap-4">
                         <img src={item.product.image || 'https://res.cloudinary.com/dhlmxyh9f/image/upload/v1703080000/zenk_market/placeholder.jpg'} className="w-16 h-16 rounded-lg object-cover bg-gray-50" alt="" />
                         <div className="flex-1 min-w-0 pr-6">
                           <p className="text-sm font-bold text-gray-900 leading-tight">{item.product.name}</p>
                           <p className="text-orange-600 font-bold mt-1">₹{item.product.memberPrice}</p>
                         </div>
                       </div>
                    </div>
                  ))
                )
              )}
            </div>

            <div className="p-5 border-t border-gray-100 bg-white shrink-0 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
               {activeCartTab === 'student' ? (
                 <>
                   <div className="flex justify-between items-center mb-4">
                     <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">Student Fund Total</span>
                     <span className="text-xl font-bold text-gray-900 border-b-2 border-emerald-200 pb-0.5">₹{studentCart.reduce((acc, item) => acc + item.product.studentPrice, 0)}</span>
                   </div>
                   {isLeader ? (
                     <button disabled={studentCart.length === 0} className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-sm transition-colors text-sm flex items-center justify-center gap-2">
                       Approve & Complete Purchase <CheckBadgeIcon className="w-5 h-5" />
                     </button>
                   ) : (
                     <div className="bg-[#f0fdf4] border border-emerald-200 p-3.5 rounded-xl text-center">
                       <p className="text-sm font-bold text-emerald-800">Awaiting Leader Approval</p>
                       <p className="text-[11px] font-medium text-emerald-600 mt-1 leading-relaxed">Only your Circle Leader can authorize and complete purchases from the central fund.</p>
                     </div>
                   )}
                 </>
               ) : (
                 <>
                   <div className="flex justify-between items-center mb-4">
                     <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">Personal Total</span>
                     <span className="text-xl font-bold text-gray-900 border-b-2 border-orange-200 pb-0.5">₹{personalCart.reduce((acc, item) => acc + item.product.memberPrice, 0)}</span>
                   </div>
                   <button disabled={personalCart.length === 0} className="w-full py-3.5 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-sm transition-colors text-sm flex items-center justify-center gap-2">
                     Checkout Personally <ShoppingBagIcon className="w-5 h-5" />
                   </button>
                 </>
               )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

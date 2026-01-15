import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, X, ZoomIn, Droplet, Truck } from 'lucide-react';

export default function GaleriaInteractiva() {
  // Datos de la flota
  const [items, setItems] = useState([
    { id: 1, img: "/cisterna.jpg", title: "Cisterna Principal 5000GL", desc: "Abastecimiento masivo para obras.", icon: <Truck size={18} /> },
    { id: 2, img: "/cisterna.jpg", title: "Unidad Táctica de Respuesta", desc: "Acceso a zonas difíciles.", icon: <Truck size={18} /> },
    { id: 3, img: "/cisterna.jpg", title: "Proceso de Llenado", desc: "Agua certificada en planta.", icon: <Droplet size={18} /> },
    { id: 4, img: "/cisterna.jpg", title: "Flota Norte", desc: "Distribución en ruta.", icon: <Truck size={18} /> },
    { id: 5, img: "/cisterna.jpg", title: "Control de Calidad", desc: "Monitoreo constante.", icon: <Droplet size={18} /> },
  ]);

  // Estado para el Lightbox
  const [selectedId, setSelectedId] = useState(null);

  const handleNext = () => {
    setItems((prev) => {
      const newArr = [...prev];
      newArr.push(newArr.shift());
      return newArr;
    });
  };

  const handlePrev = () => {
    setItems((prev) => {
      const newArr = [...prev];
      newArr.unshift(newArr.pop());
      return newArr;
    });
  };

  const visibleItems = items.slice(0, 3);
  const currentMainItem = items[0]; 

  return (
    <section className="relative py-40 bg-white">
      
      {/* === OLA SUPERIOR AZUL === */}
      {/* position: absolute, top: 0 para que quede pegada arriba */}
      <div className="absolute top-0 left-0 w-full overflow-hidden z-20 leading-[0] pointer-events-none">
        <svg 
            className="relative block w-[calc(100%+1.3px)] h-[60px] md:h-[90px]" 
            data-name="Layer 1" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 1200 120" 
            preserveAspectRatio="none"
        >
            <path 
                d="M0,0 V50 Q30,100 60,50 T120,50 T180,50 T240,50 T300,50 T360,50 T420,50 T480,50 T540,50 T600,50 T660,50 T720,50 T780,50 T840,50 T900,50 T960,50 T1020,50 T1080,50 T1140,50 T1200,50 V0 Z" 
                fill="#10367D"
            ></path>
        </svg>
      </div>
      {/* ======================== */}

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Encabezado y Contador */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-10">
          <div>
            <h3 className="text-4xl font-bold text-[#10367D] font-outfit">Nuestra Flota en Acción</h3>
            <p className="text-slate-500 mt-2 flex items-center gap-2">
              <Droplet size={16} className="text-sky-500" />
              Imágenes reales de nuestros operativos de abastecimiento.
            </p>
          </div>
          {/* Contador */}
          <div className="mt-4 md:mt-0 bg-[#10367D]/10 text-[#10367D] px-5 py-2 rounded-full font-bold font-outfit">
            Imagen {currentMainItem.id} / {items.length}
          </div>
        </div>

        {/* Contenedor Principal del Carrusel */}
        <div className="relative group/carousel">
          
          {/* Botón Izquierda */}
          <button 
            onClick={handlePrev} 
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 z-20 bg-white/80 hover:bg-[#10367D] text-[#10367D] hover:text-white p-3 rounded-full shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-110 group-hover/carousel:opacity-100 opacity-0 md:opacity-100"
          >
            <ArrowLeft size={24} />
          </button>

          {/* Botón Derecha */}
          <button 
            onClick={handleNext} 
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 z-20 bg-white/80 hover:bg-[#10367D] text-[#10367D] hover:text-white p-3 rounded-full shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-110 group-hover/carousel:opacity-100 opacity-0 md:opacity-100"
          >
            <ArrowRight size={24} />
          </button>

          {/* Grid Animado */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-[500px] lg:h-[580px]">
            <AnimatePresence mode="popLayout">
              {visibleItems.map((item, index) => {
                const isFeatured = index === 0;
                return (
                  <motion.div
                    key={item.id}
                    layoutId={`card-${item.id}`}
                    onClick={() => setSelectedId(item.id)}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5, filter: 'blur(10px)' }}
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    className={`relative overflow-hidden rounded-3xl shadow-xl cursor-zoom-in group
                      ${isFeatured ? 'lg:col-span-2 lg:row-span-2 z-10' : 'col-span-1 row-span-1 bg-slate-100'}
                    `}
                  >
                    <motion.img 
                      src={item.img} 
                      alt={item.title}
                      layoutId={selectedId !== item.id ? `img-${item.id}` : undefined}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    />
                    
                    <div className={`absolute inset-0 bg-gradient-to-t from-[#10367D] via-[#10367D]/30 to-transparent opacity-80 ${isFeatured ? 'opacity-90' : 'opacity-70 group-hover:opacity-90'} transition-opacity duration-300`}></div>

                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 pointer-events-none">
                        <ZoomIn size={48} className="drop-shadow-lg" />
                    </div>

                    <div className="absolute bottom-0 left-0 p-6 w-full z-20">
                      {isFeatured && (
                         <motion.div 
                           initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                           className="inline-flex items-center gap-1 bg-sky-500/80 text-white text-xs font-bold px-3 py-1 rounded-full mb-2 backdrop-blur-md">
                           <Droplet size={12} fill="currentColor" />
                           Unidad Certificada
                         </motion.div>
                      )}
                      <h4 className={`text-white font-bold font-outfit leading-tight ${isFeatured ? 'text-2xl mb-2' : 'text-lg'}`}>
                        {item.title}
                      </h4>
                      {isFeatured && (
                        <p className="text-sky-200 flex items-center gap-2">
                          {item.icon}
                          {item.desc}
                        </p>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* === LIGHTBOX === */}
        <AnimatePresence>
          {selectedId && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="fixed inset-0 z-50 bg-[#10367D]/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            >
              <button 
                onClick={() => setSelectedId(null)}
                className="absolute top-4 right-4 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors z-10"
              >
                <X size={32} />
              </button>

              {items.map(item => item.id === selectedId && (
                <motion.div 
                  key={item.id}
                  layoutId={`card-${item.id}`} 
                  className="relative max-w-5xl w-full max-h-full rounded-2xl overflow-hidden shadow-2xl aspect-video bg-slate-900"
                  onClick={(e) => e.stopPropagation()}
                >
                    <motion.img 
                      src={item.img} 
                      alt={item.title}
                      layoutId={`img-${item.id}`} 
                      className="w-full h-full object-contain" 
                    />
                     <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
                      <h3 className="text-3xl font-bold font-outfit mb-2">{item.title}</h3>
                      <p className="text-slate-300 flex items-center gap-2 text-lg">
                          {item.icon}
                          {item.desc}
                      </p>
                    </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
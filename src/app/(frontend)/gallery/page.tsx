"use client";

import { useRef } from "react";
import LightGallery from "lightgallery/react";

// Import styles
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";

import "./lggallery.module.css";

function ElGallery() {
  const galleryRef = useRef<any>(null);

  const onInit = (detail: any) => {
    galleryRef.current = detail.instance;
    console.log("LightGallery has been initialized", detail);
  };

  // Generate array of image numbers from 1 to 57
  const images = Array.from({ length: 26 }, (_, i) => i + 1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
      {/* Header Section */}
      <div className="relative py-20 px-4 text-center">
        <div className="absolute inset-0 bg-gradient-to-r from-rose-100/20 to-pink-100/20"></div>
        <div className="relative max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-light text-gray-800 mb-6 tracking-wide">
            Our Gallery
          </h1>
          <div className="w-24 h-0.5 bg-rose-400 mx-auto mb-8"></div>
          <p className="text-xl md:text-2xl text-gray-600 leading-relaxed font-light max-w-3xl mx-auto">
            Every love story is beautiful, but ours is my favorite. Capturing the magic, 
            the laughter, the tears of joy, and all the precious moments that make your 
            wedding day unforgettable.
          </p>
          <p className="text-lg text-gray-500 mt-6 font-light">
            Click on any image to view it in full resolution
          </p>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          <LightGallery
            onInit={onInit}
            speed={500}
            plugins={[lgThumbnail, lgZoom]}
            elementClassNames="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4"
          >
            {images.map((num) => (
              <a
                key={num}
                href={`/images/a${num}.jpg`}
                data-lg-size="1200x800"
                data-responsive={`/images/a${num}.jpg 480, /images/a${num}.jpg 800`}
                className="group block relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-square overflow-hidden bg-gray-100">
                  <img
                    alt={`Wedding photo ${num}`}
                    src={`/images/a${num}.jpg`}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  {/* Overlay effect */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <svg 
                        className="w-8 h-8 text-white" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" 
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </LightGallery>
        </div>
      </div>

      {/* Footer Message */}
      <div className="bg-gradient-to-r from-rose-100 to-pink-100 py-16 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-light text-gray-800 mb-4">
            Thank You for Sharing Our Journey
          </h3>
          <p className="text-gray-600 text-lg leading-relaxed">
            These moments wouldn't be the same without our loved ones. 
            Each photograph tells a piece of our story, and we're grateful 
            you're part of it.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ElGallery;
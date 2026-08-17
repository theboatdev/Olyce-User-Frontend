'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Leaflet with Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

interface Location {
  lat: number;
  lng: number;
  name?: string;
}

interface ItineraryDay {
  day: string;
  description?: string;
  location?: Location;
}

interface InteractiveMapProps {
  itinerary?: ItineraryDay[];
  packageName: string;
}

export default function InteractiveMap({ itinerary, packageName }: InteractiveMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Filter itinerary days that have location data
    const locationsWithData = itinerary?.filter(day => 
      day.location && 
      typeof day.location.lat === 'number' && 
      typeof day.location.lng === 'number'
    ) || [];

    if (locationsWithData.length === 0) {
      // No locations available, show placeholder
      return;
    }

    // Initialize map
    const map = L.map(mapRef.current, {
      zoomControl: true,
      scrollWheelZoom: true,
    });

    mapInstanceRef.current = map;

    // Add tile layer (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    // Create custom icon for markers
    const customIcon = L.divIcon({
      className: 'custom-marker',
      html: `
        <div style="
          background: white;
          border: 3px solid #1a1a1a;
          border-radius: 50%;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 14px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        "></div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });

    // Add markers for each location
    const markers: L.Marker[] = [];
    locationsWithData.forEach((day, index) => {
      if (!day.location) return;

      const marker = L.marker([day.location.lat, day.location.lng], {
        icon: L.divIcon({
          className: 'custom-marker',
          html: `
            <div style="
              background: white;
              border: 3px solid #1a1a1a;
              border-radius: 50%;
              width: 36px;
              height: 36px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-weight: bold;
              font-size: 14px;
              box-shadow: 0 2px 8px rgba(0,0,0,0.3);
              color: #1a1a1a;
            ">${index + 1}</div>
          `,
          iconSize: [36, 36],
          iconAnchor: [18, 18],
        }),
      }).addTo(map);

      // Add popup with day information
      const popupContent = `
        <div style="font-family: 'Manrope', sans-serif; min-width: 200px;">
          <h4 style="margin: 0 0 8px 0; font-size: 16px; font-weight: 600;">${day.day}</h4>
          ${day.location.name ? `<p style="margin: 0 0 4px 0; font-size: 13px; color: #666;"><strong>📍 ${day.location.name}</strong></p>` : ''}
          ${day.description ? `<p style="margin: 0; font-size: 13px; color: #444; line-height: 1.4;">${day.description.substring(0, 150)}${day.description.length > 150 ? '...' : ''}</p>` : ''}
        </div>
      `;

      marker.bindPopup(popupContent);
      markers.push(marker);
    });

    // Draw route line connecting all locations
    if (locationsWithData.length > 1) {
      const routeCoordinates: [number, number][] = locationsWithData.map(day => [
        day.location!.lat,
        day.location!.lng,
      ]);

      L.polyline(routeCoordinates, {
        color: '#1a1a1a',
        weight: 3,
        opacity: 0.7,
        dashArray: '10, 10',
        lineJoin: 'round',
      }).addTo(map);
    }

    // Fit map bounds to show all markers
    if (markers.length > 0) {
      const group = L.featureGroup(markers);
      map.fitBounds(group.getBounds().pad(0.1));
    }

    // Cleanup
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [itinerary]);

  // Check if there are any locations
  const hasLocations = itinerary?.some(day => 
    day.location && 
    typeof day.location.lat === 'number' && 
    typeof day.location.lng === 'number'
  );

  if (!hasLocations) {
    return (
      <div className="w-full aspect-video bg-surface-container rounded-lg flex flex-col items-center justify-center border border-outline-variant/30 p-8">
        <span className="material-symbols-outlined text-5xl text-on-surface/20 mb-4">map</span>
        <span className="font-label-sm text-on-surface/40 italic text-center">
          Interactive map will appear here once locations are added to the itinerary
        </span>
      </div>
    );
  }

  return (
    <div className="w-full aspect-video bg-surface-container rounded-lg overflow-hidden border border-outline-variant/30 relative">
      <div ref={mapRef} className="w-full h-full" />
      
      {/* Map Legend */}
      <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-4 z-[1000] max-w-xs">
        <h4 className="font-label-sm text-xs uppercase tracking-wider text-on-surface mb-2 font-bold">
          {packageName} Route
        </h4>
        <div className="flex items-center gap-2 text-xs text-on-surface/70">
          <div className="w-6 h-6 bg-white border-2 border-on-surface rounded-full flex items-center justify-center font-bold text-[10px]">1</div>
          <span>Click markers for details</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-on-surface/70 mt-2">
          <div className="w-8 h-0.5 bg-on-surface" style={{ borderTop: '2px dashed #1a1a1a' }}></div>
          <span>Travel route</span>
        </div>
      </div>
    </div>
  );
}

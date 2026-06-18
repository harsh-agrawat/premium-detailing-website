"use client";

import React, { useState, useEffect, useCallback } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents
} from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in React-Leaflet
if (typeof window !== 'undefined') {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  });
}

// Custom marker icons
const createCustomIcon = (color = 'blue', size: 'small' | 'medium' | 'large' = 'medium') => {
  const sizes = {
    small: [20, 32],
    medium: [25, 41],
    large: [30, 50]
  };
  
  return new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: sizes[size] as L.PointTuple,
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
};

interface MapMarker {
  id?: number | string;
  position: [number, number];
  color?: string;
  size?: 'small' | 'medium' | 'large';
  icon?: L.Icon;
  popup?: {
    title: string;
    content: string;
    image?: string;
  };
}

interface AdvancedMapProps {
  center?: [number, number];
  zoom?: number;
  markers?: MapMarker[];
  onMarkerClick?: (marker: MapMarker) => void;
  enableClustering?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const AdvancedMap: React.FC<AdvancedMapProps> = ({
  center = [34.0736, -118.4004], // Beverly Hills fallback
  zoom = 13,
  markers = [],
  onMarkerClick,
  enableClustering = true,
  className = '',
  style = { height: '500px', width: '100%' }
}) => {
  // Fix for SSR with Leaflet
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div style={style} className="bg-muted flex items-center justify-center text-muted-foreground rounded-2xl animate-pulse">Loading Map...</div>;

  return (
    <div className={`advanced-map ${className} rounded-2xl overflow-hidden border border-border/20 shadow-2xl relative z-0`} style={style}>
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%', zIndex: 0 }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" // Dark theme map for luxury feel
        />

        {/* Markers with clustering */}
        {enableClustering ? (
          <MarkerClusterGroup>
            {markers.map((marker, index) => (
              <Marker
                key={marker.id || index}
                position={marker.position}
                icon={marker.icon || createCustomIcon(marker.color, marker.size)}
                eventHandlers={{
                  click: () => onMarkerClick && onMarkerClick(marker)
                }}
              >
                {marker.popup && (
                  <Popup>
                    <div className="bg-background text-foreground p-1 rounded-md">
                      <h3 className="font-bold text-lg mb-1">{marker.popup.title}</h3>
                      <p className="text-muted-foreground text-sm">{marker.popup.content}</p>
                    </div>
                  </Popup>
                )}
              </Marker>
            ))}
          </MarkerClusterGroup>
        ) : (
          markers.map((marker, index) => (
            <Marker
              key={marker.id || index}
              position={marker.position}
              icon={marker.icon || createCustomIcon(marker.color, marker.size)}
              eventHandlers={{
                click: () => onMarkerClick && onMarkerClick(marker)
              }}
            >
              {marker.popup && (
                <Popup>
                  <div>
                    <h3 className="font-bold">{marker.popup.title}</h3>
                    <p>{marker.popup.content}</p>
                  </div>
                </Popup>
              )}
            </Marker>
          ))
        )}
      </MapContainer>
    </div>
  );
};

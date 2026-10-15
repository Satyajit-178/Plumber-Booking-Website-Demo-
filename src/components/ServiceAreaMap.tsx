import React, { useState } from 'react';
import { MapPin, Phone, Clock, Truck, CheckCircle2 } from 'lucide-react';
import { SiteConfig, ServiceAreaItem, resolvePlaceholders } from '../data/siteConfig';

interface ServiceAreaMapProps {
  config: SiteConfig;
  onSelectAreaForQuote: (areaName: string) => void;
}

export const ServiceAreaMap: React.FC<ServiceAreaMapProps> = ({
  config,
  onSelectAreaForQuote,
}) => {
  const areas = config.serviceAreasSection.areas;
  const [selectedAreaId, setSelectedAreaId] = useState<string>(areas[0]?.id || 'downtown');
  const [imgError, setImgError] = useState(false);

  const activeArea: ServiceAreaItem =
    areas.find((a) => a.id === selectedAreaId) || areas[0];

  const resolvedAreaName = resolvePlaceholders(activeArea.name, config);
  const resolvedCityState = config.business.cityState;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
      {/* Left column: Neighborhood selector buttons + active neighborhood dispatch details */}
      <div className="lg:col-span-5 flex flex-col justify-between bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs">
        <div>
          <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <p className="text-xs font-medium text-slate-500">
                Select Neighborhood or Service Zone
              </p>
              <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                {resolvedCityState} Service Coverage
              </h3>
            </div>
            <span className="font-mono-tabular text-xs font-semibold text-[#0B3C6F]">
              {areas.length} Active Zones
            </span>
          </div>

          {/* Interactive Filter Controls for Neighborhoods */}
          <div
            className="mt-5 flex flex-wrap gap-2"
            role="tablist"
            aria-label="Service Area Neighborhoods"
          >
            {areas.map((area) => {
              const isSelected = area.id === activeArea.id;
              const label = resolvePlaceholders(area.name, config);
              return (
                <button
                  key={area.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setSelectedAreaId(area.id)}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF7A00] ${
                    isSelected
                      ? 'bg-[#0B3C6F] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* Selected Area Dispatch Card */}
          <div className="mt-6 pt-6 border-t border-slate-200">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span>Active Dispatch Zone</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono-tabular">ZIP {activeArea.zipCodes}</span>
                </div>
                <h4 className="text-xl font-bold text-slate-900 mt-1">
                  {resolvedAreaName}
                </h4>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-500 block">Est. Arrival</span>
                <span className="font-mono-tabular text-sm font-bold text-[#0B3C6F]">
                  {activeArea.etaMinutes}
                </span>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 bg-slate-50 p-4 rounded-lg border border-slate-200/80">
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#FF7A00] shrink-0" />
                <div>
                  <p className="text-xs text-slate-500">Same-Day Window</p>
                  <p className="text-xs font-semibold text-slate-900">Available Today</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Truck className="w-4 h-4 text-[#0B3C6F] shrink-0" />
                <div>
                  <p className="text-xs text-slate-500">Local Units</p>
                  <p className="text-xs font-semibold text-slate-900 font-mono-tabular">
                    {activeArea.activeCrews} Stocked Vans
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fleet visual + Action row */}
        <div className="mt-6 pt-6 border-t border-slate-100 space-y-4">
          <div className="relative h-36 rounded-lg overflow-hidden bg-[#0B3C6F] border border-slate-200">
            {!imgError && config.serviceAreasSection.dispatchImage ? (
              <img
                src={config.serviceAreasSection.dispatchImage}
                alt={config.serviceAreasSection.dispatchImageAlt}
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#0B3C6F] to-slate-900 text-white p-4">
                <Truck className="w-8 h-8 text-[#FF7A00] mr-3 shrink-0" />
                <span className="text-sm font-medium">
                  GPS-Dispatched Plumbing Fleet in {resolvedCityState}
                </span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/25 to-transparent flex items-end p-3.5">
              <p className="text-xs text-white font-medium flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#FF7A00] shrink-0" />
                <span>Fully stocked trucks serving {resolvedAreaName}</span>
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={`tel:${config.business.phoneTel}`}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#FF7A00] hover:bg-[#e66e00] text-white font-semibold text-sm transition-colors shadow-xs whitespace-nowrap shrink-0"
            >
              <Phone className="w-4 h-4 shrink-0" />
              <span>Call Now</span>
            </a>
            <button
              type="button"
              onClick={() => onSelectAreaForQuote(resolvedAreaName)}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-slate-300 hover:border-[#0B3C6F] text-slate-800 hover:text-[#0B3C6F] font-semibold text-sm transition-colors bg-white whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Schedule in {resolvedAreaName}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Right column: Interactive Regional Dispatch Map Placeholder */}
      <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs flex flex-col justify-between min-h-[420px]">
        <div className="px-6 py-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4 bg-slate-50/70">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#FF7A00] shrink-0" />
            <span className="text-sm font-bold text-slate-900">
              {resolvedCityState} Regional Dispatch Map
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-600">
            <span>25-Mile Service Radius</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono-tabular">Click any pin to inspect zone</span>
          </div>
        </div>

        {/* Interactive SVG Map Canvas */}
        <div className="relative flex-1 bg-[#F1F5F9] overflow-hidden select-none min-h-[340px]">
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="w-full h-full absolute inset-0"
            aria-label={`Service area map for ${resolvedCityState}`}
          >
            {/* Subtle municipal grid lines */}
            <defs>
              <pattern id="cityGrid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path
                  d="M 10 0 L 0 0 0 10"
                  fill="none"
                  stroke="#E2E8F0"
                  strokeWidth="0.35"
                />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#cityGrid)" />

            {/* Stylized parkland zones */}
            <path
              d="M 8 15 Q 25 10, 32 25 T 18 40 Z"
              fill="#DCFCE7"
              opacity="0.7"
            />
            <path
              d="M 70 65 Q 88 60, 92 78 T 72 90 Z"
              fill="#DCFCE7"
              opacity="0.7"
            />

            {/* Stylized river waterway */}
            <path
              d="M 0 62 C 25 58, 45 72, 68 52 C 82 40, 90 42, 100 35"
              fill="none"
              stroke="#BAE6FD"
              strokeWidth="4.5"
              strokeLinecap="round"
            />
            <path
              d="M 0 62 C 25 58, 45 72, 68 52 C 82 40, 90 42, 100 35"
              fill="none"
              stroke="#7DD3FC"
              strokeWidth="1.2"
              strokeLinecap="round"
            />

            {/* Major arterial highways */}
            <path
              d="M 12 0 L 52 48 L 88 100"
              fill="none"
              stroke="#CBD5E1"
              strokeWidth="1.6"
            />
            <path
              d="M 0 44 L 50 48 L 100 52"
              fill="none"
              stroke="#CBD5E1"
              strokeWidth="1.6"
            />
            <path
              d="M 22 100 L 50 48 L 82 0"
              fill="none"
              stroke="#E2E8F0"
              strokeWidth="1.1"
            />

            {/* Outer and inner service radius rings */}
            <circle
              cx="50"
              cy="48"
              r="38"
              fill="rgba(11, 60, 111, 0.03)"
              stroke="#0B3C6F"
              strokeWidth="0.4"
              strokeDasharray="2 1.5"
            />
            <circle
              cx="50"
              cy="48"
              r="22"
              fill="rgba(11, 60, 111, 0.04)"
              stroke="#0B3C6F"
              strokeWidth="0.35"
              strokeDasharray="1.5 1.5"
            />

            {/* Connection line from Central HQ (50, 48) to active area */}
            <line
              x1="50"
              y1="48"
              x2={activeArea.mapCoords.x}
              y2={activeArea.mapCoords.y}
              stroke="#FF7A00"
              strokeWidth="0.75"
              strokeDasharray="1.5 1"
            />
          </svg>

          {/* Interactive HTML Pins overlaid on the map */}
          {areas.map((area) => {
            const isSelected = area.id === activeArea.id;
            const areaLabel = resolvePlaceholders(area.name, config);
            return (
              <button
                key={area.id}
                type="button"
                onClick={() => setSelectedAreaId(area.id)}
                style={{
                  left: `${area.mapCoords.x}%`,
                  top: `${area.mapCoords.y}%`,
                }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer focus-visible:outline-2 focus-visible:outline-[#FF7A00] rounded-lg transition-transform duration-150 ${
                  isSelected ? 'z-20 scale-105' : 'z-10 hover:scale-105'
                }`}
                aria-label={`Select service area ${areaLabel}`}
              >
                <div
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold shadow-sm border transition-colors whitespace-nowrap ${
                    isSelected
                      ? 'bg-[#FF7A00] text-white border-white'
                      : 'bg-white/95 text-slate-800 border-slate-300 hover:border-[#0B3C6F]'
                  }`}
                >
                  <MapPin
                    className={`w-3.5 h-3.5 shrink-0 ${
                      isSelected ? 'text-white' : 'text-[#0B3C6F]'
                    }`}
                  />
                  <span>{areaLabel}</span>
                </div>
              </button>
            );
          })}

          {/* Map Bottom Legend Bar */}
          <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-xs border border-slate-200/90 rounded-lg px-4 py-2.5 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600 shadow-xs">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-900">HQ Dispatch Hub:</span>
              <span>{ resolvePlaceholders(config.business.address, config) }</span>
            </div>
            <span className="font-mono-tabular font-semibold text-[#0B3C6F]">
              No Travel Surcharge Within 25 Miles
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

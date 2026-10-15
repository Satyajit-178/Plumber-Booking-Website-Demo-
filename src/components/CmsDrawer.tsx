import React, { useState } from 'react';
import { X, RotateCcw, Check, Copy, SlidersHorizontal } from 'lucide-react';
import {
  SiteConfig,
  formatPhoneToTel,
} from '../data/siteConfig';

interface CmsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  config: SiteConfig;
  onUpdateConfig: (next: SiteConfig) => void;
  onResetConfig: () => void;
}

type CmsTab = 'business' | 'hero' | 'services' | 'reviews';

export const CmsDrawer: React.FC<CmsDrawerProps> = ({
  isOpen,
  onClose,
  config,
  onUpdateConfig,
  onResetConfig,
}) => {
  const [activeTab, setActiveTab] = useState<CmsTab>('business');
  const [copiedJson, setCopiedJson] = useState(false);

  if (!isOpen) return null;

  const handleBusinessChange = (
    field: keyof SiteConfig['business'],
    value: string
  ) => {
    const nextBusiness = { ...config.business, [field]: value };
    if (field === 'phoneDisplay') {
      nextBusiness.phoneTel = formatPhoneToTel(value);
    }
    if (field === 'cityState') {
      const cityPart = value.split(',')[0]?.trim() || value;
      nextBusiness.city = cityPart;
    }
    onUpdateConfig({
      ...config,
      business: nextBusiness,
    });
  };

  const handleHeroChange = (field: keyof SiteConfig['hero'], value: string) => {
    onUpdateConfig({
      ...config,
      hero: {
        ...config.hero,
        [field]: value,
      },
    });
  };

  const handleServiceChange = (
    index: number,
    field: 'title' | 'description' | 'responseNote',
    value: string
  ) => {
    const updated = [...config.servicesSection.items];
    updated[index] = { ...updated[index], [field]: value };
    onUpdateConfig({
      ...config,
      servicesSection: {
        ...config.servicesSection,
        items: updated,
      },
    });
  };

  const handleReviewChange = (
    index: number,
    field: 'customerName' | 'neighborhood' | 'servicePerformed' | 'reviewText',
    value: string
  ) => {
    const updated = [...config.reviewsSection.items];
    updated[index] = { ...updated[index], [field]: value };
    onUpdateConfig({
      ...config,
      reviewsSection: {
        ...config.reviewsSection,
        items: updated,
      },
    });
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(config, null, 2));
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-label="Site Content Management System"
    >
      <div className="w-full max-w-xl bg-white h-full shadow-2xl border-l border-slate-200 flex flex-col justify-between overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-[#0B3C6F] text-white flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <SlidersHorizontal className="w-5 h-5 text-[#FF7A00] shrink-0" />
            <div>
              <h2 className="text-base font-bold leading-tight">
                Centralized Content Editor (CMS)
              </h2>
              <p className="text-xs text-slate-200">
                Edit placeholders, phone links, services &amp; images live
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close content editor"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Segmented Navigation Tabs */}
        <div className="px-6 pt-3 pb-2 bg-slate-50 border-b border-slate-200 flex items-center gap-1 overflow-x-auto">
          {(
            [
              { id: 'business', label: 'Business Info' },
              { id: 'hero', label: 'Hero & Images' },
              { id: 'services', label: '6 Services' },
              { id: 'reviews', label: 'Reviews' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-white text-[#0B3C6F] shadow-xs border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5">
          {activeTab === 'business' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-lg bg-slate-100 border border-slate-200 text-xs text-slate-700 leading-relaxed">
                Updating <strong>Business Name</strong>, <strong>Phone</strong>, or{' '}
                <strong>City / Service Area</strong> below automatically updates every
                section and <code className="font-mono-tabular">tel:</code> link on the page.
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Business Name
                  </label>
                  <input
                    type="text"
                    value={config.business.name}
                    onChange={(e) => handleBusinessChange('name', e.target.value)}
                    placeholder="e.g. Apex Plumbing Co."
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-2 focus:outline-[#0B3C6F]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Phone Number (Auto-updates tel: links)
                  </label>
                  <input
                    type="text"
                    value={config.business.phoneDisplay}
                    onChange={(e) =>
                      handleBusinessChange('phoneDisplay', e.target.value)
                    }
                    placeholder="(555) 123-4567"
                    className="w-full px-3 py-2 text-sm font-mono-tabular border border-slate-300 rounded-lg focus:outline-2 focus:outline-[#0B3C6F]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    City / Service Area
                  </label>
                  <input
                    type="text"
                    value={config.business.cityState}
                    onChange={(e) =>
                      handleBusinessChange('cityState', e.target.value)
                    }
                    placeholder="e.g. Austin, TX"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-2 focus:outline-[#0B3C6F]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    City Short Name
                  </label>
                  <input
                    type="text"
                    value={config.business.city}
                    onChange={(e) => handleBusinessChange('city', e.target.value)}
                    placeholder="e.g. Austin"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-2 focus:outline-[#0B3C6F]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tagline
                </label>
                <input
                  type="text"
                  value={config.business.tagline}
                  onChange={(e) =>
                    handleBusinessChange('tagline', e.target.value)
                  }
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-2 focus:outline-[#0B3C6F]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Dispatch Email
                  </label>
                  <input
                    type="email"
                    value={config.business.email}
                    onChange={(e) =>
                      handleBusinessChange('email', e.target.value)
                    }
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-2 focus:outline-[#0B3C6F]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    License Number Placeholder
                  </label>
                  <input
                    type="text"
                    value={config.business.licenseNumber}
                    onChange={(e) =>
                      handleBusinessChange('licenseNumber', e.target.value)
                    }
                    className="w-full px-3 py-2 text-sm font-mono-tabular border border-slate-300 rounded-lg focus:outline-2 focus:outline-[#0B3C6F]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Street Address
                </label>
                <input
                  type="text"
                  value={config.business.address}
                  onChange={(e) =>
                    handleBusinessChange('address', e.target.value)
                  }
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-2 focus:outline-[#0B3C6F]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Standard Business Hours
                </label>
                <input
                  type="text"
                  value={config.business.hoursRegular}
                  onChange={(e) =>
                    handleBusinessChange('hoursRegular', e.target.value)
                  }
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-2 focus:outline-[#0B3C6F]"
                />
              </div>
            </div>
          )}

          {activeTab === 'hero' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Hero Headline
                </label>
                <input
                  type="text"
                  value={config.hero.headline}
                  onChange={(e) => handleHeroChange('headline', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-2 focus:outline-[#0B3C6F]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Hero Subheading (Supports [City] placeholder)
                </label>
                <textarea
                  rows={2}
                  value={config.hero.subheadingTemplate}
                  onChange={(e) =>
                    handleHeroChange('subheadingTemplate', e.target.value)
                  }
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-2 focus:outline-[#0B3C6F]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Hero Primary CTA Text
                </label>
                <input
                  type="text"
                  value={config.hero.primaryCtaText}
                  onChange={(e) => handleHeroChange('primaryCtaText', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-2 focus:outline-[#0B3C6F]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Hero Background Image URL
                </label>
                <input
                  type="text"
                  value={config.hero.backgroundImage}
                  onChange={(e) =>
                    handleHeroChange('backgroundImage', e.target.value)
                  }
                  className="w-full px-3 py-2 text-xs font-mono-tabular border border-slate-300 rounded-lg focus:outline-2 focus:outline-[#0B3C6F]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Why Choose Us Feature Image URL
                </label>
                <input
                  type="text"
                  value={config.whyChooseUs.featureImage}
                  onChange={(e) =>
                    onUpdateConfig({
                      ...config,
                      whyChooseUs: {
                        ...config.whyChooseUs,
                        featureImage: e.target.value,
                      },
                    })
                  }
                  className="w-full px-3 py-2 text-xs font-mono-tabular border border-slate-300 rounded-lg focus:outline-2 focus:outline-[#0B3C6F]"
                />
              </div>
            </div>
          )}

          {activeTab === 'services' && (
            <div className="space-y-4">
              {config.servicesSection.items.map((service, idx) => (
                <div
                  key={service.id}
                  className="p-4 rounded-lg border border-slate-200 bg-slate-50/60 space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono-tabular font-bold text-[#0B3C6F]">
                      Service {service.number}
                    </span>
                    <input
                      type="text"
                      value={service.responseNote}
                      onChange={(e) =>
                        handleServiceChange(idx, 'responseNote', e.target.value)
                      }
                      className="px-2 py-1 text-xs border border-slate-300 rounded bg-white"
                      aria-label="Service response note"
                    />
                  </div>
                  <input
                    type="text"
                    value={service.title}
                    onChange={(e) =>
                      handleServiceChange(idx, 'title', e.target.value)
                    }
                    className="w-full px-3 py-1.5 text-sm font-semibold border border-slate-300 rounded-md bg-white"
                  />
                  <textarea
                    rows={2}
                    value={service.description}
                    onChange={(e) =>
                      handleServiceChange(idx, 'description', e.target.value)
                    }
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-md bg-white"
                  />
                </div>
              ))}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-4">
              {config.reviewsSection.items.map((rev, idx) => (
                <div
                  key={rev.id}
                  className="p-4 rounded-lg border border-slate-200 bg-slate-50/60 space-y-2.5"
                >
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={rev.customerName}
                      onChange={(e) =>
                        handleReviewChange(idx, 'customerName', e.target.value)
                      }
                      placeholder="Customer Name"
                      className="px-2.5 py-1.5 text-xs font-semibold border border-slate-300 rounded bg-white"
                    />
                    <input
                      type="text"
                      value={rev.neighborhood}
                      onChange={(e) =>
                        handleReviewChange(idx, 'neighborhood', e.target.value)
                      }
                      placeholder="Neighborhood"
                      className="px-2.5 py-1.5 text-xs border border-slate-300 rounded bg-white"
                    />
                  </div>
                  <input
                    type="text"
                    value={rev.servicePerformed}
                    onChange={(e) =>
                      handleReviewChange(idx, 'servicePerformed', e.target.value)
                    }
                    placeholder="Service Performed"
                    className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded bg-white"
                  />
                  <textarea
                    rows={3}
                    value={rev.reviewText}
                    onChange={(e) =>
                      handleReviewChange(idx, 'reviewText', e.target.value)
                    }
                    className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded bg-white"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onResetConfig}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-300 hover:bg-slate-100 text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Placeholders</span>
            </button>
            <button
              type="button"
              onClick={handleCopyJson}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-300 hover:bg-slate-100 text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
            >
              {copiedJson ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Copied JSON</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Config JSON</span>
                </>
              )}
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-[#FF7A00] hover:bg-[#e66e00] text-white text-xs font-bold transition-colors cursor-pointer"
          >
            Done Editing
          </button>
        </div>
      </div>
    </div>
  );
};

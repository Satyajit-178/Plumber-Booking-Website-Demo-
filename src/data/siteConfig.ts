import heroPlumberImg from '../assets/images/hero_plumber_service_1792060965059.jpg';
import waterHeaterServiceImg from '../assets/images/technician_plumbing_work_1792060965521.jpg';
import serviceVanImg from '../assets/images/service_van_residential_1792060966112.jpg';

export type PlumbingIconType =
  | 'siren'
  | 'droplet'
  | 'waves'
  | 'flame'
  | 'bath'
  | 'wrench'
  | 'clock'
  | 'shield-check'
  | 'badge-dollar'
  | 'award';

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  description: string;
  responseNote: string;
  icon: PlumbingIconType;
}

export interface BenefitItem {
  id: string;
  title: string;
  description: string;
  icon: PlumbingIconType;
}

export interface StatItem {
  id: string;
  value: string;
  label: string;
  sublabel: string;
}

export interface StepItem {
  stepNumber: string;
  title: string;
  description: string;
}

export interface ReviewItem {
  id: string;
  customerName: string;
  neighborhood: string;
  servicePerformed: string;
  rating: number;
  reviewText: string;
  timeAgo: string;
}

export interface ServiceAreaItem {
  id: string;
  name: string;
  zipCodes: string;
  etaMinutes: string;
  activeCrews: number;
  mapCoords: { x: number; y: number };
}

export interface SiteConfig {
  business: {
    name: string;
    phoneDisplay: string;
    phoneTel: string;
    city: string;
    cityState: string;
    tagline: string;
    email: string;
    address: string;
    licenseNumber: string;
    hoursRegular: string;
    hoursEmergency: string;
  };
  hero: {
    headline: string;
    subheadingTemplate: string;
    primaryCtaText: string;
    secondaryCtaText: string;
    trustBadges: string[];
    backgroundImage: string;
    backgroundAlt: string;
  };
  servicesSection: {
    kicker: string;
    heading: string;
    subheading: string;
    items: ServiceItem[];
  };
  whyChooseUs: {
    kicker: string;
    heading: string;
    subheading: string;
    featureImage: string;
    featureImageAlt: string;
    featureCaption: string;
    benefits: BenefitItem[];
    stats: StatItem[];
  };
  howItWorks: {
    kicker: string;
    heading: string;
    subheading: string;
    steps: StepItem[];
  };
  reviewsSection: {
    kicker: string;
    heading: string;
    subheading: string;
    items: ReviewItem[];
  };
  serviceAreasSection: {
    kicker: string;
    heading: string;
    subheading: string;
    dispatchImage: string;
    dispatchImageAlt: string;
    areas: ServiceAreaItem[];
  };
  finalCta: {
    heading: string;
    subheading: string;
    buttonText: string;
  };
}

/**
 * CENTRALIZED CONTENT MANAGEMENT SYSTEM (CMS)
 * Edit any business details, headlines, phone numbers, services, reviews, or images below.
 * Changes automatically propagate across the entire website, including all tel: links.
 */
export const DEFAULT_SITE_CONFIG: SiteConfig = {
  business: {
    name: '[Business Name]',
    phoneDisplay: '(555) 123-4567',
    phoneTel: '5551234567',
    city: '[City]',
    cityState: '[City, State]',
    tagline: 'Fast, Reliable Plumbing You Can Trust',
    email: 'dispatch@localplumbingpro.com',
    address: '742 Copper Pipe Way, Suite 100, [City, State]',
    licenseNumber: 'State Master Plumber License #MP-84920',
    hoursRegular: 'Mon – Sat: 7:00 AM – 8:00 PM',
    hoursEmergency: '24/7 Emergency Dispatch Available 365 Days',
  },
  hero: {
    headline: 'Plumbing Problems? We Fix Them Fast.',
    subheadingTemplate: '24/7 emergency service in [City]. Licensed, insured, and upfront pricing.',
    primaryCtaText: 'Call Now',
    secondaryCtaText: 'Get a Free Quote',
    trustBadges: [
      'Licensed & Insured',
      '24/7 Emergency Service',
      'Free Estimates',
    ],
    backgroundImage: heroPlumberImg,
    backgroundAlt: 'Licensed master plumber inspecting residential copper piping under kitchen sink',
  },
  servicesSection: {
    kicker: 'Full-Service Residential & Commercial Plumbing',
    heading: 'Professional Plumbing Services Built to Last',
    subheading: 'From midnight burst pipes to high-efficiency water heater upgrades, our stocked service vans arrive ready to solve the problem on the first visit.',
    items: [
      {
        id: 'emergency-plumbing',
        number: '01',
        title: 'Emergency Plumbing',
        description: 'Rapid 24/7 dispatch for burst pipes, severe backups, overflowing toilets, and main water shut-off failures.',
        responseNote: 'On-site in under 60 mins',
        icon: 'siren',
      },
      {
        id: 'leak-detection',
        number: '02',
        title: 'Leak Detection & Repair',
        description: 'Non-invasive acoustic and thermal leak pinpointing behind walls, under slabs, and in supply lines.',
        responseNote: 'Upfront flat-rate repair',
        icon: 'droplet',
      },
      {
        id: 'drain-cleaning',
        number: '03',
        title: 'Drain Cleaning',
        description: 'Complete rooter and hydro-jetting clearing for stubborn kitchen sinks, shower drains, and main sewer lines.',
        responseNote: 'Includes camera inspection',
        icon: 'waves',
      },
      {
        id: 'water-heaters',
        number: '04',
        title: 'Water Heater Installation & Repair',
        description: 'Same-day repair and replacement for gas, electric, and high-efficiency tankless water heaters.',
        responseNote: '6- to 12-year tank warranties',
        icon: 'flame',
      },
      {
        id: 'bathroom-kitchen',
        number: '05',
        title: 'Bathroom & Kitchen Plumbing',
        description: 'Precision installation and repair for faucets, garbage disposals, toilets, shower valves, and supply lines.',
        responseNote: 'Code-compliant workmanship',
        icon: 'bath',
      },
      {
        id: 'pipe-repair',
        number: '06',
        title: 'Pipe Repair & Replacement',
        description: 'Durable copper and PEX repiping for corroded lines, low water pressure, and freeze-damaged plumbing.',
        responseNote: 'Written lifetime PEX warranty',
        icon: 'wrench',
      },
    ],
  },
  whyChooseUs: {
    kicker: 'The Local Standard for Honest Work',
    heading: 'Why Homeowners in [City, State] Choose Us',
    subheading: 'We treat your home with respect—wearing shoe covers, laying down drop cloths, and giving you the exact total price before we turn a wrench.',
    featureImage: waterHeaterServiceImg,
    featureImageAlt: 'Licensed plumbing technician inspecting pressure gauge on tankless water heater',
    featureCaption: 'Every technician is state-licensed, background-checked, and arrives in a fully stocked dispatch vehicle.',
    benefits: [
      {
        id: 'fast-response',
        title: 'Fast Response Time',
        description: 'Local GPS-dispatched trucks stationed across [City, State] ensure rapid arrival when every minute counts.',
        icon: 'clock',
      },
      {
        id: 'upfront-pricing',
        title: 'Upfront Pricing',
        description: 'Written flat-rate quotes approved by you before work begins—zero hidden overtime fees or surprise charges.',
        icon: 'badge-dollar',
      },
      {
        id: 'licensed-pros',
        title: 'Licensed Professionals',
        description: 'Uniformed, state-certified master and journeyman plumbers with full liability and workers’ compensation coverage.',
        icon: 'shield-check',
      },
      {
        id: 'satisfaction-guaranteed',
        title: 'Satisfaction Guaranteed',
        description: 'All parts and labor are backed by our written 100% workmanship guarantee so you have total peace of mind.',
        icon: 'award',
      },
    ],
    stats: [
      {
        id: 'stat-exp',
        value: '10+ Years',
        label: 'Experience',
        sublabel: 'Serving [City, State] homes & businesses since 2015',
      },
      {
        id: 'stat-jobs',
        value: '5,000+',
        label: 'Jobs Done',
        sublabel: 'Completed residential & commercial service calls',
      },
      {
        id: 'stat-rating',
        value: '4.9★',
        label: 'Rating',
        sublabel: 'Verified average across 640+ local homeowner reviews',
      },
    ],
  },
  howItWorks: {
    kicker: 'Simple, Stress-Free Process',
    heading: 'How It Works in 3 Easy Steps',
    subheading: 'No waiting around in 6-hour windows or guessing what the bill will be.',
    steps: [
      {
        stepNumber: '01',
        title: 'Call or Request a Quote',
        description: 'Call our 24/7 local dispatch line or submit our 60-second quote form. We confirm your appointment right away.',
      },
      {
        stepNumber: '02',
        title: 'We Arrive On Time',
        description: 'Your licensed plumber arrives on schedule, diagnoses the issue thoroughly, and provides an upfront written price.',
      },
      {
        stepNumber: '03',
        title: 'Problem Fixed Right',
        description: 'We complete the repair using commercial-grade parts, test your system, and leave the workspace spotless.',
      },
    ],
  },
  reviewsSection: {
    kicker: 'Verified Homeowner Feedback',
    heading: 'Trusted by Your Neighbors in [City, State]',
    subheading: 'Real reviews from local homeowners who called us for urgent repairs and routine upgrades.',
    items: [
      {
        id: 'review-1',
        customerName: 'Sarah M.',
        neighborhood: 'Downtown [City]',
        servicePerformed: 'Emergency Main Line Shut-Off & Pipe Repair',
        rating: 5,
        reviewText: 'Our basement supply pipe burst at 10:30 PM on a Sunday. They answered on the second ring, arrived in 35 minutes, and gave us a fair flat price before starting. Saved our flooring from major water damage.',
        timeAgo: '2 weeks ago',
      },
      {
        id: 'review-2',
        customerName: 'David K.',
        neighborhood: 'Oak Creek',
        servicePerformed: '50-Gallon Water Heater Replacement',
        rating: 5,
        reviewText: 'Quoted me $400 less than the big national franchise and installed our new water heater the very same afternoon. Clean work, wore boot covers the whole time, and hauled away the old tank.',
        timeAgo: '1 month ago',
      },
      {
        id: 'review-3',
        customerName: 'Elena R.',
        neighborhood: 'Westwood Hills',
        servicePerformed: 'Kitchen Drain Hydro-Jetting & Leak Repair',
        rating: 5,
        reviewText: 'Super honest plumber. Instead of pushing an expensive full replacement, he showed me the worn valve under the sink, fixed the leak and cleared our slow drain in under an hour. Highly recommend!',
        timeAgo: '3 weeks ago',
      },
    ],
  },
  serviceAreasSection: {
    kicker: 'Local Dispatch Coverage',
    heading: 'Proudly Serving [City, State] & Surrounding Communities',
    subheading: 'Select any neighborhood below to inspect our local dispatch coverage, ZIP codes served, and typical arrival window.',
    dispatchImage: serviceVanImg,
    dispatchImageAlt: 'Local plumbing service van parked in residential neighborhood',
    areas: [
      {
        id: 'downtown',
        name: 'Downtown [City]',
        zipCodes: '10001, 10002, 10004',
        etaMinutes: '20 – 35 mins',
        activeCrews: 3,
        mapCoords: { x: 50, y: 48 },
      },
      {
        id: 'northside',
        name: 'Northside Heights',
        zipCodes: '10011, 10012',
        etaMinutes: '25 – 40 mins',
        activeCrews: 2,
        mapCoords: { x: 48, y: 24 },
      },
      {
        id: 'oak-creek',
        name: 'Oak Creek',
        zipCodes: '10018, 10019',
        etaMinutes: '25 – 35 mins',
        activeCrews: 2,
        mapCoords: { x: 72, y: 34 },
      },
      {
        id: 'westwood-hills',
        name: 'Westwood Hills',
        zipCodes: '10024, 10025',
        etaMinutes: '30 – 45 mins',
        activeCrews: 2,
        mapCoords: { x: 26, y: 42 },
      },
      {
        id: 'riverside',
        name: 'Riverside District',
        zipCodes: '10028, 10029',
        etaMinutes: '20 – 35 mins',
        activeCrews: 2,
        mapCoords: { x: 64, y: 66 },
      },
      {
        id: 'maple-grove',
        name: 'Maple Grove',
        zipCodes: '10032, 10033',
        etaMinutes: '30 – 45 mins',
        activeCrews: 1,
        mapCoords: { x: 32, y: 70 },
      },
      {
        id: 'cedar-park',
        name: 'Cedar Park',
        zipCodes: '10036, 10038',
        etaMinutes: '25 – 40 mins',
        activeCrews: 2,
        mapCoords: { x: 78, y: 56 },
      },
      {
        id: 'southgate',
        name: 'Southgate Meadows',
        zipCodes: '10040, 10041',
        etaMinutes: '35 – 50 mins',
        activeCrews: 1,
        mapCoords: { x: 52, y: 78 },
      },
    ],
  },
  finalCta: {
    heading: 'Have a Plumbing Emergency? Call Us Now',
    subheading: 'Live local dispatchers are standing by 24/7 in [City, State]. Upfront pricing with no surprise fees.',
    buttonText: 'Call Now',
  },
};

export function resolvePlaceholders(text: string, config: SiteConfig): string {
  return text
    .replace(/\[Business Name\]/g, config.business.name)
    .replace(/\[City, State\]/g, config.business.cityState)
    .replace(/\[City\]/g, config.business.city);
}

export function formatPhoneToTel(phone: string): string {
  const digits = phone.replace(/[^\d+]/g, '');
  return digits || '5551234567';
}

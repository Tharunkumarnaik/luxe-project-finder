import living from '@/assets/living-room.jpg';
import villa from '@/assets/villa.jpg';
import kitchen from '@/assets/kitchen.jpg';

/**
 * EDITABLE: initial suggested locations. Set `verified: true` and `projects` only
 * when confirmed by Architectique Interiors' project records.
 */
export type Region = 'Andhra Pradesh' | 'Telangana' | 'Karnataka' | 'Tamil Nadu';
export type ProjectLocation = { id: string; city: string; state: Region; lon: number; lat: number; hub?: boolean; verified: boolean; projects?: number; description: string };

export const projectLocations: ProjectLocation[] = [
  { id: 'hyderabad', city: 'Hyderabad', state: 'Telangana', lon: 78.49, lat: 17.39, hub: true, verified: false, description: 'Major project hub for residential and commercial interiors.' },
  { id: 'visakhapatnam', city: 'Visakhapatnam', state: 'Andhra Pradesh', lon: 83.22, lat: 17.69, hub: true, verified: false, description: 'Major coastal project region in Andhra Pradesh.' },
  { id: 'vijayawada', city: 'Vijayawada', state: 'Andhra Pradesh', lon: 80.65, lat: 16.51, verified: false, description: 'Homes and workspaces along the Krishna region.' },
  { id: 'guntur', city: 'Guntur', state: 'Andhra Pradesh', lon: 80.44, lat: 16.31, verified: false, description: 'Residential interiors and modular solutions.' },
  { id: 'nellore', city: 'Nellore', state: 'Andhra Pradesh', lon: 79.99, lat: 14.44, hub: true, verified: true, description: 'Our studio home, at BV Nagar, Nellore.' },
  { id: 'tirupati', city: 'Tirupati', state: 'Andhra Pradesh', lon: 79.42, lat: 13.63, verified: false, description: 'Residential and pooja room design.' },
  { id: 'bengaluru', city: 'Bengaluru', state: 'Karnataka', lon: 77.59, lat: 12.97, hub: true, verified: false, description: 'Major project hub for apartments, villas and offices.' },
  { id: 'mysuru', city: 'Mysuru', state: 'Karnataka', lon: 76.64, lat: 12.3, verified: false, description: 'Residential interiors with a timeless character.' },
  { id: 'chennai', city: 'Chennai', state: 'Tamil Nadu', lon: 80.27, lat: 13.08, verified: false, description: 'Contemporary homes and commercial spaces.' },
];

export const locationFilters = ['All Locations', 'Major Project Hubs', 'Andhra Pradesh', 'Telangana', 'Karnataka', 'Other South Indian Locations'] as const;
export type LocationFilter = (typeof locationFilters)[number];

export function filterLocations(filter: LocationFilter, list = projectLocations) {
  if (filter === 'All Locations') return list;
  if (filter === 'Major Project Hubs') return list.filter(l => l.hub);
  if (filter === 'Other South Indian Locations') return list.filter(l => !['Andhra Pradesh', 'Telangana', 'Karnataka'].includes(l.state));
  return list.filter(l => l.state === filter);
}

export const regionCards: { title: string; description: string; image: string; filter: LocationFilter }[] = [
  { title: 'Hyderabad', description: 'Major project hub in Telangana.', image: villa, filter: 'Telangana' },
  { title: 'Andhra Pradesh', description: 'Projects across cities and locations in Andhra Pradesh.', image: living, filter: 'Andhra Pradesh' },
  { title: 'Bengaluru', description: 'Design expertise across Karnataka.', image: kitchen, filter: 'Karnataka' },
];

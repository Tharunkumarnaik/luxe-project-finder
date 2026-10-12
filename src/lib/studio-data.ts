import living from '@/assets/living-room.jpg';
import villa from '@/assets/villa.jpg';
import kitchen from '@/assets/kitchen.jpg';
import bedroom from '@/assets/bedroom.jpg';
export const images = { living, villa, kitchen, bedroom };
export const phone = '08511090263';
export const address = 'Near By, 1st Floor, YPR Towers, Near SBI Bank, BV Nagar, Mini Bypass Road, BV Nagar, Nellore – 524004, Andhra Pradesh, India.';
export const services = [
{slug:'residential-interiors',title:'Residential Interior Design',short:'Spaces that feel distinctly yours.',description:'Create a home that reflects your lifestyle and personal taste. Our residential design solutions focus on comfort, thoughtful layouts, cohesive materials, and carefully considered details.',image:living,items:['Living room design','Bedroom design','Complete home interiors','Apartment and villa interiors','Furniture and storage planning']},
{slug:'commercial-interiors',title:'Commercial Interior Design',short:'Purposeful spaces. Lasting impressions.',description:'Create professional environments that support productivity, reflect your brand, and make a positive impression on employees, clients, and visitors.',image:villa,items:['Office space design','Reception and waiting areas','Workstations and meeting rooms','Commercial space planning','Lighting and feature walls']},
{slug:'hospitality-design',title:'Hospitality & Restaurant Design',short:'An atmosphere worth returning to.',description:'Design inviting hospitality environments with considered layouts, atmosphere, lighting, and materials.',image:bedroom,items:['Restaurant and café interiors','Dining space planning','Guest-facing spaces','Decorative lighting','Furniture and materials']},
{slug:'architecture',title:'Architecture Services',short:'Considered from the very first line.',description:'Explore architectural solutions that bring together spatial organisation, design intent, and practical project considerations. Regulated services are subject to applicable professional requirements.',image:villa,items:['House and villa design concepts','Elevation concepts','Architectural space planning','Renovation concepts','Design coordination']},
{slug:'construction-management',title:'Construction Management',short:'Bringing every detail together.',description:'Coordinate project planning and execution requirements with a focus on design alignment, communication, and site-level considerations. Scope depends on the service agreement.',image:villa,items:['Construction coordination','Site inspections','Execution planning','Material coordination','Project progress reviews']},
{slug:'modular-kitchens',title:'Modular Kitchens & Wardrobes',short:'Beautifully organised. Effortlessly lived.',description:'Make everyday living more organised with customised storage solutions and thoughtfully planned kitchen layouts.',image:kitchen,items:['Modular kitchen design','Kitchen storage planning','Wardrobe design','Built-in cabinetry','Material and finish selection']},
{slug:'false-ceilings-lighting',title:'False Ceilings & Lighting',short:'A new perspective on every room.',description:'Shape the mood and character of a space with considered lighting, ceiling details, and architectural accents.',image:living,items:['False ceiling design','Ambient and task lighting','Cove lighting concepts','Decorative lighting','Lighting layout planning']},
{slug:'wall-design',title:'Walls & Decorative Art',short:'Character in every surface.',description:'Add depth and personality through carefully considered wall treatments and decorative finishes.',image:bedroom,items:['Feature walls','Artwork and painted finishes','Mural art','Decorative panels','Interior styling']},
{slug:'pooja-room-design',title:'Pooja Room Design',short:'A quiet space for reflection.',description:'Create a dedicated space for prayer and reflection with thoughtful layouts, appropriate materials, storage, lighting, and traditional or contemporary detailing.',image:living,items:['Traditional pooja room design','Contemporary mandir concepts','Marble and wood finishes','Compact pooja units','Custom storage']},
{slug:'tv-units',title:'TV Units & Custom Furniture',short:'Designed to belong.',description:'Create practical and visually cohesive focal points with custom TV units, entertainment walls, and furniture solutions.',image:living,items:['Entertainment walls','Floating cabinetry','Storage integration','Decorative back panels','Custom furniture planning']},
];
export const styles = [
{name:'Modern Minimalist',description:'Simple forms, uncluttered layouts, neutral colours, and purposeful furniture for a calm and sophisticated look.',image:living},
{name:'Contemporary Luxury',description:'Refined finishes, layered lighting, rich textures, elegant furniture, and premium visual details.',image:bedroom},
{name:'Traditional Indian',description:'Warm wood, classic motifs, traditional details, decorative craftsmanship, and timeless character.',image:kitchen},
{name:'Scandinavian',description:'Light wood, natural light, soft colours, functional furniture, and a clean, welcoming atmosphere.',image:living},
{name:'Industrial',description:'Concrete textures, metal accents, exposed materials, statement lighting, and a distinctive urban aesthetic.',image:kitchen},
{name:'Bohemian & Earthy',description:'Earthy colours, natural materials, plants, layered fabrics, and expressive decorative details.',image:bedroom},
{name:'Contemporary Indian',description:'Modern layouts paired with Indian-inspired details, warm materials, and thoughtful craftsmanship.',image:villa},
{name:'Hotel-Inspired Luxury',description:'Layered textiles, soft lighting, elegant furniture, balanced compositions, and a relaxing premium atmosphere.',image:bedroom},
];
export const projects = [
{slug:'contemporary-living',title:'Contemporary living',category:'Residential',style:'Modern Minimalist',image:living,description:'An exploration of natural light, generous proportions, and warm materials.'},
{slug:'tropical-villa',title:'The tropical villa concept',category:'Architecture',style:'Contemporary Indian',image:villa,description:'Sculptural lines and tropical greenery in a considered residential concept.'},
{slug:'warm-minimal-kitchen',title:'The warm minimal kitchen',category:'Kitchens',style:'Modern Minimalist',image:kitchen,description:'Natural stone and walnut come together in an uncluttered kitchen concept.'},
{slug:'quiet-bedroom',title:'A quiet retreat',category:'Bedrooms',style:'Hotel-Inspired Luxury',image:bedroom,description:'Layered textures and a restrained palette create an inviting bedroom concept.'},
];
export const process = ['Consultation & requirements','Site visit & space planning','Design concept & development','Project planning & coordination','Execution & handover'];
export const faq = [
['What services does Architectique Interiors offer?','We offer residential and commercial interiors, space planning, modular kitchens, wardrobes, lighting, false ceilings, architecture-related services, and construction management, depending on the agreed scope.'],
['Can I select my preferred interior design style?','Yes. Select one or more styles on our Design Styles page and include them with your project enquiry.'],
['Do you design modular kitchens and wardrobes?','Yes. We explore customised layouts, storage, cabinetry, and finishes suited to your space.'],
['Can I request a site inspection?','Please share your location and project requirements. Site visits are discussed according to scope and availability.'],
['How much does an interior design project cost?','Costs depend on space, design requirements, materials, finishes, and execution scope. Submit an enquiry for a project-specific discussion.'],
['Do you serve locations outside Nellore?','Services across South India are subject to project location, scope, and availability.'],
['How can I request a consultation?','Complete the project enquiry or call 08511090263 to discuss the next steps.'],
];
export function pageHead(title:string,description:string) {return {meta:[{title:`${title} | Architectique Interiors`},{name:'description',content:description},{property:'og:title',content:`${title} | Architectique Interiors`},{property:'og:description',content:description},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]};}

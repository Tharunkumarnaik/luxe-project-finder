import { z } from 'zod';
export const enquirySchema = z.object({
full_name:z.string().trim().min(2,'Please enter your full name.').max(100),
phone:z.string().trim().regex(/^\+?[0-9 ()-]{10,20}$/,'Please enter a valid phone number.'),
email:z.union([z.literal(''),z.string().trim().email('Please enter a valid email.')]).default(''),
project_type:z.string().min(1,'Please choose a project type.').max(100),
location:z.string().trim().min(2,'Please enter your project location.').max(200),
preferred_styles:z.array(z.string().max(100)).max(8).default([]),selected_services:z.array(z.string().max(100)).max(10).default([]),preferred_rooms:z.array(z.string().max(100)).max(9).default([]),
budget:z.string().max(100).default(''),timeline:z.string().max(100).default(''),message:z.string().trim().max(3000).default(''),consent:z.boolean().refine(v=>v,'Please agree to be contacted about this enquiry.'),
});
export type Enquiry = z.infer<typeof enquirySchema>;

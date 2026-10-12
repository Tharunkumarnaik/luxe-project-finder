import {describe,it,expect} from 'vitest';
import {enquirySchema} from '@/lib/enquiry-schema';
const valid={full_name:'Test Visitor',phone:'9876543210',project_type:'Villa',location:'Nellore',consent:true};
describe('Enquiry requirements',()=>{
it('requires permission to contact the visitor',()=>{expect(enquirySchema.safeParse({...valid,consent:false}).success).toBe(false)});
it('allows an optional email',()=>{expect(enquirySchema.safeParse({...valid,email:''}).success).toBe(true)});
it('supports multiple preferred styles',()=>{expect(enquirySchema.parse({...valid,preferred_styles:['Modern Minimalist','Contemporary Indian']}).preferred_styles).toEqual(['Modern Minimalist','Contemporary Indian'])});
it('rejects a missing phone number',()=>{expect(enquirySchema.safeParse({...valid,phone:''}).success).toBe(false)});
it('requires project location',()=>{expect(enquirySchema.safeParse({...valid,location:''}).success).toBe(false)});
});

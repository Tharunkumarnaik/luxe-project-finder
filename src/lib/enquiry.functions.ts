import {createServerFn} from '@tanstack/react-start';
import {createClient} from '@supabase/supabase-js';
import {enquirySchema} from './enquiry-schema';
import type {Database} from '@/integrations/supabase/types';
export const submitEnquiry=createServerFn({method:'POST'}).inputValidator((data:unknown)=>enquirySchema.parse(data)).handler(async({data})=>{
const key=process.env['SUPABASE_PUBLISHABLE_KEY'];const url=process.env['SUPABASE_URL'];
if(!key||!url) throw new Error('Enquiries are temporarily unavailable. Please call 08511090263.');
const client=createClient<Database>(url,key,{auth:{persistSession:false,autoRefreshToken:false},global:{fetch:(input,init)=>{const headers=new Headers(init?.headers);if(key.startsWith('sb_'))headers.delete('Authorization');headers.set('apikey',key);return fetch(input,{...init,headers});}}});
const {error}=await client.from('enquiries').insert(data);
if(error)throw new Error('Your enquiry could not be saved. Please try again or call 08511090263.');
return {success:true};
});

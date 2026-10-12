import {createFileRoute} from '@tanstack/react-router';
import {PageIntro,ServiceCards,FAQ} from '@/components/studio/common';
import {pageHead} from '@/lib/studio-data';
export const Route=createFileRoute('/services/')({head:()=>pageHead('Our Design Services','Explore residential and commercial interior design, architecture, construction management, modular kitchens, lighting and more.'),component:Services});
function Services(){return <><PageIntro eyebrow="OUR EXPERTISE" title={<>Complete design solutions.<br/><em>For every space.</em></>} description="From architectural planning to the finishing details, explore thoughtful services tailored to your lifestyle, space, and project requirements."/><section className="section content-section"><div className="container"><ServiceCards/></div></section><FAQ/></>}

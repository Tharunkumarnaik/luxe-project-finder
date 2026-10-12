import {createFileRoute} from '@tanstack/react-router';
import {PageIntro} from '@/components/studio/common';
import {ProjectGallery} from '@/components/studio/gallery';
import {pageHead} from '@/lib/studio-data';
export const Route=createFileRoute('/projects/')({head:()=>pageHead('Design Inspiration','Explore illustrative interior and architectural concepts for residential, commercial and hospitality spaces.'),component:Projects});
function Projects(){return <><PageIntro eyebrow="DESIGN INSPIRATION" title={<>Spaces designed<br/><em>with purpose.</em></>} description="Explore interior and architectural inspiration. These generated concept images illustrate design possibilities and are not Architectique Interiors' completed client projects."/><section className="section content-section"><div className="container"><ProjectGallery/></div></section></>}

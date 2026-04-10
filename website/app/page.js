import Navbar           from '@/components/Navbar';
import Hero             from '@/components/Hero';
import SocialProof      from '@/components/SocialProof';
import PreRecordedDemo  from '@/components/PreRecordedDemo';
import Services         from '@/components/Services';
import Timeline         from '@/components/Timeline';
import LiveDemo         from '@/components/LiveDemo';
import LeadCapture      from '@/components/LeadCapture';
import Contact          from '@/components/Contact';
import Footer           from '@/components/Footer';

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Navbar />
      <Hero />
      <SocialProof />
      <PreRecordedDemo />
      <Services />
      <Timeline />
      <LiveDemo />
      <LeadCapture />
      <Contact />
      <Footer />
    </main>
  );
}

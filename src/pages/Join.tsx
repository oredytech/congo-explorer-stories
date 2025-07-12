
import { useTranslation } from 'react-i18next';
import Layout from '@/components/Layout';
import VolunteerProtocolSection from '@/components/join/VolunteerProtocolSection';
import MissionSection from '@/components/join/MissionSection';
import BenefitsSection from '@/components/join/BenefitsSection';
import ResponsibilitiesSection from '@/components/join/ResponsibilitiesSection';
import VolunteerApplicationForm from '@/components/join/VolunteerApplicationForm';
import TestimonialsSection from '@/components/join/TestimonialsSection';

const Join = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <div className="py-8 md:py-16 bg-gradient-to-br from-congo-beige/30 to-white min-h-screen">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-3xl md:text-4xl font-bold text-congo-brown mb-4 px-4">
              {t('join.title')}
            </h1>
            <p className="text-base md:text-lg text-congo-brown/80 max-w-3xl mx-auto px-4 leading-relaxed">
              {t('join.subtitle')}
            </p>
          </div>

          {/* Protocole d'Accord Section */}
          <div className="mb-12 md:mb-16">
            <VolunteerProtocolSection />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 xl:gap-12 items-start">
            {/* Left Column - Information */}
            <div className="space-y-6 md:space-y-8 order-2 lg:order-1">
              {/* Mission */}
              <MissionSection />

              {/* Benefits */}
              <BenefitsSection />

              {/* Responsibilities */}
              <ResponsibilitiesSection />
            </div>

            {/* Right Column - Form */}
            <div className="lg:sticky lg:top-8 order-1 lg:order-2">
              <VolunteerApplicationForm />
            </div>
          </div>

          {/* Success Stories */}
          <div className="mt-12 md:mt-16">
            <TestimonialsSection />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Join;

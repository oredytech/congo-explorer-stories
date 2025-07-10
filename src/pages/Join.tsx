
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
      <div className="py-16 bg-gradient-to-br from-congo-beige/50 to-white min-h-screen">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-congo-brown mb-4">
              {t('join.title')}
            </h1>
            <p className="text-lg text-congo-brown/80 max-w-3xl mx-auto">
              {t('join.subtitle')}
            </p>
          </div>

          {/* Protocole d'Accord Section */}
          <div className="mb-16">
            <VolunteerProtocolSection />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-12 items-start">
            {/* Left Column - Information */}
            <div className="space-y-8">
              {/* Mission */}
              <MissionSection />

              {/* Benefits */}
              <BenefitsSection />

              {/* Responsibilities */}
              <ResponsibilitiesSection />
            </div>

            {/* Right Column - Form */}
            <div className="lg:sticky lg:top-8">
              <VolunteerApplicationForm />
            </div>
          </div>

          {/* Success Stories */}
          <div className="mt-16">
            <TestimonialsSection />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Join;

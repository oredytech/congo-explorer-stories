
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Users, Heart, Lightbulb, Shield, Award } from 'lucide-react';

const VolunteerProtocolSection = () => {
  const { t } = useTranslation();

  const requirements = [
    t('join.protocol.requirements.0'),
    t('join.protocol.requirements.1'),
    t('join.protocol.requirements.2'),
    t('join.protocol.requirements.3')
  ];

  const expectations = [
    t('join.protocol.expectations.0'),
    t('join.protocol.expectations.1'),
    t('join.protocol.expectations.2'),
    t('join.protocol.expectations.3')
  ];

  const guidelines = [
    t('join.protocol.guidelines.0'),
    t('join.protocol.guidelines.1'),
    t('join.protocol.guidelines.2'),
    t('join.protocol.guidelines.3')
  ];

  const values = [
    { icon: Heart, title: t('join.protocol.values.respect.title'), description: t('join.protocol.values.respect.description') },
    { icon: Users, title: t('join.protocol.values.collaboration.title'), description: t('join.protocol.values.collaboration.description') },
    { icon: Lightbulb, title: t('join.protocol.values.innovation.title'), description: t('join.protocol.values.innovation.description') },
    { icon: Shield, title: t('join.protocol.values.integrity.title'), description: t('join.protocol.values.integrity.description') }
  ];

  const benefits = [
    t('join.protocol.benefits.0'),
    t('join.protocol.benefits.1'),
    t('join.protocol.benefits.2'),
    t('join.protocol.benefits.3'),
    t('join.protocol.benefits.4')
  ];

  const support = [
    t('join.protocol.support.0'),
    t('join.protocol.support.1'),
    t('join.protocol.support.2'),
    t('join.protocol.support.3')
  ];

  return (
    <section className="py-16 bg-congo-beige/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-congo-brown mb-4">
            {t('join.protocol.title')}
          </h2>
          <p className="text-lg text-congo-brown/70 max-w-3xl mx-auto">
            {t('join.protocol.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card className="border-congo-brown/20">
            <CardHeader>
              <CardTitle className="flex items-center text-congo-brown">
                <CheckCircle className="h-6 w-6 mr-2 text-congo-green" />
                {t('join.protocol.requirements.title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-2 h-2 bg-congo-green rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-congo-brown/80">{requirement}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-congo-brown/20">
            <CardHeader>
              <CardTitle className="flex items-center text-congo-brown">
                <Award className="h-6 w-6 mr-2 text-congo-green" />
                {t('join.protocol.expectations.title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {expectations.map((expectation, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-2 h-2 bg-congo-green rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-congo-brown/80">{expectation}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Values Section */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-congo-brown mb-8 text-center">
            {t('join.protocol.values.title')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <Card key={index} className="text-center border-congo-brown/20 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <IconComponent className="h-12 w-12 text-congo-green mx-auto mb-4" />
                    <h4 className="font-semibold text-congo-brown mb-2">{value.title}</h4>
                    <p className="text-congo-brown/70 text-sm">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Guidelines and Benefits */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="border-congo-brown/20">
            <CardHeader>
              <CardTitle className="text-congo-brown">{t('join.protocol.guidelines.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {guidelines.map((guideline, index) => (
                  <li key={index} className="flex items-start">
                    <Badge variant="outline" className="mr-2 mt-0.5 text-xs bg-congo-green/10 text-congo-green border-congo-green/20">
                      {index + 1}
                    </Badge>
                    <span className="text-congo-brown/80">{guideline}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="border-congo-brown/20">
              <CardHeader>
                <CardTitle className="text-congo-brown">{t('join.protocol.benefits.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-congo-green mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-congo-brown/80">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-congo-brown/20">
              <CardHeader>
                <CardTitle className="text-congo-brown">{t('join.protocol.support.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {support.map((supportItem, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 bg-congo-green rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-congo-brown/80">{supportItem}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VolunteerProtocolSection;

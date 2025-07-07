
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const VolunteerProtocolSection = () => {
  const { t } = useTranslation();

  const handleProtocolClick = () => {
    // Scroll to top of the page to show the protocol section
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="mb-16">
      <Card className="border-congo-brown/20 bg-white">
        <CardHeader>
          <CardTitle className="text-congo-brown text-2xl text-center">
            {t('join.protocolTitle')}
          </CardTitle>
          <CardDescription className="text-congo-brown text-center">
            {t('join.protocolSubtitle')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-congo-brown mb-2 flex items-center">
                  📍 {t('join.protocolSections.object')}
                </h3>
                <p className="text-congo-brown text-sm">
                  {t('join.protocolSections.objectText')}
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-congo-brown mb-2 flex items-center">
                  👤 {t('join.protocolSections.status')}
                </h3>
                <ul className="text-congo-brown text-sm space-y-1">
                  {t('join.protocolSections.statusItems', { returnObjects: true }).map((item: string, index: number) => (
                    <li key={index}>• {item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-congo-brown mb-2 flex items-center">
                  📸 {t('join.protocolSections.contributions')}
                </h3>
                <ul className="text-congo-brown text-sm space-y-1">
                  {t('join.protocolSections.contributionsItems', { returnObjects: true }).map((item: string, index: number) => (
                    <li key={index}>• {item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-congo-brown mb-2 flex items-center">
                  📤 {t('join.protocolSections.publication')}
                </h3>
                <ul className="text-congo-brown text-sm space-y-1">
                  {t('join.protocolSections.publicationItems', { returnObjects: true }).map((item: string, index: number) => (
                    <li key={index}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-congo-brown mb-2 flex items-center">
                  ⚖️ {t('join.protocolSections.rights')}
                </h3>
                <ul className="text-congo-brown text-sm space-y-1">
                  {t('join.protocolSections.rightsItems', { returnObjects: true }).map((item: string, index: number) => (
                    <li key={index}>• {item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-congo-brown mb-2 flex items-center">
                  ⚠️ {t('join.protocolSections.responsibility')}
                </h3>
                <ul className="text-congo-brown text-sm space-y-1">
                  {t('join.protocolSections.responsibilityItems', { returnObjects: true }).map((item: string, index: number) => (
                    <li key={index}>• {item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-congo-brown mb-2 flex items-center">
                  ✅ {t('join.protocolSections.duration')}
                </h3>
                <ul className="text-congo-brown text-sm space-y-1">
                  {t('join.protocolSections.durationItems', { returnObjects: true }).map((item: string, index: number) => (
                    <li key={index}>• {item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-congo-brown mb-2 flex items-center">
                  📝 {t('join.protocolSections.acceptance')}
                </h3>
                <p className="text-congo-brown text-sm">
                  {t('join.protocolSections.acceptanceText')}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-congo-green/10 p-4 rounded-lg border border-congo-green/20">
            <div className="flex items-center space-x-2 mb-2">
              <CheckCircle className="h-5 w-5 text-congo-green" />
              <span className="font-semibold text-congo-brown">{t('join.acceptanceRequired')}</span>
            </div>
            <p className="text-congo-brown text-sm">
              {t('join.acceptanceNote')}
            </p>
          </div>

          <div className="text-center">
            <Button 
              variant="outline" 
              className="border-congo-brown/30 text-congo-brown hover:bg-congo-brown/10"
              onClick={handleProtocolClick}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              {t('join.rereadProtocol')}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VolunteerProtocolSection;

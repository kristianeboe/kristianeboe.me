import { SmartLink } from "@/components/ui/smart-link";

export const dynamic = "force-static";

export default function PrivacyPage() {
  return (
    <div>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-[37.5rem] pt-20 pb-24 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-base leading-7 text-slate-600">
            Last updated January 2026
          </p>
        </div>
      </div>
      <div className="prose lg:prose-xl mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h2>1. Introduction</h2>
        <p>
          We respect your privacy and are committed to protecting your personal
          data. This privacy policy explains how we collect, use, disclose, and
          safeguard your information when you use our services.
        </p>

        <h2>2. Information We Collect</h2>
        <h3>Information You Provide</h3>
        <ul>
          <li>Account information (email, name, password)</li>
          <li>Profile information</li>
          <li>Payment information</li>
          <li>Communications with us</li>
        </ul>

        <h3>Information Collected Automatically</h3>
        <ul>
          <li>Device information (browser type, operating system)</li>
          <li>Usage information (pages visited, features used)</li>
          <li>IP address and location data</li>
          <li>Cookies and similar tracking technologies</li>
        </ul>

        <h2>3. How We Use Your Information</h2>
        <p>We use your information to:</p>
        <ul>
          <li>Provide and maintain our services</li>
          <li>Process transactions and send notifications</li>
          <li>Improve and personalize user experience</li>
          <li>Communicate with you about updates and offers</li>
          <li>Prevent fraud and ensure security</li>
          <li>Comply with legal obligations</li>
        </ul>

        <h2>4. How We Share Your Information</h2>
        <p>We may share your information with:</p>
        <ul>
          <li>Service providers who assist in operating our platform</li>
          <li>Payment processors for transaction handling</li>
          <li>Analytics providers to understand usage patterns</li>
          <li>Law enforcement when required by law</li>
        </ul>
        <p>We do not sell your personal information to third parties.</p>

        <h2>5. Data Security</h2>
        <p>
          We implement appropriate technical and organizational measures to
          protect your personal data. However, no method of transmission over
          the internet is 100% secure, and we cannot guarantee absolute
          security.
        </p>

        <h2>6. Data Retention</h2>
        <p>
          We retain your personal information only for as long as necessary to
          fulfill the purposes outlined in this policy or as required by law.
        </p>

        <h2>7. Your Privacy Rights</h2>
        <p>Depending on your location, you may have the right to:</p>
        <ul>
          <li>Access your personal data</li>
          <li>Correct inaccurate data</li>
          <li>Request deletion of your data</li>
          <li>Object to processing of your data</li>
          <li>Request data portability</li>
          <li>Withdraw consent</li>
        </ul>

        <h2>8. Cookies and Tracking</h2>
        <p>
          We use cookies and similar tracking technologies to improve your
          experience. You can control cookies through your browser settings.
        </p>

        <h2>9. Third-Party Links</h2>
        <p>
          Our services may contain links to third-party websites. We are not
          responsible for the privacy practices of these external sites.
        </p>

        <h2>10. Children&apos;s Privacy</h2>
        <p>
          Our services are not intended for children under 13 (or 16 in certain
          jurisdictions). We do not knowingly collect personal information from
          children.
        </p>

        <h2>11. International Data Transfers</h2>
        <p>
          Your information may be transferred to and processed in countries
          other than your own. We ensure appropriate safeguards are in place for
          such transfers.
        </p>

        <h2>12. Changes to This Privacy Policy</h2>
        <p>
          We may update this privacy policy from time to time. We will notify
          you of material changes by email or through our website. Your
          continued use after changes take effect constitutes acceptance.
        </p>

        <h2>13. Contact Us</h2>
        <p>
          For questions about this privacy policy or our data practices, please
          contact us at{" "}
          <SmartLink href="mailto:privacy@example.com">
            privacy@example.com
          </SmartLink>
        </p>

        <p className="mt-8 text-sm text-gray-600">
          This Privacy Policy was last updated in January 2026.
        </p>
      </div>
    </div>
  );
}

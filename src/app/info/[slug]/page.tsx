import React from 'react';
import { notFound } from 'next/navigation';
import styles from './page.module.css';
import { Metadata } from 'next';

const INFO_PAGES: Record<string, { title: string; subtitle: string; content: { title: string; text: string }[] }> = {
  'about-us': {
    title: 'ABOUT US',
    subtitle: 'Independent journalism for a world in motion.',
    content: [
      { title: 'Our Mission', text: 'To provide accurate, unbiased, and comprehensive news coverage that empowers our readers to make informed decisions. We believe that a well-informed public is the cornerstone of a functioning democracy.' },
      { title: 'Our Vision', text: 'To be the most trusted source of independent journalism globally, setting the standard for integrity and editorial excellence.' },
      { title: 'Our History', text: 'Founded in a small office with a big idea, Financial Outlook has grown into a leading digital publication. We have continually adapted to the changing media landscape while remaining true to our core values.' },
      { title: 'Our Team', text: 'Our newsroom comprises award-winning journalists, editors, and researchers dedicated to uncovering the truth. We operate with a strict separation between our editorial and business operations.' }
    ]
  },
  'authors': {
    title: 'OUR AUTHORS',
    subtitle: 'The voices behind our journalism.',
    content: [
      { title: 'Editorial Independence', text: 'Our authors operate with complete editorial independence. They are free to pursue stories without interference from management or advertisers.' },
      { title: 'Diversity of Thought', text: 'We believe that a diverse newsroom leads to better journalism. We actively seek out writers from a wide range of backgrounds and perspectives.' },
      { title: 'Accountability', text: 'Our authors are held to the highest ethical standards. We take all complaints seriously and investigate them thoroughly.' }
    ]
  },
  'contact-us': {
    title: 'CONTACT US',
    subtitle: 'We welcome your feedback and inquiries.',
    content: [
      { title: 'General Inquiries', text: 'For general questions, please email info@financialoutlook.com or call our main office at +1 (555) 0123-4567.' },
      { title: 'Newsroom', text: 'To send a tip or contact the newsroom, email tips@financialoutlook.com. We offer secure methods for confidential communication.' },
      { title: 'Advertising', text: 'For advertising inquiries, please contact our commercial team at ads@financialoutlook.com.' },
      { title: 'Mailing Address', text: 'Financial Outlook Media\n100 Editorial Way, Suite 400\nNew York, NY 10001' }
    ]
  },
  'ownership-funding': {
    title: 'OWNERSHIP & FUNDING',
    subtitle: 'Transparency in how we operate.',
    content: [
      { title: 'Ownership Structure', text: 'Financial Outlook is an independent media organization, wholly owned by the Financial Outlook Foundation, a non-profit entity dedicated to sustaining independent journalism.' },
      { title: 'Funding Sources', text: 'Our operations are funded through a combination of reader subscriptions, philanthropic grants, and advertising revenue. No single donor or advertiser accounts for more than 5% of our total budget.' },
      { title: 'Financial Independence', text: 'We maintain a strict firewall between our revenue operations and our newsroom. Advertisers and donors have no say in our editorial coverage.' }
    ]
  },
  'editorial-policy': {
    title: 'EDITORIAL POLICY',
    subtitle: 'Our approach to journalism.',
    content: [
      { title: 'Independence', text: 'We are fiercely independent. We do not align with any political party, corporate interest, or advocacy group.' },
      { title: 'Verification', text: 'Accuracy is paramount. All factual claims are rigorously verified before publication. We prefer primary sources and corroborating evidence.' },
      { title: 'Corrections', text: 'When we make a mistake, we correct it promptly and transparently. We do not quietly alter articles to hide errors.' },
      { title: 'Transparency', text: 'We aim to be as transparent as possible about our methods and our motives. When appropriate, we explain how we reported a story.' }
    ]
  },
  'corrections-policy': {
    title: 'CORRECTIONS POLICY',
    subtitle: 'How we address our mistakes.',
    content: [
      { title: 'Prompt Action', text: 'We strive to correct errors of fact as quickly as possible. Once verified, corrections are appended to the original article.' },
      { title: 'Transparency', text: 'Corrections will clearly state what was wrong and provide the accurate information. We do not use euphemisms for mistakes.' },
      { title: 'Significant Errors', text: 'In cases of significant reporting failures, we will publish a separate editor\'s note explaining how the failure occurred and the steps taken to prevent a recurrence.' },
      { title: 'Reporting Errors', text: 'Readers who spot a potential error should email corrections@financialoutlook.com.' }
    ]
  },
  'source-methodology': {
    title: 'SOURCE METHODOLOGY',
    subtitle: 'How we gather information.',
    content: [
      { title: 'Primary Sources', text: 'We rely on primary sources whenever possible: official documents, direct interviews, and firsthand observation.' },
      { title: 'Anonymous Sources', text: 'We grant anonymity only when absolutely necessary to protect a source from retaliation and when the information they provide is crucial and cannot be obtained elsewhere.' },
      { title: 'Verification', text: 'We attempt to independently verify information provided by any source, particularly anonymous ones. We do not publish unsubstantiated rumors.' },
      { title: 'Attribution', text: 'We attribute information to its source as clearly as possible, so readers can assess its credibility.' }
    ]
  },
  'right-of-reply': {
    title: 'RIGHT OF REPLY',
    subtitle: 'Ensuring fairness in our reporting.',
    content: [
      { title: 'Fair Opportunity', text: 'Individuals or organizations facing significant criticism in our reporting will be given a fair opportunity to respond before publication.' },
      { title: 'Reasonable Timeframe', text: 'We will provide a reasonable timeframe for a response, depending on the complexity of the allegations and the urgency of the story.' },
      { title: 'Publication of Responses', text: 'Responses will be summarized or quoted fairly within the article. In some cases, we may publish a full written response separately.' }
    ]
  },
  'privacy-policy': {
    title: 'PRIVACY POLICY',
    subtitle: 'How we protect your data.',
    content: [
      { title: 'Data Collection', text: 'We collect data necessary to provide and improve our services, process subscriptions, and communicate with you.' },
      { title: 'Data Usage', text: 'Your data is used solely for stated purposes. We do not sell your personal information to third parties.' },
      { title: 'Cookies', text: 'We use cookies to enhance your browsing experience and analyze site traffic. You can manage your cookie preferences in your browser settings.' },
      { title: 'Security', text: 'We employ industry-standard security measures to protect your data from unauthorized access or disclosure.' }
    ]
  },
  'terms-conditions': {
    title: 'TERMS & CONDITIONS',
    subtitle: 'Rules for using our platform.',
    content: [
      { title: 'Acceptance', text: 'By using this website, you agree to these terms and conditions. If you do not agree, please do not use the site.' },
      { title: 'Intellectual Property', text: 'All content on this site is the property of Financial Outlook or its licensors and is protected by copyright laws.' },
      { title: 'User Conduct', text: 'You agree to use the site only for lawful purposes and in a manner that does not infringe on the rights of others.' },
      { title: 'Modifications', text: 'We reserve the right to modify these terms at any time. Continued use of the site constitutes acceptance of the modified terms.' }
    ]
  },
  'advertising-policy': {
    title: 'ADVERTISING POLICY',
    subtitle: 'Our guidelines for commercial content.',
    content: [
      { title: 'Clear Distinction', text: 'We maintain a clear distinction between editorial content and advertising. Advertisements will always be clearly labeled.' },
      { title: 'No Endorsement', text: 'The publication of an advertisement does not constitute an endorsement by Financial Outlook.' },
      { title: 'Acceptability', text: 'We reserve the right to reject any advertisement that we deem inappropriate, misleading, or contrary to our values.' },
      { title: 'Sponsored Content', text: 'Sponsored content will be explicitly marked as such and is produced independently of our newsroom.' }
    ]
  },
  'legal': {
    title: 'LEGAL',
    subtitle: 'Legal information and disclaimers.',
    content: [
      { title: 'Disclaimer of Warranties', text: 'This site is provided "as is" without any representations or warranties, express or implied.' },
      { title: 'Limitation of Liability', text: 'Financial Outlook will not be liable for any damages arising from the use of this site or the information it contains.' },
      { title: 'Governing Law', text: 'These terms are governed by the laws of the jurisdiction in which Financial Outlook is headquartered.' },
      { title: 'Contact', text: 'For legal inquiries, please contact legal@financialoutlook.com.' }
    ]
  }
};

export async function generateStaticParams() {
  return Object.keys(INFO_PAGES).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const data = INFO_PAGES[slug];
  
  if (!data) return { title: 'Page Not Found' };
  
  return {
    title: `${data.title} | Financial Outlook`,
    description: data.subtitle,
  };
}

export default async function InfoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = INFO_PAGES[slug];

  if (!data) {
    notFound();
  }

  // Generate a two-digit section number based on the index in the keys
  const pageIndex = Object.keys(INFO_PAGES).indexOf(slug);
  const pageNumber = (pageIndex + 1).toString().padStart(2, '0');

  return (
    <div className={styles.infoPage}>
      <div className={styles.container}>
        <div className={styles.layout}>
          
          <aside className={styles.sidebar}>
            <div className={styles.stickyNav}>
              <div className={styles.pageNumber}>{pageNumber}</div>
              <h1 className={styles.pageTitle}>{data.title}</h1>
              <p className={styles.pageSubtitle}>{data.subtitle}</p>
              
              <div className={styles.divider}></div>
              
              <ul className={styles.toc}>
                {data.content.map((section, index) => (
                  <li key={index}>
                    <a href={`#section-${index}`} className={styles.tocLink}>
                      <span className={styles.tocNumber}>{(index + 1).toString().padStart(2, '0')}</span>
                      <span>{section.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <main className={styles.content}>
            <div className={styles.documentBody}>
              {data.content.map((section, index) => (
                <section key={index} id={`section-${index}`} className={styles.section}>
                  <div className={styles.sectionMeta}>
                    <span className={styles.sectionNumber}>{(index + 1).toString().padStart(2, '0')}</span>
                  </div>
                  <div className={styles.sectionText}>
                    <h2 className={styles.sectionHeading}>{section.title}</h2>
                    <p className={styles.sectionParagraph}>{section.text}</p>
                  </div>
                </section>
              ))}
              
              <div className={styles.endMark}>
                <span className={styles.endLogo}>Financial Outlook</span>
                <p>Updated 2026</p>
              </div>
            </div>
          </main>
          
        </div>
      </div>
    </div>
  );
}

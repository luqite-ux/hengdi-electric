export type Certificate = {
  title: string
  group: 'Business Qualifications' | 'Management Systems' | 'Product Certification & Testing' | 'Enterprise Recognition'
  image: string
  scope: string
  orientation?: 'clockwise'
}

export const certificates: Certificate[] = [
  { title: 'Business License', group: 'Business Qualifications', image: '/catalog/certificates/business-license-1.png', scope: 'Corporate registration document supplied in the company catalog.', orientation: 'clockwise' },
  { title: 'Additional Business License Record', group: 'Business Qualifications', image: '/catalog/certificates/business-license-2.png', scope: 'Additional corporate registration material supplied by the company.', orientation: 'clockwise' },
  { title: 'Environmental Management System', group: 'Management Systems', image: '/catalog/certificates/environment-management.png', scope: 'Management-system certificate; validity and detailed scope should be checked on the document.' },
  { title: 'Quality Management System', group: 'Management Systems', image: '/catalog/certificates/quality-management.png', scope: 'Quality management certificate shown in the supplied catalog.' },
  { title: 'Occupational Health & Safety Management', group: 'Management Systems', image: '/catalog/certificates/occupational-health.png', scope: 'Occupational health and safety management-system certificate.' },
  { title: 'China Compulsory Certification', group: 'Product Certification & Testing', image: '/catalog/certificates/ccc-certificate.png', scope: 'Product certification applies only to the models and scope stated on the certificate.' },
  { title: 'Busbar Trunking Type Test Report', group: 'Product Certification & Testing', image: '/catalog/certificates/busbar-type-test-report.png', scope: 'Type-test evidence for the busbar product identified in the report.' },
  { title: 'Product Inspection Report', group: 'Product Certification & Testing', image: '/catalog/certificates/inspection-report.png', scope: 'Inspection evidence applies to the sampled product and conditions identified in the report.' },
  { title: 'Enterprise Credit Recognition', group: 'Enterprise Recognition', image: '/catalog/certificates/credit-enterprise.png', scope: 'Enterprise recognition material supplied in the catalog; not a product-performance certificate.' },
]

export const certificateGroups = ['Business Qualifications', 'Management Systems', 'Product Certification & Testing', 'Enterprise Recognition'] as const

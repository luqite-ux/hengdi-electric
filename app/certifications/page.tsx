import { CertificateGallery } from '@/components/certificate-gallery'
import { PageHeader } from '@/components/page-header'
import { certificates, certificateGroups } from '@/lib/certifications'
import { buildPageMetadata } from '@/lib/seo'

export const metadata = buildPageMetadata({ title: 'Certifications', description: 'Review corporate qualifications, management-system certificates, product certification and test materials supplied by Hengdi Electric.', path: '/certifications' })

export default function CertificationsPage() {
  return (
    <main className="bg-gradient-mesh">
      <PageHeader eyebrow="Document Archive" title="Certifications & Test Materials" description="Documents are grouped by purpose. Product certificates and reports apply only to the models and scope stated on each document." breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Certifications' }]} />
      <div className="mx-auto max-w-7xl space-y-16 px-4 py-20 sm:px-6 lg:px-8">
        {certificateGroups.map((group) => {
          const groupCertificates = certificates.filter((certificate) => certificate.group === group)
          return <section key={group}><h2 className="mb-7 text-3xl font-bold text-foreground">{group}</h2><CertificateGallery certificates={groupCertificates} /></section>
        })}
      </div>
    </main>
  )
}

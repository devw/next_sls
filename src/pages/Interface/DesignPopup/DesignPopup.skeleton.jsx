import React from 'react';
import { Layout, SkeletonDisplayText, SkeletonBodyText, Card } from '@shopify/polaris';

const Skeleton = () => (
  <Layout.AnnotatedSection
    title={<SkeletonDisplayText size="large" />}
    description={<SkeletonBodyText lines={5} />}
  >
    <Card>
      <Card.Section title={<SkeletonBodyText />}>
        <SkeletonBodyText lines={5} />
      </Card.Section>
      <Card.Section title={<SkeletonBodyText />}>
        <SkeletonBodyText lines={5} />
      </Card.Section>
      <Card.Section title={<SkeletonBodyText />}>
        <SkeletonBodyText lines={5} />
      </Card.Section>
    </Card>
  </Layout.AnnotatedSection>
)

export default Skeleton;
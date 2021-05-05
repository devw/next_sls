import React from 'react';

import { Card, Layout, FormLayout, SkeletonDisplayText, SkeletonBodyText } from '@shopify/polaris';

export default function Skeleton() {

  return (
    <Layout>
      <Layout.AnnotatedSection
        title={<SkeletonDisplayText size="medium" />}
        description={<SkeletonBodyText lines={3} />}
      >
      <Card sectioned>
        <FormLayout>
          <div style={{marginBottom: 40}}>
            <div style={{marginBottom: 20}}>
              <SkeletonDisplayText size="small" />
            </div>
            <SkeletonBodyText lines={3} />
          </div>

          <div style={{marginBottom: 40}}>
            <div style={{marginBottom: 20}}>
              <SkeletonDisplayText size="small" />
            </div>
            <SkeletonBodyText lines={3} />
          </div>

          <div>
            <div style={{marginBottom: 20}}>
              <SkeletonDisplayText size="small" />
            </div>
            <SkeletonBodyText lines={3} />
          </div>
        </FormLayout>
      </Card>
      </Layout.AnnotatedSection>
    </Layout>
  )
}
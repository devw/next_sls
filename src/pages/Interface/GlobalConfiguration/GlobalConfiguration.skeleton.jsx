import React from 'react';

import { Card, Layout, FormLayout, SkeletonDisplayText, SkeletonBodyText } from '@shopify/polaris';

const GlobalConfigurationSkeleton = () => {

  return (
    <Layout>
      <Layout.AnnotatedSection
        title={<SkeletonDisplayText size="medium" />}
        description={<SkeletonBodyText lines={4} />}
      >
      <Card sectioned>
        <FormLayout>
          <div style={{marginBottom: 40}}>
            <div style={{marginBottom: 20}}>
              <SkeletonDisplayText size="small" />
            </div>
            <SkeletonBodyText lines={2} />
          </div>

          <div style={{marginBottom: 40}}>
            <div style={{marginBottom: 20}}>
              <SkeletonDisplayText size="small" />
            </div>
            <SkeletonBodyText lines={5} />
          </div>

          <div>
            <div style={{marginBottom: 20}}>
              <SkeletonDisplayText size="small" />
            </div>
            <SkeletonBodyText lines={1} />
          </div>
        </FormLayout>
      </Card>
      </Layout.AnnotatedSection>
    </Layout>
  )
}

export default GlobalConfigurationSkeleton;
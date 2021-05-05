import React from 'react';
import { EmptyState } from '@shopify/polaris'

const DefaultRestrictedView = () => (
  <div>
    <EmptyState
      heading="You doesn't have access"
      action={{content: 'Upgrade', url: '/plans'}}
      image="https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg"
    >
      <p>This section is restricted, you need to upgrade your account first.</p>
    </EmptyState>
  </div>
)

export default DefaultRestrictedView;
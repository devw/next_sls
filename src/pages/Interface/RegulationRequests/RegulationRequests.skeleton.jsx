import React from 'react';

import { DataTable, SkeletonBodyText, SkeletonDisplayText, Stack, Button } from '@shopify/polaris';

const RegulationRequestsSkeleton = () => {

  const rows = [
    [<SkeletonBodyText lines={1} />, <SkeletonBodyText lines={1} />, <SkeletonBodyText lines={1} />, <SkeletonBodyText lines={1} />],
    [<SkeletonBodyText lines={1} />, <SkeletonBodyText lines={1} />, <SkeletonBodyText lines={1} />, <SkeletonBodyText lines={1} />],
    [<SkeletonBodyText lines={1} />, <SkeletonBodyText lines={1} />, <SkeletonBodyText lines={1} />, <SkeletonBodyText lines={1} />],
    [<SkeletonBodyText lines={1} />, <SkeletonBodyText lines={1} />, <SkeletonBodyText lines={1} />, <SkeletonBodyText lines={1} />],
    [<SkeletonBodyText lines={1} />, <SkeletonBodyText lines={1} />, <SkeletonBodyText lines={1} />, <SkeletonBodyText lines={1} />],
    [<SkeletonBodyText lines={1} />, <SkeletonBodyText lines={1} />, <SkeletonBodyText lines={1} />, <SkeletonBodyText lines={1} />],
    [<SkeletonBodyText lines={1} />, <SkeletonBodyText lines={1} />, <SkeletonBodyText lines={1} />, <SkeletonBodyText lines={1} />],
    [<SkeletonBodyText lines={1} />, <SkeletonBodyText lines={1} />, <SkeletonBodyText lines={1} />, <SkeletonBodyText lines={1} />]
  ];

  return (
    <DataTable
      columnContentTypes={[
        'text',
        'text',
        'text',
        'text'
      ]}
      headings={[
        <SkeletonDisplayText size="small" />,
        <SkeletonDisplayText size="small" />,
        <SkeletonDisplayText size="small" />,
        <SkeletonDisplayText size="small" />
      ]}
      rows={rows}
      footerContent={
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <div> Showing up to 15 results per page</div>
          <div>
            <Stack spacing="tight">
              <Button disabled={true}>Previous</Button>
              <Button disabled={true}>Next</Button>
            </Stack>
          </div>
        </div>
      }
    />
  )
}

export default RegulationRequestsSkeleton;
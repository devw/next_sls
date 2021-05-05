import React, { useState, useCallback } from 'react';
import { ResourcePicker } from '@shopify/app-bridge-react';
import { Button } from '@shopify/polaris';

const _ResourcePicker = ({ setSelection }) => {
  const [active, setActive] = useState(false);

  const handleResourcePickerClose = useCallback(() => setActive(false), []);

  const handleSelection = useCallback(
    ({selection}) => {
      setSelection(selection);
      console.log('Selected products: ', selection);
      handleResourcePickerClose();
    },
    [handleResourcePickerClose],
  );

  return (
    <React.Fragment>
      <Button onClick={() => setActive(true)}>Sélectionner des produits</Button>

      <ResourcePicker
        resourceType="Product"
        open={active}
        onSelection={handleSelection}
        onCancel={handleResourcePickerClose}
      />
    </React.Fragment>
  )
}

export default _ResourcePicker;
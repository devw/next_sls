import { useContext, useEffect, useState } from 'react'
import { Context as ShopifyContext, Loading } from '@shopify/app-bridge-react'
import { ContextualSaveBar } from '@shopify/app-bridge/actions'
import useContextualSaveBar from '@hooks/useContextualSaveBar.hook'

const SaveBar = ({ showBar, showSaveLoading, disableSave, save, discard }) => {
  const options = {
    saveAction: {
      disabled: disableSave,
      loading: showSaveLoading,
    },
    discardAction: {
      disabled: false,
      loading: false,
      discardConfirmationModal: true,
    },
  };

  const [saveBar] = useState(ContextualSaveBar.create(useContext(ShopifyContext), options));
  saveBar.set(options, true);

  const [onSave, onDiscard] = useContextualSaveBar(save, discard);

  useEffect(() => {
    const saveUnsub = saveBar.subscribe(
      ContextualSaveBar.Action.SAVE,
      onSave
    );

    const discardUnsub = saveBar.subscribe(
      ContextualSaveBar.Action.DISCARD,
      onDiscard
    );

    return () => {
      saveUnsub();
      discardUnsub();
    };
  }, []);

  showBar
    ? saveBar.dispatch(ContextualSaveBar.Action.SHOW)
    : saveBar.dispatch(ContextualSaveBar.Action.HIDE);

  return showSaveLoading
    ? <Loading />
    : null;
}

export default SaveBar

// Exported from:
// https://community.shopify.com/c/Shopify-APIs-SDKs/Contextual-Save-Bar-React-component/td-p/651224
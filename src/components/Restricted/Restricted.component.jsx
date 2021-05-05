import React, { useContext } from 'react';
import DefaultRestrictedView from './DefaultRestrictedView/DefaultRestrictedView.component';
import { UserContext } from '@contexts/User/User.context';

export default function Restricted({ children, authorizedPlans = [], restrictedView }) {

  const { plan } = useContext(UserContext);
  const isRestricted = authorizedPlans.includes(plan.id)

  return (
    <>
      {isRestricted ? (
        <>
          {restrictedView || <DefaultRestrictedView />}
        </>
      ) : children}
    </>
  )
}
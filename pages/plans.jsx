import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Plans from '@pages/Plans/Plans.page'
import { plans } from '@utils/Plans.utils'

export default function PlansWrapper() {
  return <Plans plans={plans} />
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...await serverSideTranslations(locale, ['common'])
    }, 
  }
}
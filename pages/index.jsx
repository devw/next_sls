import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Interface from '@pages/Interface/Interface.page'
import axios from 'axios'
import DomParser from 'dom-parser'

export default function Index({ faq }) {
  return <Interface faq={faq} />
}

async function getCrispArticleContent(url) {
  const parser = new DomParser()
  const response = await axios.get(url)
  
  const dom = parser.parseFromString(response.data)
  const articleHTML = dom.getElementsByClassName('csh-article-content-text')[0].innerHTML

  return articleHTML
}

export async function getStaticProps({ locale }) {  
  return {
    props: {
      ...await serverSideTranslations(locale, ['common']),
      faq: {
        'faq-1': await getCrispArticleContent('https://alfred-apps.crisp.help/en/article/how-to-setup-a-cookiebot-account-9jrco7/'),
        'faq-2': await getCrispArticleContent('https://alfred-apps.crisp.help/en/article/what-is-domain-group-id-from-1cpa4jd/'),
        'faq-3': await getCrispArticleContent('https://alfred-apps.crisp.help/en/article/what-is-the-cookiebot-cookie-scanner-17xodt3/'),
        'faq-4': await getCrispArticleContent('https://alfred-apps.crisp.help/en/article/how-to-declare-custom-cookies-13fqre4/'),
        'faq-5': await getCrispArticleContent('https://alfred-apps.crisp.help/en/article/how-does-the-cookie-banner-actually-work-on-the-website-16h6xro/'),
        'faq-regulation-1': await getCrispArticleContent('https://alfred-apps.crisp.help/en/article/question-1-data-privacy-request-7kuhn0/?bust=1619717141481'),
        'faq-regulation-2': await getCrispArticleContent('https://alfred-apps.crisp.help/en/article/question-2-data-privacy-request-g80gfg/?bust=1619717279250'),
        'faq-regulation-3': await getCrispArticleContent('https://alfred-apps.crisp.help/en/article/question-3-data-privacy-request-1tkr2rx/?bust=1619717327238'),
        'faq-deletion-1': await getCrispArticleContent('https://alfred-apps.crisp.help/en/article/question-1-deletion-request-1ef4f6u/?bust=1619717373123'),
        'faq-deletion-2': await getCrispArticleContent('https://alfred-apps.crisp.help/en/article/question-2-deletion-request-194l0gu/?bust=1619717391011'),
        'faq-deletion-3': await getCrispArticleContent('https://alfred-apps.crisp.help/en/article/question3-deletion-request-1xilzez/?bust=1619717405559'),
      }
    }, 
  }
}
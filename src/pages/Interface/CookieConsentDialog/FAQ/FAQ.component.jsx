import AccordionFAQ from '@components/AccordionFAQ/AccordionFAQ.component';
import styles from './FAQ.module.css'

export default function FAQ({ contents }) {

  return (
    <div className={styles.container}>
      <AccordionFAQ title="How to setup a cookiebot account ?">
        <div dangerouslySetInnerHTML={{__html: contents['faq-1']}} />
      </AccordionFAQ>

      <AccordionFAQ title="Where to get the Domain Group ID from?">
        <div dangerouslySetInnerHTML={{__html: contents['faq-2']}} />
      </AccordionFAQ>

      <AccordionFAQ title="What is the Cookiebot cookie scanner?">
        <div dangerouslySetInnerHTML={{__html: contents['faq-3']}} />
      </AccordionFAQ>

      <AccordionFAQ title="How to declare custom cookies?">
        <div dangerouslySetInnerHTML={{__html: contents['faq-4']}} />
      </AccordionFAQ>

      <AccordionFAQ title="How does the cookie banner actually work on the website?">
        <div dangerouslySetInnerHTML={{__html: contents['faq-5']}} />
      </AccordionFAQ>
    </div>   
  )
}
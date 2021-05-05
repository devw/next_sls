import React, { useEffect, useState, useCallback } from 'react';
import { DataTable, Stack, Button, EmptyState, Checkbox, Layout } from '@shopify/polaris';
import { cdn } from '@utils/Global.utils'
import Skeleton from './RegulationRequests.skeleton';
import AccordionFAQ from '@components/AccordionFAQ/AccordionFAQ.component'
import { useTranslation } from 'next-i18next'
import API from '@utils/API.utils'
import _ from 'lodash';

const EmptyRequests = () => {
  const { t } = useTranslation('common')
  const heading = t('RegulationRequests.emptyState.title')
  const description = t('RegulationRequests.emptyState.description')

  return (
    <div style={{display: 'flex', alignItems: 'center', padding: 100}}>
      <div style={{width: '50%'}}>
        <img
          src={`${cdn}/images/undraw_no-data.svg`}
          style={{width: 220}}
        />
      </div>
      
      <div style={{width: '50%'}}>
        <EmptyState
          heading={heading}
          imageContained
          image=""
        >
          <p>{description}</p>
        </EmptyState>
      </div>
    </div>
  )
}

const CheckboxComponent = (props) => {
  const [checked, setChecked] = useState(props.checked);
  const handleChange = useCallback((newChecked) => {
    API.updateRequest(props.id, newChecked);
    return setChecked(newChecked)
  }, []);

  return (
    <Checkbox
      label=""
      checked={checked}
      onChange={handleChange}
  />
  );
}

export default function RegulationRequests({ faqContents }) {

  console.log(faqContents)

  const { t } = useTranslation('common')

  const [loaded, setLoaded] = useState(false);
  const [rows, setRows] = useState([]);

  const [currentPage, setCurrentPage] = useState(0);
  const [pagesData, setPagesData] = useState([]);
  const [lastKey, setLastKey] = useState(null);

  const formatRequests = (items) => {
    if (!items) return [];
    
    let formattedRequests = [];

    items.map(r => {
      formattedRequests.push([
        r.shopify_customer_email,
        r.request_type,
        r.user_ip,
        r.fulfillments.length > 0 ? "Yes" : "No",
        (new Date(r.create_timestamp)).toLocaleDateString('fr', {
          day: 'numeric', // numeric, 2-digit
          year: 'numeric', // numeric, 2-digit
          month: 'long', // numeric, 2-digit, long, 
      }),
        <CheckboxComponent checked={r.treated} id={r.request_id}/>
      ])
    })

    return formattedRequests;
  }

  const next = useCallback(async () => {
    if (!pagesData[currentPage + 1]) {
      const { items, lastEvaluatedKey } = await API.getRegulationRequests(lastKey);
      const formattedRequests = formatRequests(items);
  
      let _pagesData = _.cloneDeep(pagesData);
      _pagesData[currentPage + 1] = formattedRequests;
  
      setRows(formattedRequests);
      setCurrentPage(currentPage + 1);
      setPagesData(_pagesData);
      setLastKey(lastEvaluatedKey);
    } else {
      setRows(pagesData[currentPage + 1]);
      setCurrentPage(currentPage + 1);
    }
  }, [currentPage, pagesData, lastKey]);

  const previous = useCallback(async () => {
    setRows(pagesData[currentPage - 1]);
    setCurrentPage(currentPage - 1);
  }, [currentPage]);

  useEffect(() => {
    let isCancelled = false;
    const fetchData = async () => {
      const { items, lastEvaluatedKey } = await API.getRegulationRequests();
      const formattedRequests = formatRequests(items);
  
      let _pagesData = [];
      _pagesData.push(formattedRequests);

      if (!isCancelled) {
        setRows(formattedRequests);
        setPagesData(_pagesData);
        setLastKey(lastEvaluatedKey);
  
        setLoaded(true);
      }
    }

    fetchData();

    return () => {
      isCancelled = true;
    };
  }, []);

  if (!loaded) {
    return <Skeleton />
  }

  return (
    <Layout>
      {rows.length > 1 ? (
        <Layout.Section>
          <DataTable
            columnContentTypes={[
              'text',
              'text',
              'text',
              'text'
            ]}
            headings={[
              'Email',
              'Type',
              'IP Address',
              'Fulfilled',
              'Creation date',
              'Done ?'
            ]}
            rows={rows}
            footerContent={
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <div>{t('RegulationRequests.resultsPerPage')}</div>
                <div>
                  <Stack spacing="tight">
                    <Button onClick={previous} disabled={!pagesData[currentPage - 1]}>{t('Actions.previous')}</Button>
                    <Button onClick={next} disabled={!lastKey}>{t('Actions.next')}</Button>
                  </Stack>
                </div>
              </div>
            }
          />
        </Layout.Section>
      ) : (
        <EmptyRequests />
      )}

      <Layout.Section>
        <AccordionFAQ title="How to declare custom cookies?">
          <div dangerouslySetInnerHTML={{__html: faqContents['faq-regulation-1']}} />
        </AccordionFAQ>
        <AccordionFAQ title="How to declare custom cookies?">
          <div dangerouslySetInnerHTML={{__html: faqContents['faq-regulation-2']}} />
        </AccordionFAQ>
        <AccordionFAQ title="How to declare custom cookies?">
          <div dangerouslySetInnerHTML={{__html: faqContents['faq-regulation-3']}} />
        </AccordionFAQ>
      </Layout.Section>
    </Layout>
  )
}

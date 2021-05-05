import React, { useEffect, useState, useCallback } from 'react';
import { DataTable, Stack, Button, EmptyState, Layout, Checkbox } from '@shopify/polaris';
import AccordionFAQ from '@components/AccordionFAQ/AccordionFAQ.component'
import Skeleton from './DeletionRequests.skeleton';
import { useTranslation } from 'next-i18next'
import API from '@utils/API.utils'

const EmptyRequests = () => {
  const { t } = useTranslation('common')

  return (
    <div style={{display: 'flex', alignItems: 'center', padding: 100}}>
      <div style={{width: '50%'}}>
        <img
          src="https://kastor-applications-assets.s3.amazonaws.com/images/undraw_no-data.svg"
          style={{width: 220}}
        />
      </div>
      
      <div style={{width: '50%'}}>
        <EmptyState
          heading={t('DeletionRequests.emptyState.title')}
          imageContained
        >
          <p>{t('DeletionRequests.emptyState.description')}</p>
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

export default function DeletionRequests({ faqContents }) {

  const { t } = useTranslation('common')

  const [loaded, setLoaded] = useState(false);
  const [rows, setRows] = useState([]);

  const [currentPage, setCurrentPage] = useState(0);
  const [pagesData, setPagesData] = useState([]);
  const [lastKey, setLastKey] = useState(null);

  const markRequestTreated = (requestId) => {

  }

  const formatRequests = (items) => {
    if (!items) return [];

    let formattedRequests = [];

    items.map(r => {
      formattedRequests.push([
        r.shopify_customer_email,
        r.user_ip,
        (new Date(r.create_timestamp)).toLocaleDateString('us', {
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
      const { items, lastEvaluatedKey } = await API.getDeletionRequests(lastKey);
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
      const { items, lastEvaluatedKey } = await API.getDeletionRequests();
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
  }, [])

  if (!loaded) {
    return <Skeleton />
  }
  
  return (
    <Layout>
      {(rows.length > 1) ? (
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
              'IP Address',
              'Creation date',
              'Done ?'
            ]}
            rows={rows}
            footerContent={
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <div>{t('DeletionRequests.resultsPerPage')}</div>
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
          <div dangerouslySetInnerHTML={{__html: faqContents['faq-deletion-1']}} />
        </AccordionFAQ>
        <AccordionFAQ title="How to declare custom cookies?">
          <div dangerouslySetInnerHTML={{__html: faqContents['faq-deletion-2']}} />
        </AccordionFAQ>
        <AccordionFAQ title="How to declare custom cookies?">
          <div dangerouslySetInnerHTML={{__html: faqContents['faq-deletion-3']}} />
        </AccordionFAQ>
      </Layout.Section>
    </Layout>
  )
}

import { createContext, useCallback, useEffect, useState } from 'react'
import { useAppBridge } from '@shopify/app-bridge-react'
import { getConfigurationData, updateConfigurationData } from './Configuration.utils'
import Notifier from '@utils/Notifier.utils';
import _ from 'lodash'

export const ConfigurationContext = createContext({
  configuration: {},
})

export const ConfigurationProvider = ({ children }) => {
  const app = useAppBridge()
  const notifier = new Notifier(app)
  const [initialConfiguration, setInitialConfiguration] = useState({})
  const [configuration, setConfiguration] = useState({})
  const [saving, setSaving] = useState(false)

  const edited = JSON.stringify(initialConfiguration)
    !== JSON.stringify(configuration)

  const save = useCallback(async () => {
    setSaving(true)

    const response = await updateConfigurationData(configuration)
    setInitialConfiguration(configuration)
    
    if (response.error) {
      notifier.error('Sorry but we\'re unable to save your changes')
    } else {
      notifier.info('Your changes have been saved')
    }

    setSaving(false)
  }, [configuration])

  const discard = useCallback(() => {
    setConfiguration(initialConfiguration)
  }, [initialConfiguration])

  const update = useCallback((key, value) => {
    let _configuration = _.cloneDeep(configuration)
    _.set(_configuration, key, value)

    setConfiguration(_configuration)
  }, [configuration]);

  useEffect(() => {
    async function initialize() {
      const response = await getConfigurationData()
      setInitialConfiguration(response.data)
      setConfiguration(response.data)
    }

    initialize()
  }, [])

  return (
    <ConfigurationContext.Provider value={{
      data: configuration,
      update,
      edited,
      discard,
      save,
      saving
    }}>
      {children}
    </ConfigurationContext.Provider>
  )
}

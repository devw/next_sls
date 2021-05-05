const { createCustomAPI } = require('@utils/Global.utils')

export async function getConfigurationData() {
  const instance = createCustomAPI({}, '/admin')
  const response = await instance.get('/get_settings')
  
  return response
}

export async function updateConfigurationData(configuration) {
  const instance = createCustomAPI({}, '/admin')
  const response = await instance.post('/update_settings', {
    update_key: '',
    update_value: configuration
  })

  return response
}
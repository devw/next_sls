import { createContext, useState } from 'react'
import { plans } from '@utils/Plans.utils'

export const UserContext = createContext({

})

export const UserProvider = (props) => {
  const [user, setUser] = useState({})
  const [plan, setPlan] = useState(plans[0])

  const updateUser = (data) => {
    setUser(data)

    const updatedPlan = plans.find(plan =>
      plan.level == user.app_contract_level)
      
    if (updatedPlan) {
      setPlan(updatedPlan)
    }
  }

  const logout = () => {
    setUser({});
  }

  return (
    <UserContext.Provider value={{ user, updateUser, plan, logout }}>
      {props.children}
    </UserContext.Provider>
  )
}
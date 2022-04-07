import { inject, observer } from 'mobx-react'
import React, { Component } from 'react'
import { History } from 'history'
import OrganizationsStore from '../../stores/OrganizationsStore'
import UpdatedHeader from '../Header/index2'

interface InjectedProps {
   organizationsStore: OrganizationsStore
   history: History
}

@inject('organizationsStore')
@observer
class Testing extends Component {
   getInjectedProps = (): InjectedProps => this.props as InjectedProps
   render() {
      const { organizationsStore } = this.getInjectedProps()
      console.log(
         Array.from(organizationsStore.organizationsList.values()),
         'home'
      )
      const { history } = this.getInjectedProps()
      return (
         <div>
            <UpdatedHeader history={history} />
         </div>
      )
   }
}
export default Testing

import { inject, observer } from 'mobx-react'
import React, { Component } from 'react'
import OrganizationsStore from '../../stores/OrganizationsStore'
import Loading from '../LoadingPage'
interface InjectedProps {
   organizationsStore: OrganizationsStore
}
const getOrganizationsHOC = OldComponent => {
   @inject('organizationsStore')
   @observer
   class UpdatedComponent extends Component {
      getInjectedProps = (): InjectedProps => this.props as InjectedProps

      componentDidMount() {
         const { organizationsStore } = this.getInjectedProps()
         const { getMemberOrganizations } = organizationsStore
         getMemberOrganizations()
      }
      render() {
         const { organizationsStore } = this.getInjectedProps()
         const { organizationsApiStatus } = organizationsStore
         switch (organizationsApiStatus) {
            case 200:
               return <OldComponent />

            default:
               return <Loading />
         }
      }
   }
   return UpdatedComponent
}
export default getOrganizationsHOC

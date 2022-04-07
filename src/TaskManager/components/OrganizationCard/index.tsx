import { inject, observer } from 'mobx-react'
import React from 'react'
import { Link } from 'react-router-dom'
import OrganizationModel from '../../stores/models/OrganizationsModel'
import OrganizationsStore from '../../stores/OrganizationsStore'
import { OrganizationCardContainer, OrganizationName } from './styledComponents'

interface OrganizationCardProps {
   organizationDetails: OrganizationModel
}
interface InjectedProps extends OrganizationCardProps {
   organizationsStore: OrganizationsStore
}

const OrganizationCard = inject('organizationsStore')(
   observer(
      (props: OrganizationCardProps): JSX.Element => {
         const getInjectedProps = (): InjectedProps => props as InjectedProps
         const { organizationsStore } = getInjectedProps()
         const { setActiveOrganization } = organizationsStore
         const { organizationDetails } = props
         const { displayName, id } = organizationDetails
         const handleOnclickOrganizationCard = () => {
            setActiveOrganization(id)
         }
         return (
            <Link to={`/trello/${id}`}>
               <OrganizationCardContainer
                  onClick={handleOnclickOrganizationCard}
               >
                  <OrganizationName>{displayName}</OrganizationName>
               </OrganizationCardContainer>
            </Link>
         )
      }
   )
)
export default OrganizationCard

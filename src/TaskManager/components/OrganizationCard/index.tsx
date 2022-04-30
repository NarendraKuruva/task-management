import React, { useContext } from 'react'
import { observer } from 'mobx-react'
import { Link } from 'react-router-dom'

import { OrganizationsContext } from '../../../Common/stores/index.context'

import OrganizationModel from '../../stores/models/OrganizationsModel'

import { OrganizationCardContainer, OrganizationName } from './styledComponents'

interface OrganizationCardProps {
   organizationDetails: OrganizationModel
}

const OrganizationCard = observer(
   (props: OrganizationCardProps): JSX.Element => {
      const organizationsContextObj = useContext(OrganizationsContext)

      const { setActiveOrganization } = organizationsContextObj
      const { organizationDetails } = props
      const { displayName, id } = organizationDetails
      const handleOnclickOrganizationCard = (): void => {
         setActiveOrganization(id)
      }
      return (
         <Link to={`/trello/${id}`}>
            <OrganizationCardContainer onClick={handleOnclickOrganizationCard}>
               <OrganizationName>{displayName}</OrganizationName>
            </OrganizationCardContainer>
         </Link>
      )
   }
)
export default OrganizationCard

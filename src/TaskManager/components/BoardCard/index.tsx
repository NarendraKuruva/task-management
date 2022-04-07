import React from 'react'
import { Link } from 'react-router-dom'
import BoardModel from '../../stores/models/BoardModel'
import OrganizationModel from '../../stores/models/OrganizationsModel'
import { BoardCardContainer, BoardName } from './styledComponents'

interface OrganizationCardProps {
   boardDetails: BoardModel
}

const BoardCard = (props: OrganizationCardProps): JSX.Element => {
   const { boardDetails } = props
   const { name, id } = boardDetails
   return (
      <Link
         to={`/trello/b/${id}/${name
            .split(' ')
            .join('-')
            .toLowerCase()}`}
      >
         <BoardCardContainer>
            <BoardName>{name}</BoardName>
         </BoardCardContainer>
      </Link>
   )
}
export default BoardCard

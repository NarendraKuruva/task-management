import React from 'react'

import stores from '.'
export const OrganizationsContext = React.createContext(
   stores.organizationsStore
)
export const BoardsContext = React.createContext(stores.boardsStore)
export const ColumnsContext = React.createContext(stores.columnsStore)

export const TaskManagementContext = React.createContext(
   stores.taskManagementStore
)

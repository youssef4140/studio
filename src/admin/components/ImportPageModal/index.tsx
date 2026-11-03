import React from 'react'
import { ImportPageModalClient } from './index.client'

export const ImportPageModal: React.FC<{ folderPath?: string }> = ({ folderPath }) => {
  return <ImportPageModalClient folderPath={folderPath} />
}

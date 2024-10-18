"use client"
import React, { FC } from 'react'
import { downloadPdf } from '../utils/downloadPdf'


interface DownloadPdfProps {
    recipeId: string;
    children: string;
}

const DownloadPdf = ({recipeId, children}: DownloadPdfProps) => {
    const handleDownload = async () => {
        return await downloadPdf(recipeId)
    } 

  return (
    <button className='mx-auto text-center text-blue-700' onClick={handleDownload}>{children}</button>
  )
}

export default DownloadPdf
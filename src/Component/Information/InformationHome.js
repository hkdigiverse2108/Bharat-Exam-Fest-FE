import React from 'react'
import PrivacyPolicyPage from './PrivacyPolicyPage'
import TermAndcondition from './TermAndcondition'
import HowToPlay from './HowToPlay'

export default function InformationHome() {
  return (
    <>
      <div className='overflow-hidden space-y-4'>
        <PrivacyPolicyPage/>
        <TermAndcondition/>
        <HowToPlay/>
      </div>
    </>
  )
}

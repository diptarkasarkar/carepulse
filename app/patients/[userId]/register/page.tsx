import RegisterForm from '@/components/Forms/RegisterForm'
import { getUser } from '@/lib/actions/paitents.actions'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const register = async ({ params: { userId } }: SearchParamProps) => {
  const user = await getUser(userId);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
       <div className="sub-container max-w-[860px] flex flex-1 py-10">
          <Image src="/assets/icons/logo-full.svg"
           height={1000} width={1000}
           alt="paitent"
           className="mb-12 h-10 w-fit"
          />

          <RegisterForm user={user} />
          
          <div className="text-14-regular mt-20 flex justify-between">
          <p className="justify-items-end text-dark-600 xl:text-left">
             © 2024 CarePulse</p>
          </div>
       </div>
      </section>

      <Image src="/assets/images/register-img.png" height={1000} width={1000} alt="Patient" className="side-img max-w-[390px]" />
    </div>
  )
}

export default register
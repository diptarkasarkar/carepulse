"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {Form, FormControl,} from "@/components/ui/form"
import CustomFormField from "../ui/CustomFormField"
import SubmitButton from "../ui/SubmitButton"
import { useState } from "react"
import { PatientFormValidation, UserFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/paitents.actions"
import { FormFieldType } from "./PatientForm"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { on } from "events"
import { Doctors, GenderOptions, IdentificationTypes, PatientFormDefaultValues} from "@/constants"
import { Label } from "../ui/label"
import { SelectItem } from "../ui/select"
import Image from "next/image"
import FileUploader from "../FileUploader"




const RegisterForm = ({ user }: {user:User}) => {
  const router = useRouter();
  const[isLoading , setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      ...PatientFormDefaultValues,
      name: "",
      email: "",
      phone: "",
    },
  })
  async function onSubmit(values: z.infer<typeof UserFormValidation>) {
    setIsLoading(true);
    let formData;
    try {
       const patientData = {
        ...values,
        userID: user.$id
        
       }
    } catch (error) {
      console.log(error);
    }
  
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1">
        <section className="space-y-4">
          <h1 className="header">Welcome</h1>
          <p className="text-dark-700">Let us know more about yourself.</p>
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
           <h2 className="sub-header">Personal information</h2>
          </div>
        </section>


        <CustomFormField 
         fieldType={FormFieldType.INPUT}
         control={form.control}
         name="name"
         lable="Full name"
         placeholder=" Deep Das"
         iconSrc="/assets/icons/user.svg"
         iconAlt="user"
        />
        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField 
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="email"
            lable="Email"
            placeholder=" abc@email.com"
            iconSrc="/assets/icons/email.svg"
            iconAlt="email"
          />
          <CustomFormField 
            fieldType={FormFieldType.PHONE_INPUT}
            control={form.control}
            name="phone"
            lable="Phone Number"
          />
        </div>
          <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField 
          fieldType={FormFieldType.DATE_PICKER}
          control={form.control}
          name="birthDate"
          lable="Date Of Birth"
          />
          <CustomFormField 
          fieldType={FormFieldType.SKELETON}
          control={form.control}
          name="gender"
          lable="Gender"
          renderSkeleton={(field) => (
            <FormControl>
              <RadioGroup className="flex h-11 gap6 xl:justify-between" onValueChange={field.onChange} defaultValue={field.value}>
                {GenderOptions.map((option) => (
                  <div key={option} className="radio-group">
                    <RadioGroupItem value={option} id={option}/>
                    <Label htmlFor={option} className="cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </FormControl>
          ) }
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField 
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="address"
            lable="Address"
            placeholder=" Bhubaneswar,Odisha"
          />
          <CustomFormField 
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="occupation"
            lable="Occupation"
            placeholder=" Developer"
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField 
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="emergencyContactName"
            lable="Emergency Contact Name"
            placeholder=" Guardians Name"
          />
          <CustomFormField 
              fieldType={FormFieldType.PHONE_INPUT}
              control={form.control}
              name="emergencyContactNumber"
              lable="Emergency Contact Number"
            />
        </div>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
           <h2 className="sub-header">Medical information</h2>
          </div>
        </section>

        <CustomFormField 
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="primaryPhysician"
              lable="Primary Physician"
              placeholder="Select a Physician"
        >
          {Doctors.map((doctor) => (
            <SelectItem key={doctor.name} value={doctor.name}>
              <div className="flex cursor-pointer items-center gap-2">
              <Image src={doctor.image} width={32} height={32} alt={doctor.name} className="rounded-full border border-dark-500"/>
              <p>{doctor.name}</p>
              </div>
            </SelectItem>
          ))}
        </CustomFormField>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField 
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="insuranceProvider"
              lable="Insurance Provider"
              placeholder=" SBI Life"
            />
            <CustomFormField 
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="insurancePolicyNumber"
              lable="Insurance Policy Number"
              placeholder=" ABCD55566677"
            />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField 
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="allergies"
              lable="Allergies (If any)"
              placeholder=" Peanuts, Pollen"
            />
            <CustomFormField 
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="currentMedication"
              lable="Current Medication (if any)"
              placeholder=" Ibuprofen 200mg"
            />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField 
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="familyMedicalHistory"
              lable="Family Medical History"
            />
            <CustomFormField 
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="pastMedicalHistory"
              lable="Past Medical History"
            />
        </div>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
           <h2 className="sub-header">Identification and Verification</h2>
          </div>
        </section>

        <CustomFormField 
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="identificationType"
              lable="Identification Type"
              placeholder="Select Identification Type"
        >
          {IdentificationTypes.map((type) => (
            <SelectItem key={type} value={type}>
             {type}
            </SelectItem>
          ))}
        </CustomFormField>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField 
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="identificationNumber"
              lable="Identification Number"
              placeholder=" 1234567890"
            />
        </div>

        <CustomFormField 
          fieldType={FormFieldType.SKELETON}
          control={form.control}
          name="identificationDocument"
          lable="Upload Identification Document"
          renderSkeleton={(field) => (
            <FormControl>
             <FileUploader files={field.value} onChange={field.onChange}/>
            </FormControl>
          ) }
        />

        <section className="space-y-6">
            <div className="mb-9 space-y-1">
            <h2 className="sub-header">Consent and Privacy</h2>
            </div>
        </section>

        <CustomFormField 
          fieldType={FormFieldType.CHECKBOX}
          control={form.control}
          name="treatmentConsent"
          lable="I consent to treatment"
        />

        <CustomFormField 
          fieldType={FormFieldType.CHECKBOX}
          control={form.control}
          name="disclosureConsent"
          lable="I consent to disclosure of Information"
        />

        <CustomFormField 
          fieldType={FormFieldType.CHECKBOX}
          control={form.control}
          name="privacyConsent"
          lable="I consent to Privacy policy"
        />

        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  )
}

export default RegisterForm
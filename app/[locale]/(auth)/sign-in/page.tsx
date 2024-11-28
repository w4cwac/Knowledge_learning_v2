"use client"
import React from 'react'
import{
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,

} from '@/components/ui/card' 
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form' 
import {Button} from '@/components/ui/button' 
import {Input} from '@/components/ui/input' 
import * as z from 'zod' 
import {useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginSchema } from '@/schemas'
import { Loader2 } from 'lucide-react'

import {FcGoogle} from 'react-icons/fc'
import {FaGithub} from 'react-icons/fa'
import { signIn } from 'next-auth/react'
import { DEFAULT_REDIRECT } from '@/routes'
import { useSearchParams } from 'next/navigation'
import FormError from '@/components/auth/form-error'
import { useI18n } from '@/locales/client'


const page = () => {


    const searchParams = useSearchParams()
    const callbackUrl = searchParams?.get("callbackUrl");
    const urlError = searchParams.get('error') === "OAuthAccountNotLinked"
    ? "Account not linked ,please sign in with same provider you used to sign up":null

    const [isGoogleLoading, setIsGoogleLoading] = React.useState(false)
    const [isGithubLoading, setIsGithubLoading] = React.useState(false)
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues : {
            email: '',
            
        }
    })
    const isPending = form.formState.isSubmitting
    const onSubmit= async (data: z.infer<typeof LoginSchema>) => {
        try {
            signIn('resend',{ email : data.email, callbackUrl: DEFAULT_REDIRECT || callbackUrl })
        } catch (error) {
            console.error(error)
        }
    }

    const onclick= async (provider:'google' | 'github') => {
        signIn(provider,{ callbackUrl: DEFAULT_REDIRECT || callbackUrl } )
    }

    const t = useI18n()
  

  return (
    <div className='w-full h-full flex flex-col justify-center items-center'>
        <Card className='max-w-sm w-full'>
            <CardHeader>
                <CardTitle className='text-2xl'>{t("sign_in")}</CardTitle>
                <CardDescription> </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
                <FormError message= {urlError} />
                <Form {...form}>
                <form 
                    className='space-y-4'
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <FormField
                    name='email'
                    render = {({field}) => (
                        <>
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input {...field} id='email' type='email' placeholder={t("sign_in_email_placeholder")} disabled={isPending} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>

                            <Button className='w-full' type='submit' disabled={isPending}>
                                {isPending ? <Loader2 className='w-5 h-5 animate-spin' /> : t("sign_in") }
                            </Button>
                        </>
                    )}

                    />

                </form>

                </Form>
                <div className='w-full flex items-center space-x-2'>
                    <div className='w-full h-[1px] border'/>
                    <span className='flex-1'>{t("or")}</span>
                    <div className='w-full h-[1px] border'/>
                </div>

                <Button 
                variant= 'outline'
                className ='w-full space-x-2 flex'
                onClick={()=> {
                    setIsGoogleLoading(true)
                    onclick('google')

                }}
                disabled= {isPending}

                >
                    {
                        isGoogleLoading ? <Loader2 className='w-5 h-5 animate-spin' /> 
                        :   
                            <>
                                <FcGoogle className='w-6 h-6'/>
                                <span>{t("sign_in_google")}</span>
                            </>
                    }
                </Button>

                <Button 
                variant= 'outline'
                className ='w-full space-x-2 flex'
                onClick={()=> {
                    setIsGithubLoading(true)
                    onclick('github')

                }}
                disabled= {isPending}

                >
                    {
                    isGithubLoading ? <Loader2 className='w-5 h-5 animate-spin' /> 
                        : 
                        <>
                            <FaGithub className='w-6 h-6'/>
                            <span>{t("sign_in_github")}</span>
                        </>
                    }


                </Button>

            </CardContent>
            
        </Card>
    </div>
  )
}

export default page
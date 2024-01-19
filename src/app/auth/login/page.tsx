import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import UserAuthForm from "../../../components/user-auth";
import { ModeToggle } from "@/components/darkmode";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
};

export default function AuthenticationPage() {
  return (
    <>
      <div className='max-h-screen container relative hidden h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0'>
        <div className='relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r'>
          <div className='absolute inset-0 bg-green-900' />
          <div className='relative z-20 flex items-center text-lg font-medium'>
            Portfolioify
          </div>
          <div className='relative z-20 mt-auto'>
            <blockquote className='space-y-2'>
              <p className='text-lg'>
                &ldquo;This library has saved me countless hours of work and
                helped me deliver stunning designs to my clients faster than
                ever before.&rdquo;
              </p>
              <footer className='text-sm'>Sofia Davis</footer>
            </blockquote>
          </div>
        </div>
        <div className='lg:p-8'>
          <ModeToggle />
          <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
            <div className='flex flex-col space-y-2 text-center'>
              <h1 className='text-2xl font-semibold tracking-tight'>
                Welcome to Portfolioify
              </h1>
              <p className='text-sm text-muted-foreground'>
                Sign in to your Spotify account
              </p>
            </div>
            <UserAuthForm />
          </div>
        </div>
      </div>
    </>
  );
}

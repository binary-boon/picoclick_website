import React from 'react'
import { HeroSection } from '@/components/HeroSection'
import { generateMeta } from '@/utilities/generateMeta'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import NextImage from 'next/image';
import ScrollCardsContainer from '@/components/ScrollCards/ScrollCardsContainer'
import { projects } from '../data/Projects'
import ParallaxGallery from '@/components/ParallaxGallery'
import HeroImg from "../../../public/images/gallery1.jpg";
import BgImg from '../../../public/images/gallery2.jpg';
import PerspectiveTransition from '@/components/PerspectiveSection/PerspectiveTransition'
import Testimonials from '@/components/Testimonials'
import HomeAboutSection from '@/components/HomeAboutSection/page'


export default async function HomePage() {
  const { isEnabled: isDraftMode } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  // Query for the home page by slug (NOT by ID)
  const { docs } = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: 'home',
      },
    },
    limit: 1,
    draft: isDraftMode,
  })

  const page = docs?.[0]

  const perspectiveContent = (
    <>
      <p>Moments That Last </p>
      <div className="flex gap-4 items-center">
        <p>Forever</p>
        <div className="relative w-[12.5vw] h-[12.5vw]">
          <NextImage 
            src={HeroImg}
            alt="hero"
            fill
            className="object-cover rounded-lg"
          />
        </div>
        <p>Preserved</p>
      </div>
    </>
  );

  // Hero configuration
  const heroConfig = {
    muxPlaybackId: 'MC6BiWC1UMXF5zhTNq9jrhiYZz6QSoUeB4TEUwr54Ac',
    title: 'Forever Starts Here',
    subtitle: 'Dancing light, whispered vows, endless love—all captured',
  }

  return (
    <main className="flex flex-col">
      <HeroSection
        muxPlaybackId={heroConfig.muxPlaybackId}
        title={heroConfig.title}
        subtitle={heroConfig.subtitle}
      />
      <HomeAboutSection />
       <ScrollCardsContainer projects={projects} sectionTitle="Your love story, filmed like a movie." sectionSubtitle = "Every wedding tells a unique story. We capture yours with artistry, emotion, and precision—so your memories live far beyond the day itself." />
       <ParallaxGallery/>
       {/* Component 2: Perspective Transition with Gallery Link */}
      <PerspectiveTransition 
        section1Content={perspectiveContent}
        section2Image={BgImg}
        section1BgColor="#C72626"
        galleryLink="/gallery"
      />

      <Testimonials />
      {/* Render additional page content blocks if they exist */}
      {/* {page?.layout && page.layout.length > 0 && (
        <RenderBlocks blocks={page.layout} />
      )} */}
    </main>
  )
}

export async function generateMetadata() {
  const payload = await getPayload({ config: configPromise })

  // Query by slug for metadata too
  const { docs } = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: 'home',
      },
    },
    limit: 1,
  })

  const page = docs?.[0]

  return generateMeta({ doc: page })
}
import Page from "@/components/common/Page";
import Hero from "@/components/home/Hero";
import Head from "next/head";
import React, { ReactNode } from "react";
import { BlockRenderer } from "@/components/BlockRenderer";

const OurStoryPageContent = () => {
  return (
    <>
      <Head>
        <title>OurStoryPageContent</title>
        <meta name="description" content="This is the OurStory page" />
      </Head>
      <Page className={""} FULL={true} customYMargin="my-0">
        {/* <Hero /> */}
        {/* Render remaining sections from content JSON */}
        {/* Page JSON: /src/content/pages/OurStory.json */}
        {/* Instances under: /src/content/blocks/[type-slug]/[block-id].json */}
        {/* BestOffer / WhyUs / Testimonials / Faq now data-driven */}
        <BlockRenderer page="our-story" />
      </Page>
    </>
  );
};

export default OurStoryPageContent;

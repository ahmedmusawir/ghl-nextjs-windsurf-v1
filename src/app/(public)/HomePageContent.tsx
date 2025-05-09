import Page from "@/components/common/Page";
import BestOffer from "@/components/home/BestOffer";
import Faq from "@/components/home/Faq";
import Hero from "@/components/home/Hero";
import Testimonials from "@/components/home/Testimonials";
import WhyUs from "@/components/home/WhyUs";
import Head from "next/head";
import React, { ReactNode } from "react";

const HomePageContent = () => {
  return (
    <>
      <Head>
        <title>HomePageContent</title>
        <meta name="description" content="This is the home page" />
      </Head>
      <Page className={""} FULL={true} customYMargin="my-0">
        <Hero />
        <BestOffer />
        <WhyUs />
        <Testimonials />
        <Faq />
      </Page>
    </>
  );
};

export default HomePageContent;

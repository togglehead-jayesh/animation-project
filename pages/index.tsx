import dynamic from "next/dynamic";
import Head from "next/head";

const CustomCursor = dynamic(() => import("@/components/CustomCursor"), { ssr: false });
const Hero = dynamic(() => import("@/sections/Hero"), { ssr: false });
const Catalog = dynamic(() => import("@/sections/Catalog"), { ssr: false });
const Story = dynamic(() => import("@/sections/Story"), { ssr: false });
const Footer = dynamic(() => import("@/sections/Footer"), { ssr: false });

export default function Home() {
  return (
    <>
      <Head>
        <title>Indian Fragrances — Sacred Essences of India</title>
        <meta name="description" content="A luxury fragrance experience drawn from the sacred landscapes of India." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <CustomCursor />
      <main style={{ background: "#050509", cursor: "none" }}>
        <Hero />
        <Catalog />
        <Story />
        <Footer />
      </main>
    </>
  );
}

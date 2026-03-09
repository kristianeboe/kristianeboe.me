"use client";

import * as runtime from "react/jsx-runtime";

// Import all the custom components that might be used in MDX
import { CalloutBox } from "./CalloutBox";
import { CtaCard } from "./CtaCard";
import { FeatureGrid } from "./FeatureGrid";
import { NewsletterCard } from "./NewsletterCard";
import { Quote } from "./Quote";
import { Stats } from "./Stats";
import { TLDR } from "./TLDR";
import { Video } from "./Video";
import { ImageGallery } from "../blog/ImageGallery";
import { InfoBox } from "../blog/InfoBox";
import { ParallaxHero } from "../blog/ParallaxHero";
import { YouTubeEmbed } from "../blog/YouTubeEmbed";

const sharedComponents = {
  CalloutBox,
  CtaCard,
  FeatureGrid,
  NewsletterCard,
  Quote,
  Stats,
  TLDR,
  Video,
  ImageGallery,
  InfoBox,
  ParallaxHero,
  YouTubeEmbed,
};

// Parse the Velite generated MDX code into a React component function
const useMDXComponent = (code: string) => {
  // eslint-disable-next-line @typescript-eslint/no-implied-eval
  const fn = new Function(code);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  return fn({ ...runtime }).default;
};

interface MDXProps {
  code: string;
  components?: Record<string, React.ComponentType>;
}

// MDXContent component
export function MDXContent({ code, components }: MDXProps) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const Component = useMDXComponent(code);
  return <Component components={{ ...sharedComponents, ...components }} />;
}

import React from "react";
import { Link } from "react-router-dom";
import { useData } from "../context/DataContext";
import HeroSlider from "../components/home/HeroSlider";
import Biography from "../components/home/Biography";
import SocialSection from "../components/home/SocialSection";
import GalleryGrid from "../components/gallery/GalleryGrid";
import SectionHeading from "../components/shared/SectionHeading";

const Home: React.FC = () => {
  const { data } = useData();

  const electionCategory = data.categories.find((c) => c.slug === "election-campaign-2022");
  const winningCategory = data.categories.find((c) => c.slug === "winning-moments");

  const electionImages = data.gallery
    .filter((g) => g.categoryId === electionCategory?.id)
    .slice(0, 8);
  const winningImages = data.gallery
    .filter((g) => g.categoryId === winningCategory?.id)
    .slice(0, 8);

  return (
    <div>
      <HeroSlider slides={data.hero.slides} />

      <Biography data={data.biography} />

      <SocialSection social={data.contact.social} />

      {electionImages.length > 0 && (
        <section className="bg-white py-16 md:py-20">
          <div className="max-w-content mx-auto px-4 md:px-6">
            <SectionHeading title="Election Campaign 2022" />
            <GalleryGrid images={electionImages} categories={data.categories} />
            <div className="text-center mt-10">
              <Link
                to="/gallery?category=election-campaign-2022"
                className="inline-block border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold px-6 py-2.5 rounded-md transition-colors"
              >
                View All Photos
              </Link>
            </div>
          </div>
        </section>
      )}

      {winningImages.length > 0 && (
        <section className="bg-surface py-16 md:py-20">
          <div className="max-w-content mx-auto px-4 md:px-6">
            <SectionHeading title="Winning Moment" />
            <GalleryGrid images={winningImages} categories={data.categories} />
            <div className="text-center mt-10">
              <Link
                to="/gallery?category=winning-moments"
                className="inline-block border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold px-6 py-2.5 rounded-md transition-colors"
              >
                View All Photos
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;

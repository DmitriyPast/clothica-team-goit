'use client';

import MessageNoInfo from '@/components/MessageNoInfo/MessageNoInfo';
import Hero from '../../components/Hero/Hero';
import Style from '../../components/Style/Style';

import PopularCategories from '@/components/PopularCategories/PopularCategories';

export default function HomePage() {
  return (
    <div className="container">
      <Hero />
      <Style />
      <PopularCategories />
      <MessageNoInfo
        text="Driving in my car right after a beer
         Hey, that bump is shaped like a deer 
         DUI? 
         How about you die? 
         I'll go a hundred miles An hour! 
         Little do you know, I filled up on gas 
         Imma get your fountain-making ass 
         Pulverize this fuck 
         ​With my Bergentrück
         It seems you're out of luck!"
        buttonText="TRUCK!"
        onClick={handleOpenNewTab}
      />
    </div>
  );
}
const handleOpenNewTab = () => {
  window.open(
    'https://www.youtube.com/watch?v=E1epC9YEkrs',
    '_blank',
    'noopener,noreferrer'
  );
};

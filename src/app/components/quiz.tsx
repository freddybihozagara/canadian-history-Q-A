import { GetStaticProps } from 'next';
import {Fact} from '../utils/types'



export const getStaticProps: GetStaticProps = async () => {
    try {
      const triviaRes = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/triviaData.json`);
      if (!triviaRes.ok) {
        throw new Error('Failed to fetch trivia data');
      }
      const triviaData = await triviaRes.json();
  
      const facts = triviaData.facts.map((fact: Fact) => ({
        ...fact
      }));
  
      return {
        props: {
          facts,
        },
      };
    } catch (error) {
      throw new Error('Failed to fetch trivia data');
    }
  };
  

export default getStaticProps
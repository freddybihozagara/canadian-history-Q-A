//import React from "react";
import { Fact } from './types';

// utils/shuffleAnswers.ts
// ShuffleAnswers Component Start
export const shuffleAnswers = (fact: Fact) => {
  try {
    const answers = [fact.fact, fact.randomAnswer1, fact.randomAnswer2, fact.randomAnswer3];
    for (let i = answers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [answers[i], answers[j]] = [answers[j], answers[i]];
    }
    return answers;
  } catch (error) {
    console.error('Error shuffling answers:', error);
    return [fact.fact]; // Return at least the correct answer in case of error
  }
};
// ShuffleAnswers Component End

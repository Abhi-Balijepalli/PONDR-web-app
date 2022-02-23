import React from 'react';
import ReactWordcloud from 'react-wordcloud';

const callbacks = {
  getWordColor: word => word.value > 50 ? 'blue' : 'red',
  onWordClick: console.log,
  onWordMouseOver: console.log,
  getWordTooltip: word => `${word.text} (${word.value}) [${word.value > 50 ? 'good' : 'bad'}]`
};

const options = {
  rotations: 2,
  rotationAngles: [-90, 0]
};

const words = [
  {
    text: 'told',
    value: 64
  },
  {
    text: 'mistake',
    value: 11
  },
  {
    text: 'thought',
    value: 16
  },
  {
    text: 'bad',
    value: 17
  }
];

const WordCloud = (props) => {
  return (
    <ReactWordcloud
      callbacks={callbacks}
      options={options}
      size={props.size}
      words={words}
    />
  );
};

export default WordCloud;

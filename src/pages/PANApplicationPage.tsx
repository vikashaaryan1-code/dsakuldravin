import React from 'react';
import { PANApplicationEngine } from '../components/pan/PANApplicationEngine';

export const PANApplicationPage: React.FC = () => {
  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '1.5rem 1rem' }}>
      <PANApplicationEngine isEmbedded={false} />
    </div>
  );
};

export default PANApplicationPage;

"use client";
import React, { useEffect, useState } from 'react';
import BannerSection from '@/components/BannerSection';

function Movie({ params }: { params: Promise<{ movie: string }> }) {
  const [resolvedParams, setResolvedParams] = useState<{ movie: string } | null>(null);

  // paramsı çözümleme
  useEffect(() => {
    const resolveParams = async () => {
      const resolved = await params;
      setResolvedParams(resolved);
    };

    resolveParams();
  }, [params]);

  if (!resolvedParams) {
    return <div>Loading...</div>;
  }

  return (
    <div className='mt-20'>
      <BannerSection contentType={true} random={false} param={resolvedParams.movie} />
    </div>
  );
}

export default Movie;

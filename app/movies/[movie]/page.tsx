import BannerSection from '@/components/BannerSection'
import React from 'react'

function Movie({params}:any) {
  const {movie}= params;
  
  return (
    <div className='mt-20'>
      <BannerSection contentType={true} random={false} param={movie}/>
    </div>
  )
}

export default Movie

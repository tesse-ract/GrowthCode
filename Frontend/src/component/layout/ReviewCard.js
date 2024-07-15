import React, { Fragment } from 'react'

function ReviewCard({review}) {
  return (
    <Fragment>
      <div className='reviewCard rounded-2xl border-2 border-[#0000001a] h-60 m-2'>
        <div className='m-8'>
        <div className='UserRating flex mb-2'>
                <div className='star mr-2'>
                            <i className="fa-solid fa-star" style={{color: "#FFD43B"}}></i>
                            <i className="fa-solid fa-star" style={{color: "#FFD43B"}}></i>
                            <i className="fa-solid fa-star" style={{color: "#FFD43B"}}></i>
                            <i className="fa-solid fa-star" style={{color: "#FFD43B"}}></i>
                            <i className="fa-solid fa-star" style={{color: "#FFD43B"}}></i>
                            </div>
                </div>
                <div className='UserRatingName font-bold flex items-center mb-2'>
                    <p className='mr-2'>{review.name}.</p>
                    <i className="fa-solid fa-circle-check" style={{color: "#01ab31"}}></i>
                </div>
                <div className='UserRatingDescription mb-4'>
                    <p className='text-[#00000099]'>"{review.comment}"</p>
                </div>
                <div className='UserRatingDate'>
                    <p className='font-semibold text-[#00000099]'>Posted on {review.createdAt}</p>
                </div>
        </div>
               
      </div>
    </Fragment>
  )
}

export default ReviewCard

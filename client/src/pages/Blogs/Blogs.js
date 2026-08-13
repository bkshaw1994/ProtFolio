import React from 'react';
import { Helmet } from 'react-helmet-async';
import MediumPosts from '../../components/MediumPosts/MediumPosts';

const Blogs = () => {
  return (
    <>
      <Helmet>
        <title>Blogs & Technical Articles | Bishal Kumar Shaw</title>
        <meta
          name="description"
          content="Explore technical articles, software architecture deep dives, and MERN stack development tutorials by Bishal Kumar Shaw published on Medium."
        />
      </Helmet>

      <div className="pt-20 sm:pt-24">
        <MediumPosts />
      </div>
    </>
  );
};

export default Blogs;

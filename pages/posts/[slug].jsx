import { useMemo } from 'react';
import Link from 'next/link';
import { getMDXComponent } from 'mdx-bundler/client';
import { getAllPosts, getSinglePost } from '../../utils/mdx';
import styles from '../../styles/Home.module.css';

const CustomLink = ({ as, href, ...otherProps }) => {
  return (
    <>
      <Link as={as} href={href} className="custom-link">
        <a {...otherProps} />
      </Link>
    </>
  );
};

const Post = ({ code, frontmatter }) => {
  const Component = useMemo(() => getMDXComponent(code), [code]);

  return (
    <div className={styles.container}>
      <h1>{frontmatter.title}</h1>
      <Component
        components={{
          a: CustomLink,
        }}
      />
    </div>
  );
};

export const getStaticProps = async ({ params }) => {
  const post = await getSinglePost(params.slug);

  return { props: { ...post } };
};

export const getStaticPaths = async () => {
  const paths = getAllPosts().map(({ slug }) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};

export default Post;

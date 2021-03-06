import Link from 'next/link';
import { getAllPosts } from '../utils/mdx';
import styles from '../styles/Home.module.css';

const BlogList = ({ posts }) => {
  return (
    <div className={styles.container}>
      <h1>All Posts</h1>
      <p>
        Click the link below to navigate to a page generated by{' '}
        <code>mdx-bundler</code>.
      </p>
      <ul>
        {posts.map((post, index) => (
          <li key={index}>
            <Link href={`posts/${post.slug}`}>{post.frontmatter.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const getStaticProps = async () => {
  const posts = getAllPosts();

  return { props: { posts } };
};

export default BlogList;

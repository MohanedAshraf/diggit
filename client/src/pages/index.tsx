import Head from 'next/head';
import { Fragment, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import useSWR, { useSWRInfinite } from 'swr';
import Image from 'next/image';
import Link from 'next/link';

import { Post, Sub } from '../types';

import PostCard from '../components/PostCard';
import { useAuthState } from '../context/auth';

dayjs.extend(relativeTime);
export default function Home() {
  const [observedPost, setObservedPost] = useState('');
  // const { data: posts } = useSWR<Post[]>('/posts');
  const { data: topSubs } = useSWR<Sub[]>('/misc/top-subs');

  const { authenticated } = useAuthState();

  const {
    data,
    error,
    mutate,
    size: page,
    setSize: setPage,
    isValidating,
    revalidate,
  } = useSWRInfinite<Post[]>((index) => `/posts?page=${index}`);

  const posts: Post[] = data ? [].concat(...data) : [];

  useEffect(() => {
    if (!posts || posts.length === 0) return;

    const id = posts[posts.length - 1].identifier;

    if (id !== observedPost) {
      setObservedPost(id);
      setPage(page + 1);
      observedElement(document.getElementById(id));
    }
  }, [posts]);

  const observedElement = (element: HTMLElement) => {
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting === true) {
          console.log('Reached bottom of the post');

          observer.unobserve(element);
        }
      },
      { threshold: 1 }
    );
    observer.observe(element);
  };

  return (
    <Fragment>
      <Head>
        <title>diggit: the front page of the internet</title>
      </Head>

      <div className="container flex pt-4">
        {/* Posts feed */}
        {isValidating && <p className="text-lg text-center ">Loading .. </p>}
        <div className="w-full px-4 md:w-160 md:p-0">
          {posts?.map((post) => {
            return (
              <PostCard
                post={post}
                key={post.identifier}
                revalidate={revalidate}
              />
            );
          })}
          {isValidating && posts.length > 0 && (
            <p className="text-lg text-center ">Loading More .. </p>
          )}
        </div>
        {/* SideBar */}

        <div className="hidden ml-6 md:block w-80">
          <div className="bg-white rounded">
            <div className="p-4 border-b-2">
              <p className="text-lg font-semibold text-center">
                Top Communities
              </p>
            </div>
            <div>
              {topSubs?.map((sub) => {
                return (
                  <div
                    key={sub.name}
                    className="flex items-center px-4 py-2 text-xs border-bottom"
                  >
                    <Link href={`/r/${sub.name}`}>
                      <a>
                        <Image
                          src={sub.imageUrl}
                          alt="Sub"
                          width={(6 * 16) / 4}
                          height={(6 * 16) / 4}
                          className="rounded-full cursor-pointer"
                        />
                      </a>
                    </Link>

                    <Link href={`/r/${sub.name}`}>
                      <a className="ml-2 font-bold hover:cursor-pointer">
                        /r/${sub.name}
                      </a>
                    </Link>
                    <p className="ml-auto font-med">{sub.postCount}</p>
                  </div>
                );
              })}
            </div>
            {authenticated && (
              <div className="p-4 border-t-2">
                <Link href="/subs/create">
                  <a className="w-full px-2 py-1 blue button">
                    Create Community
                  </a>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

import Head from 'next/head';
import { Fragment } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import useSWR from 'swr';
import Image from 'next/image';
import Link from 'next/link';

import { Post, Sub } from '../types';

import PostCard from '../components/PostCard';
import { useAuthState } from '../context/auth';

dayjs.extend(relativeTime);
export default function Home() {
  const { data: posts } = useSWR<Post[]>('/posts');
  const { data: topSubs } = useSWR<Sub[]>('/misc/top-subs');

  const { authenticated } = useAuthState();

  return (
    <Fragment>
      <Head>
        <title>diggit: the front page of the internet</title>
      </Head>

      <div className="container flex pt-4">
        {/* Posts feed */}
        <div className="w-160">
          {posts?.map((post) => {
            return <PostCard post={post} key={post.identifier} />;
          })}
        </div>
        {/* SideBar */}

        <div className="ml-6 w-80">
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

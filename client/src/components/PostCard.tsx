import Link from 'next/link';
import { Post } from '../types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import axios from 'axios';
import classNames from 'classnames';
import ActionButton from './ActionButton';
import { useAuthState } from '../context/auth';
import { useRouter } from 'next/router';

dayjs.extend(relativeTime);

interface PostCardProps {
  post: Post;
  revalidate?: Function;
}
export default function PostCard({
  post: {
    identifier,
    slug,
    title,
    body,
    subName,
    createdAt,
    voteScore,
    userVote,
    commentCount,
    url,
    username,
    sub,
  },
  revalidate,
}: PostCardProps) {
  const { authenticated } = useAuthState();

  const router = useRouter();

  const isInSubPage = router.pathname === '/r/[sub]';

  const vote = async (value: number) => {
    if (!authenticated) router.push('/login');

    if (value === userVote) value = 0;

    try {
      const res = await axios.post('/misc/vote', {
        identifier,
        slug,
        value,
      });
      if (revalidate) revalidate();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      key={identifier}
      className="flex mb-4 bg-white rounded"
      id={identifier}
    >
      {/* Vote section */}
      <div className="w-10 py-3 text-center bg-gray-200 rounded-l div">
        {/* Up vote */}
        <div
          className="w-6 mx-auto text-gray-400 rounded cursor-pointer hover:bg-gray-300 hover:text-red-500"
          onClick={() => vote(1)}
        >
          <i
            className={classNames('icon-arrow-up', {
              'text-red-500': userVote === 1,
            })}
          ></i>
        </div>
        <p className="text-xs font-bold">{voteScore}</p>
        {/* Down vote */}
        <div
          className="w-6 mx-auto text-gray-400 rounded cursor-pointer hover:bg-gray-300 hover:text-blue-600"
          onClick={() => vote(-1)}
        >
          <i
            className={classNames('icon-arrow-down', {
              'text-blue-600': userVote === -1,
            })}
          ></i>
        </div>
      </div>
      {/* Post data section */}
      <div className="w-full p-2">
        <div className="flex items-center">
          {!isInSubPage && (
            <>
              <Link href={`/r/${subName}`} passHref>
                <img
                  src={sub.imageUrl}
                  alt="Author profile picture"
                  className="w-6 h-6 mr-1 rounded-full cursor-pointer"
                />
              </Link>

              <Link href={`/r/${subName}`}>
                <a className="text-xs font-bold hover:underline">
                  /r/{subName}
                </a>
              </Link>
              <span className="mx-1 text-xs text-gray-500">• </span>
            </>
          )}
          <p className="text-xs text-gray-500">
            Posted by
            <Link href={`/u/${username}`}>
              <a className="mx-1 hover:underline">/u/{username}</a>
            </Link>
            <Link href={url}>
              <a className="mx-1 hover:underline">
                {dayjs(createdAt).fromNow()}
              </a>
            </Link>
          </p>
        </div>

        <Link href={url}>
          <a className="my-1 text-lg font-medium">{title}</a>
        </Link>
        {body && <p className="my-1 text-sm">{body}</p>}
        <div className="flex">
          <Link href={url}>
            <a>
              <ActionButton>
                <i className="mr-1 fas fa-comment-alt fa-xs"></i>
                <span className="font-bold">{commentCount} Comments</span>
              </ActionButton>
            </a>
          </Link>
          <ActionButton>
            <i className="mr-1 fas fa-share fa-xs"></i>
            <span className="font-bold">Share</span>
          </ActionButton>
          <ActionButton>
            <i className="fas fa-bookmark fa-xs"></i>{' '}
            <span className="font-bold">Save</span>
          </ActionButton>
        </div>
      </div>
    </div>
  );
}

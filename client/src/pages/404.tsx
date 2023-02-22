import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center">
      <img
        src="https://media1.tenor.com/images/16afb04bf04f21e5f9aac7a01e49bc7d/tenor.gif?itemid=14917651"
        alt="spidy"
        className="mt-24"
      />
      <h1 className="mt-10 mb-4 text-5xl font-bold text-gray-800">
        Page Not Found
      </h1>
      <Link href="/" className="px-4 py-2 text-lg rounded-lg blue button">
        
          GO Home
        
      </Link>
    </div>
  );
}

import Link from "next/link";
import Image from "next/image";

export default function Header({ viewer }) {
  const name = viewer.name;

  return (
    <>
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-5 sm:px-6 sm:py-4 lg:px-8 md:space-x-10">
        <div>
          <Link href="/">
            <a className="flex">
              <span className="sr-only">WP Engine Meetup</span>
              <div className="h-8 w-auto sm:h-10">
                <Image src={require("/public/images/wpe-logo.svg")} alt="" />
              </div>
              <h1 className="font-extrabold px-4 text-4xl">Meetup</h1>
            </a>
          </Link>
        </div>

        <div className="flex items-center md:ml-12">
          <p>
            Logged in as <strong>{name}</strong>
          </p>
          <a
            href={`${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-admin/profile.php`}
            className="ml-8 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-brand-primary-dark-blue hover:bg-brand-primary-orange"
            target="_blank"
            rel="noreferrer"
          >
            Edit Profile
          </a>
        </div>
      </div>
    </>
  );
}

import { CaretRight } from "@phosphor-icons/react";
import Link from "next/link";
import { useRouter } from "next/router";

const Breadcrumbs = () => {
  const router = useRouter();
  const pathArray = router.asPath
    .split("?")[0]
    .split("/")
    .filter((path) => path);
  const query = router.query;

  return (
    <nav className="text-sm text-gray-400">
      <ul className="flex items-center space-x-2">
        <li>
          <Link href="/admin" className="hover:text-blue-400">
            Dashboard
          </Link>
        </li>
        {pathArray.map((path, index) => {
          if (path === "admin") return null;
          const href =
            "/" +
            pathArray.slice(0, index + 1).join("/") +
            (Object.keys(query).length > 0
              ? `?${new URLSearchParams(query)}`
              : "");
          return (
            <li key={index} className="flex items-center space-x-2">
              <CaretRight size={14} className="text-gray-500" />
              <Link
                href={href}
                className={`hover:text-blue-400 text-gray-400 ${
                  index === pathArray.length - 1
                    ? "font-semibold text-gray-500"
                    : ""
                }`}
              >
                {path.charAt(0).toUpperCase() + path.slice(1)}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Breadcrumbs;

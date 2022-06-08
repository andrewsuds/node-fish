import Image from "next/image";

export default function PostCard(props) {
  const imageURL = "http://localhost:3001/images/" + props.image;
  return (
    <div className="flex px-4 py-2 border-t border-gray-300 hover:bg-gray-100">
      <div className="mr-3">
        <Image
          src="http://localhost:3001/images/ufc.jpg"
          className="rounded-full"
          width={50}
          height={50}
          layout="fixed"
        />
      </div>
      <div className="">
        <div className="flex">
          <div className="font-bold">{props.username}</div>
          {props.location !== null && (
            <div className="ml-1 text-gray-500">• {props.location}</div>
          )}
        </div>
        <div className="flex text-gray-500">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M12 15l3.5-3.5" />
              <path d="M20.3 18c.4-1 .7-2.2.7-3.4C21 9.8 17 6 12 6s-9 3.8-9 8.6c0 1.2.3 2.4.7 3.4" />
            </svg>
          </div>
          <div className="ml-1 mr-3">{props.weight}</div>

          {props.length !== null && (
            <div className="flex">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M12 15l3.5-3.5" />
                  <path d="M20.3 18c.4-1 .7-2.2.7-3.4C21 9.8 17 6 12 6s-9 3.8-9 8.6c0 1.2.3 2.4.7 3.4" />
                </svg>
              </div>
              <div className="ml-1 mr-3">{props.length}</div>
            </div>
          )}
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M12 15l3.5-3.5" />
              <path d="M20.3 18c.4-1 .7-2.2.7-3.4C21 9.8 17 6 12 6s-9 3.8-9 8.6c0 1.2.3 2.4.7 3.4" />
            </svg>
          </div>
          <div className="ml-1">{props.fish}</div>
        </div>
        {props.caption != null && <div>{props.caption}</div>}
        {props.image !== null && (
          <div className="mt-2">
            <Image
              className="rounded-xl"
              src={imageURL}
              width={500}
              height={500}
              objectFit="cover"
            />
          </div>
        )}
      </div>
    </div>
  );
}

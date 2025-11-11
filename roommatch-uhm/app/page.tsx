import Link from "next/link";

export default function Home() {
  return (
    <main className="container text-center mt-5">
      <h1 className="display-4 text-primary fw-bold">Welcome to RoomMatch UHM</h1>
      <p className="lead">
        Find your perfect UH Mānoa roommate safely and easily.
      </p>

      {/* Link to the /messages page */}
      <Link href="/messages" className="btn btn-success mt-3">
        Go to Messages
      </Link>
      <Link href="/meetings" className="btn btn-success">
        View My Meetings
      </Link>
    </main>
  );
}

  

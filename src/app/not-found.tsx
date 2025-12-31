import Link from "next/link";
import Image from "next/image";
import TopBar from "@/components/layout/topbar";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col w-full bg-muted">
      <header className="fixed top-0 left-0 right-0 z-50 border-b bg-background border-border w-full">
        <TopBar />
      </header>

      <main className="flex flex-1 flex-col items-center justify-center mt-12 px-4">
        <div className="flex flex-col items-center text-center max-w-md">
          <Image
            src="/404-illustration.svg"
            alt="404 illustration"
            width={134}
            height={134}
            className="mb-8"
            priority
          />
          
          <h1 className="text-3xl font-semibold text-foreground mb-4">
            404 - Page not found
          </h1>
          
          <p className="text-muted-foreground mb-8">
            The page you are looking for does not seem to exist. Try navigating home or searching again
          </p>

          <Button asChild variant="default" colorScheme="primary">
            <Link href="/">Home</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}


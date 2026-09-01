import { AlertCircle, ArrowLeft, Home } from 'lucide-react';
import { Link } from 'wouter';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] w-full flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md bg-card border border-foreground/15 p-8 text-center rounded-xs shadow-lg">
        <div className="grid h-16 w-16 place-items-center bg-accent/15 text-accent rounded-full mx-auto mb-4">
          <AlertCircle size={32} />
        </div>
        <h1 className="font-display text-2xl font-bold text-foreground">
          404 — Page Not Found
        </h1>
        <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
          The requested safety pin specification page or route does not exist.
        </p>

        <div className="mt-6 flex flex-col gap-2">
          <Link
            href="/"
            className="bg-accent text-accent-foreground py-2.5 px-4 font-bold text-xs uppercase tracking-wider rounded-xs flex items-center justify-center gap-2 hover:brightness-105"
          >
            <Home size={14} />
            <span>Return to Homepage</span>
          </Link>
          <Link
            href="/products"
            className="border border-foreground/20 py-2.5 px-4 font-mono text-xs uppercase tracking-wider text-foreground rounded-xs hover:border-accent hover:text-accent"
          >
            Browse Product Catalogue
          </Link>
        </div>
      </div>
    </div>
  );
}

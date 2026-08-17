import { cn } from '@/lib/utils'

/**
 * Placeholder for a module whose flag targets the visitor.
 *
 * It stands in for the module while the decision streams — see `TargetedBlock` in
 * `./index.tsx`. Deliberately *not* the module itself: rendering the real content and
 * then replacing it would flash whatever the flag exists to suppress, which for a
 * kill switch means briefly showing the thing that was turned off.
 *
 * Sized to the shell most modules share (`px-6 py-12` around a `max-w-3xl` card at
 * 16:9), so it reserves roughly the right space rather than collapsing the page and
 * pushing everything up when the real module arrives. CTA is the only flag-aware
 * block today and matches this exactly; a block with a very different footprint
 * should pass `className` rather than inherit a shape that lies about its size.
 */
export default function ModuleSkeleton({ className }: { className?: string }) {
  return (
    <div className="w-full px-6 py-12" aria-hidden="true">
      <div
        className={cn(
          'max-w-3xl mx-auto aspect-video rounded-2xl bg-card',
          // Held back for anyone who has asked the OS for less movement — a pulsing
          // block is exactly the kind of ambient animation that setting is for.
          'animate-pulse motion-reduce:animate-none',
          className,
        )}
      />
    </div>
  )
}

import { AlertTriangle } from "lucide-react";

export function DisclaimerBanner() {
  return (
    <div className="bg-stone-100 border-t border-stone-200">
      <div className="mx-auto max-w-7xl px-6 py-6 lg:px-8">
        <div className="flex gap-4">
          <div className="flex-shrink-0">
            <AlertTriangle className="h-6 w-6 text-amber-600" />
          </div>
          <p className="text-sm text-stone-600 leading-relaxed">
            These statements have not been evaluated by the FDA. This product is 
            not intended to diagnose, treat, cure, or prevent any disease. Consult 
            your veterinarian before use.
          </p>
        </div>
      </div>
    </div>
  );
}

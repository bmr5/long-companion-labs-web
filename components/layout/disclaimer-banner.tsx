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
            This designation allows the use of research chemicals strictly for in
            vitro testing and laboratory experimentation only. All product
            information available on this website is for educational purposes only.
            Bodily introduction of any kind into humans or animals is strictly
            forbidden by law. This product should only be handled by licensed,
            qualified professionals.
          </p>
        </div>
      </div>
    </div>
  );
}

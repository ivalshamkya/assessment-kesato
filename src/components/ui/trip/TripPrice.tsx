interface TripPriceProps {
  price: number;
  originalPrice?: number;
  discount?: number;
}

export default function TripPrice({
  price,
  originalPrice,
  discount,
}: TripPriceProps) {
  return (
    <div className="">
      <div className="text-sm text-zinc-400">Starts From</div>
      <div className="flex items-center gap-2">
        <span className="text-xl text-zinc-900 font-semibold">
          ${price.toLocaleString()}
        </span>
        <span className="text-zinc-700">/ Guest</span>
        {originalPrice && (
          <span className="text-zinc-400 line-through">
            ${originalPrice.toLocaleString()}
          </span>
        )}
        {discount && (
          <span className="inline-block px-2 py-1 bg-[#4C6894] text-blue-50 rounded-full text-sm">
            {discount}%
          </span>
        )}
      </div>
    </div>
  );
}

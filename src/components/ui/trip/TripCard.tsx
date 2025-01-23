import { ITrip } from "@/types/trip";
import ShipInfo from "./ShipInfo";
import TripActions from "./TripAction";
import TripLocation from "./TripLocation";
import TripPath from "./TripPath";
import TripPrice from "./TripPrice";

export default function TripCard({
  destination,
  ship,
  shipCode,
  departure,
  arrival,
  nights,
  price,
  originalPrice,
  discount,
  spacesLeft,
}: ITrip) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-4 overflow-hidden transition-all duration-300 hover:shadow-md">
      <div className="flex flex-col md:flex-row">
        <div className="flex-1 p-4 sm:p-6 border-b md:border-b-0 md:border-r border-gray-100">
          <div className="flex flex-col h-full">
            <h3 className="text-lg sm:text-xl font-semibold font-manrope text-gray-900 mb-2 sm:mb-6">
              {destination}
            </h3>

            <div className="md:hidden mb-4">
              <ShipInfo ship={ship} shipCode={shipCode} />
            </div>

            <div className="grid grid-cols-2 sm:flex sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-8 mt-auto border-none sm:border">
              <TripLocation
                port={departure?.port}
                code={departure?.code}
                date={departure?.date}
                align="right"
              />
              <div className="hidden sm:block">
                <TripPath nights={nights} />
              </div>
              <TripLocation
                port={arrival?.port}
                code={arrival?.code}
                date={arrival?.date}
                align="left"
              />
              <div className="sm:hidden my-4 w-full flex col-span-2 justify-center">
                <TripPath nights={nights} />
              </div>
            </div>
          </div>
        </div>

        <div className="relative w-full md:w-[280px] p-4 sm:p-6">
          {spacesLeft && (
            <div className="absolute top-0 right-0 bg-red-100 text-red-600 text-xs font-bold py-1.5 px-3 rounded-bl-2xl">
              {spacesLeft} Space{spacesLeft !== 1 ? "s" : ""} Left!
            </div>
          )}

          <div className="flex flex-col gap-4">
            <TripPrice
              price={price}
              originalPrice={originalPrice}
              discount={discount}
            />
            <TripActions />
          </div>
        </div>
      </div>
    </div>
  );
}

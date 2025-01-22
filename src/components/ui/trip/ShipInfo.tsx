interface ShipInfoProps {
  ship: string;
  shipCode: string;
}

export default function ShipInfo({ ship, shipCode }: ShipInfoProps) {
    return (
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <span>{ship}</span>
        <span className="px-2 py-1 bg-gray-100 rounded">{shipCode}</span>
      </div>
    );
}

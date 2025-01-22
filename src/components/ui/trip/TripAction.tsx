import { Button } from "../button";

export default function TripActions() {
    return (
      <div className="flex gap-2 mt-2">
        <Button variant={"primary"} colors={"gold"}>ENQUIRE</Button>
        <Button variant={"secondary"} colors={"gold"}>DETAILS</Button>
      </div>
    );
}

import { useSearchParams } from "react-router-dom";

function Confirm() {
  const [params] = useSearchParams();
  const reservationId = params.get("reservationId");

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white p-6 rounded-lg shadow max-w-md w-full text-center">
        <h1 className="text-2xl font-semibold text-green-600 mb-3">
          Reservation Confirmed
        </h1>

        <p className="mb-2">Your reservation ID:</p>

        <p className="font-mono text-lg bg-gray-100 p-2 rounded">
          {reservationId}
        </p>

        <p className="mt-4 text-sm text-gray-600">
          Please visit the medical store within the reserved time.
        </p>
      </div>
    </div>
  );
}

export default Confirm;

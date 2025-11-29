// components/Clock.js
import { useEffect, useState } from "react";

export default function Clock() {
  const [time, setTime] = useState("");
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const formatted = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      setTime(formatted);

      const seconds = now.getSeconds();

      // Blink exactly when the minute changes
      if (seconds === 0) {
        setBlink(true);
        setTimeout(() => setBlink(false), 1000); // stays blue for 1 second
      }
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="clock"
      style={{
        color: blink ? "#79909fff" : "inherit",
        transition: "color 0.2s ease",
      }}
    >
      {time}
    </div>
  );
}

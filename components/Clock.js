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

      if (seconds === 0) {
        setBlink(true);
        setTimeout(() => setBlink(false), 1000);
      }
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="clock-wrapper">
      <div className="clock-label nocopy">(Local time)</div>

      <div
        className="clock"
        style={{
          color: blink ? "#79909fff" : "inherit",
          transition: "color 0.2s ease",
        }}
      >
        {time}
      </div>

      <style jsx>{`
        .clock-wrapper {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          width: 100%;
        }

        .clock-label {
          font-family: "Times New Roman", serif;
          font-style: italic;
          font-weight: 400;
          font-size: 1.2rem;
          opacity: 0.7;
          user-select: none;
        }

        .nocopy {
          user-select: none;
          -webkit-user-select: none;
          -ms-user-select: none;
        }
      `}</style>
    </div>
  );
}

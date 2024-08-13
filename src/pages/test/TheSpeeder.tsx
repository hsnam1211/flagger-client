import React, { useEffect, useState } from "react";

const TheSpeeder: React.FC = () => {
  const [gameState, setGameState] = useState<
    "setting" | "countdown" | "playing" | "result"
  >("setting");
  const [countdown, setCountdown] = useState(5);
  const [buttonVisible, setButtonVisible] = useState(false);
  const [winner, setWinner] = useState<boolean | null>(null);
  const [bgColor, setBgColor] = useState<string>("white");

  const [totalConnectCount, setTotalConnectCount] = useState<number>(0);
  const [totalClickCount, setTotalClickCount] = useState<number>(0);

  useEffect(() => {
    const newSocket = new WebSocket("ws://localhost:8080");
    //"wss://port-0-flagger-server-lzid9wad6bd5ffdc.sel4.cloudtype.app"
    newSocket.onmessage = event => {
      const message = event.data;

      if (message.startsWith("카운트다운: ")) {
        const count = parseInt(message.split(": ")[1]);
        setCountdown(count);
        // setBgColor((prev) => (prev === "#f56464" ? "#f5c9c9" : "#f56464")); // 깜빡임 효과
      } else if (message === "게임 시작!") {
        setGameState("playing");
      } else if (message === "버튼 노출!") {
        setButtonVisible(true);
      } else if (message === "게임 종료!") {
        setButtonVisible(false);
        endGame();
      }

      if (message.includes("totalCount")) {
        setTotalConnectCount(JSON.parse(message).totalCount);
      }
    };

    // 게임 시작 요청
    newSocket.onopen = () => {
      newSocket.send(JSON.stringify("startGame"));
    };

    return () => {
      newSocket.close();
    };
  }, []);

  const startGame = () => {
    setGameState("playing");
    setCountdown(5);
  };

  const endGame = () => {
    setGameState("result");
    // 당첨 로직 추가
    const isWinner = Math.random() < 0.5; // 예시로 50% 확률
    setWinner(isWinner);
  };

  const handleButtonClick = () => {
    if (gameState === "playing") {
      setWinner(true); // 버튼 클릭 시 당첨 처리
      endGame();
    }
  };
  const [socket, setSocket] = useState<WebSocket | null>(null);

  return (
    <div
      style={{
        color: "#000",
        backgroundColor: bgColor,
        height: "100vh",
        transition: "background-color 0.3s",
        width: "100vw",
      }}
    >
      <div>{`전체 접속자 수: ${totalConnectCount}`}</div>
      <div>{`클릭 수: ${totalClickCount}`}</div>
      {gameState === "setting" && <h2>게임 세팅 중...</h2>}
      {gameState === "countdown" && <h2>게임 시작: {countdown}</h2>}
      {gameState === "playing" && (
        <div>
          {buttonVisible && (
            <button
              onClick={handleButtonClick}
              style={{
                position: "absolute",
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
            >
              클릭!
            </button>
          )}
        </div>
      )}
      {gameState === "result" && (
        <div>
          <h2>게임 종료!</h2>
          {winner ? (
            <div>
              <h3>당첨되었습니다!</h3>
              <img src="기프티콘_이미지_URL" alt="당첨 기프티콘" />
            </div>
          ) : (
            <h3>비당첨입니다.</h3>
          )}
        </div>
      )}
    </div>
  );
};

export default TheSpeeder;

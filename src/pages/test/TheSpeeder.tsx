import React, { useEffect, useState } from "react";

const TheSpeeder: React.FC = () => {
  const [gameState, setGameState] = useState<
    "setting" | "countdown" | "playing" | "result"
  >("setting");
  const [countdown, setCountdown] = useState(5);
  const [buttonVisible, setButtonVisible] = useState(false);
  const [winner, setWinner] = useState<boolean | null>(null);
  const [bgColor, setBgColor] = useState<string>("white");

  const [totalCount, setTotalCount] = useState<number>(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (gameState === "setting") {
      timer = setTimeout(() => {
        setGameState("countdown");
      }, 10000); // 10초 후 카운트다운 시작
    } else if (gameState === "countdown") {
      let blinkTimer: NodeJS.Timeout;

      blinkTimer = setInterval(() => {
        setBgColor((prev) => (prev === "#ff0000" ? "#c0392b" : "#ff0000")); // 붉은색과 다홍색 깜빡임
      }, 300); // 0.3초마다 색상 변경

      timer = setTimeout(() => {
        clearInterval(blinkTimer); // 카운트다운 종료 후 깜빡임 종료
        setBgColor("white"); // 배경색 흰색으로
        startGame();
      }, 5000); // 카운트다운 후 게임 시작

      // 카운트다운 로직
      setCountdown(5);
      const countdownTimer = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(countdownTimer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000); // 1초마다 카운트다운

      return () => {
        clearInterval(blinkTimer);
        clearInterval(countdownTimer);
      };
    } else if (gameState === "playing") {
      timer = setTimeout(() => {
        setButtonVisible(true); // 랜덤한 시간에 버튼 노출
        setTimeout(() => {
          setButtonVisible(false);
          endGame();
        }, 5000); // 5초 후 게임 종료
      }, Math.random() * 5000); // 0~5초 랜덤
    }

    return () => clearTimeout(timer);
  }, [gameState]);

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

  useEffect(() => {
    const newSocket = new WebSocket("ws://localhost:8080");
    // const newSocket = new WebSocket(
    //   "wss://port-0-flagger-server-lzid9wad6bd5ffdc.sel4.cloudtype.app"
    // );

    newSocket.onopen = () => {
      console.log("서버에 연결되었습니다.");
      // handleGrabFlag();
    };

    newSocket.onmessage = (event) => {
      // const message = event.data as keyof typeof statusMsg; // event.data의 타입을 지정
      // setText(statusMsg[message] || "알 수 없는 메시지입니다."); // 기본 메시지 추가
      // setStatus(message);
    };

    newSocket.onclose = () => {
      console.log("서버와의 연결이 종료되었습니다.");
      // 여기에 재연결 로직 추가 가능
    };

    setSocket(newSocket);

    // 컴포넌트 언마운트 시 소켓 종료
    return () => {
      newSocket.close();
    };
  }, []);
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
      <div>{totalCount}</div>
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

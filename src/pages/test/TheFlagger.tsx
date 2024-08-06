import { useEffect, useState } from "react";

const statusMsg = {
  get: "5초만 버티세요! 🤭🤭",
  out: "다른 사람이 채갔네.. \n 얼른 뺏으세요! 🥵🥵",
  win: "WIN!!!! 🏆🏆",
  lose: "... 분발하세요! 😊😊",
};

const TheFlagger = () => {
  const [text, setText] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    // const newSocket = new WebSocket("ws://localhost:8080");
    const newSocket = new WebSocket(
      "wss://port-0-flagger-server-lzid9wad6bd5ffdc.sel4.cloudtype.app"
    );

    newSocket.onopen = () => {
      console.log("서버에 연결되었습니다.");
      handleGrabFlag();
    };

    newSocket.onmessage = (event) => {
      const message = event.data as keyof typeof statusMsg; // event.data의 타입을 지정
      setText(statusMsg[message] || "알 수 없는 메시지입니다."); // 기본 메시지 추가
      setStatus(message);
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

  const handleGrabFlag = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send("grabFlag");
    } else {
      console.log("서버와의 연결이 아직 완료되지 않았습니다.");
    }
  };

  return (
    <div
      style={{
        maxWidth: 500,
        width: "calc(100vw - 40px)",
        height: "100vh",
        position: "relative",
      }}
    >
      <div
        style={{
          height: "calc(100vh - 140px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p style={{ color: "#000", fontSize: 30 }}>{text}</p>
      </div>
      <div style={{ position: "fixed", bottom: 0, left: 0, width: "100%" }}>
        <button
          style={{
            width: "92%",
            borderRadius: 6,
            backgroundColor: "#fff",
            border: "1px solid #000",
            height: 70,
            color: "#000",
            fontWeight: 700,
            fontSize: 18,
            visibility: status !== "get" ? "visible" : "hidden",
            marginBottom: 20,
            boxShadow: "0px 1px 9px 2px #5700ff73",
          }}
          onClick={handleGrabFlag}
        >
          깃발 뺏기 😊
        </button>
        <div
          style={{
            backgroundColor: "lightgray",
            width: "100vw",
            height: 70,

            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p>ad</p>
        </div>
      </div>
    </div>
  );
};

export default TheFlagger;

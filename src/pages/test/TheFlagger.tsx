import { useEffect, useState } from "react";

const statusMsg = {
  get: "깃발을 획득했습니다!",
  out: "깃발을 잃었습니다.",
  win: "축하합니다! 승자입니다.",
  lose: "다음 승자를 위해 분발하세요!",
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
    <>
      <p>{text}</p>
      {status !== "get" && <button onClick={handleGrabFlag}>깃발 잡기!</button>}
    </>
  );
};

export default TheFlagger;
